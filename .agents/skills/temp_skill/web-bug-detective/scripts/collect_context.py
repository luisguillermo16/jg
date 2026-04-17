#!/usr/bin/env python3
"""
Web Bug Detective — Context Collector
Recopila todos los archivos y métricas relevantes de un proyecto web
para diagnóstico de bugs visuales y de rendimiento.

Uso:
  python collect_context.py --project-dir ./mi-proyecto --output ./bug-report
  python collect_context.py --url http://localhost:3000 --output ./bug-report
"""

import os
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime


# Extensiones de archivos a recopilar por categoría
FILE_PATTERNS = {
    "html": ["*.html", "*.htm", "*.tsx", "*.jsx", "*.vue", "*.svelte"],
    "styles": ["*.css", "*.scss", "*.sass", "*.less", "*.styl"],
    "scripts": ["*.ts", "*.js", "*.mjs"],
    "config": [
        "next.config.*", "vite.config.*", "webpack.config.*",
        "tailwind.config.*", "postcss.config.*", "package.json",
        ".env", ".env.local", ".env.production"
    ],
    "assets": ["*.jpg", "*.jpeg", "*.png", "*.webp", "*.avif", "*.gif", "*.svg"]
}

# Archivos/dirs a excluir siempre
EXCLUDE_DIRS = {
    "node_modules", ".git", ".next", "dist", "build", ".cache",
    "__pycache__", ".turbo", "coverage", "out", ".vercel"
}

# Palabras clave que indican archivos relevantes para bugs de render
RENDER_KEYWORDS = [
    "scroll", "animation", "transition", "lazy", "loading", "intersection",
    "observer", "layout", "render", "paint", "composite", "transform",
    "opacity", "will-change", "contain", "content-visibility", "position",
    "fixed", "sticky", "overflow", "z-index", "viewport", "image", "font"
]


def should_include_file(filepath: Path, content: str = "") -> bool:
    """Determina si un archivo es relevante para diagnóstico de bugs visuales."""
    name_lower = filepath.name.lower()
    
    # Siempre incluir archivos de config importantes
    if filepath.name in ["package.json", "next.config.js", "next.config.ts", 
                          "tailwind.config.js", "vite.config.ts"]:
        return True
    
    # Incluir si el nombre contiene keywords relevantes
    for keyword in RENDER_KEYWORDS:
        if keyword in name_lower:
            return True
    
    # Para archivos con contenido, buscar keywords
    if content:
        content_lower = content.lower()
        keyword_matches = sum(1 for kw in RENDER_KEYWORDS if kw in content_lower)
        if keyword_matches >= 2:  # Al menos 2 keywords = probablemente relevante
            return True
    
    return False


def collect_project_files(project_dir: Path, output: dict) -> None:
    """Recopila archivos del proyecto local."""
    
    print(f"📁 Escaneando: {project_dir}")
    
    for category, patterns in FILE_PATTERNS.items():
        output["files"][category] = []
        
        for pattern in patterns:
            for filepath in project_dir.rglob(pattern):
                # Saltar directorios excluidos
                if any(excluded in filepath.parts for excluded in EXCLUDE_DIRS):
                    continue
                
                # Saltar archivos muy grandes (>500KB probablemente no son útiles)
                if filepath.stat().st_size > 500 * 1024:
                    output["files"][category].append({
                        "path": str(filepath.relative_to(project_dir)),
                        "size": filepath.stat().st_size,
                        "skipped": "too_large",
                        "note": "Archivo >500KB — revisar manualmente"
                    })
                    continue
                
                # Para assets de imagen, solo registrar metadata
                if category == "assets":
                    output["files"]["assets"].append({
                        "path": str(filepath.relative_to(project_dir)),
                        "size_bytes": filepath.stat().st_size,
                        "size_kb": round(filepath.stat().st_size / 1024, 1)
                    })
                    continue
                
                # Leer contenido de archivos de texto
                try:
                    content = filepath.read_text(encoding="utf-8", errors="ignore")
                except Exception as e:
                    continue
                
                file_entry = {
                    "path": str(filepath.relative_to(project_dir)),
                    "size": len(content),
                    "is_render_relevant": should_include_file(filepath, content)
                }
                
                # Incluir contenido solo para archivos relevantes y no muy largos
                if file_entry["is_render_relevant"] and len(content) < 50000:
                    file_entry["content"] = content
                elif len(content) < 10000:
                    file_entry["content"] = content  # Archivos pequeños siempre
                else:
                    file_entry["content_preview"] = content[:2000] + "\n\n... [truncado] ..."
                
                output["files"][category].append(file_entry)


def collect_package_info(project_dir: Path, output: dict) -> None:
    """Extrae info relevante del package.json."""
    pkg_path = project_dir / "package.json"
    if not pkg_path.exists():
        return
    
    try:
        pkg = json.loads(pkg_path.read_text())
        
        relevant_deps = {}
        all_deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
        
        # Filtrar solo dependencias relevantes para rendering
        render_relevant_pkgs = [
            "react", "next", "vue", "nuxt", "svelte", "astro",
            "framer-motion", "gsap", "lottie", "swiper",
            "tailwindcss", "styled-components", "emotion",
            "react-query", "swr", "zustand", "redux",
            "@tanstack", "vite", "webpack", "turbopack"
        ]
        
        for pkg_name, version in all_deps.items():
            if any(rel in pkg_name for rel in render_relevant_pkgs):
                relevant_deps[pkg_name] = version
        
        output["package_info"] = {
            "name": pkg.get("name"),
            "relevant_dependencies": relevant_deps,
            "scripts": pkg.get("scripts", {})
        }
    except Exception as e:
        output["package_info"] = {"error": str(e)}


def generate_bug_checklist(output: dict) -> dict:
    """Genera un checklist automático basado en los archivos recopilados."""
    
    checklist = {
        "images_without_dimensions": [],
        "missing_lazy_loading": [],
        "fonts_without_display": [],
        "scroll_listeners_found": [],
        "animations_found": [],
        "potential_layout_thrashing": [],
        "render_blocking_potential": []
    }
    
    all_files = []
    for category, files in output.get("files", {}).items():
        if category != "assets":
            all_files.extend(files)
    
    for file_entry in all_files:
        content = file_entry.get("content", file_entry.get("content_preview", ""))
        filepath = file_entry.get("path", "")
        
        if not content:
            continue
        
        # Buscar imágenes sin dimensiones
        if "<img" in content and 'width=' not in content and 'height=' not in content:
            checklist["images_without_dimensions"].append(filepath)
        
        # Buscar fonts sin font-display
        if "@font-face" in content and "font-display" not in content:
            checklist["fonts_without_display"].append(filepath)
        
        # Buscar scroll listeners
        if "addEventListener('scroll'" in content or 'addEventListener("scroll"' in content:
            has_passive = "passive" in content
            checklist["scroll_listeners_found"].append({
                "file": filepath,
                "has_passive": has_passive,
                "warning": None if has_passive else "⚠️ Scroll listener sin { passive: true }"
            })
        
        # Buscar animaciones
        if "@keyframes" in content or "animation:" in content or "transition:" in content:
            checklist["animations_found"].append(filepath)
        
        # Posible layout thrashing
        if "getBoundingClientRect" in content or "offsetHeight" in content or "offsetWidth" in content:
            checklist["potential_layout_thrashing"].append({
                "file": filepath,
                "note": "Usa medidas de layout — verificar si está dentro de scroll handler"
            })
        
        # Scripts sin defer/async
        if '<script src=' in content and 'defer' not in content and 'async' not in content:
            checklist["render_blocking_potential"].append(filepath)
    
    return checklist


def main():
    parser = argparse.ArgumentParser(description="Web Bug Detective — Context Collector")
    parser.add_argument("--project-dir", type=Path, default=Path("."),
                        help="Directorio raíz del proyecto")
    parser.add_argument("--output", type=Path, default=Path("./bug-report"),
                        help="Directorio de salida para el reporte")
    parser.add_argument("--bug-type", default="unknown",
                        help="Tipo de bug: RENDER_CHUNK|LAYOUT_SHIFT|SCROLL_JANK|etc.")
    parser.add_argument("--description", default="",
                        help="Descripción del bug observado")
    args = parser.parse_args()
    
    # Crear directorio de salida
    args.output.mkdir(parents=True, exist_ok=True)
    
    print("🔍 Web Bug Detective — Recopilando contexto...\n")
    
    # Estructura del reporte
    report = {
        "meta": {
            "generated_at": datetime.now().isoformat(),
            "project_dir": str(args.project_dir.absolute()),
            "bug_type": args.bug_type,
            "bug_description": args.description
        },
        "files": {},
        "package_info": {},
        "checklist": {}
    }
    
    # Recopilar archivos
    collect_project_files(args.project_dir, report)
    collect_package_info(args.project_dir, report)
    
    # Generar checklist automático
    report["checklist"] = generate_bug_checklist(report)
    
    # Generar summary
    file_counts = {cat: len(files) for cat, files in report["files"].items()}
    
    report["summary"] = {
        "total_files_scanned": sum(file_counts.values()),
        "files_by_category": file_counts,
        "render_relevant_files": sum(
            1 for cat, files in report["files"].items()
            if cat != "assets"
            for f in files
            if f.get("is_render_relevant")
        ),
        "warnings": [
            item for key, items in report["checklist"].items()
            for item in (items if isinstance(items, list) else [])
            if isinstance(item, dict) and item.get("warning")
        ]
    }
    
    # Guardar reporte completo
    output_file = args.output / "bug-context.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    # Generar resumen legible
    summary_file = args.output / "SUMMARY.md"
    with open(summary_file, "w", encoding="utf-8") as f:
        f.write(f"# Bug Report Context\n\n")
        f.write(f"**Generado**: {report['meta']['generated_at']}\n")
        f.write(f"**Bug tipo**: {report['meta']['bug_type']}\n")
        f.write(f"**Descripción**: {report['meta']['bug_description'] or 'No especificada'}\n\n")
        f.write(f"## Archivos recopilados\n")
        for cat, count in file_counts.items():
            f.write(f"- **{cat}**: {count} archivos\n")
        f.write(f"\n## Warnings detectados automáticamente\n")
        if report["summary"]["warnings"]:
            for w in report["summary"]["warnings"]:
                f.write(f"- {w.get('file')}: {w.get('warning')}\n")
        else:
            f.write("- No se detectaron warnings obvios\n")
        f.write(f"\n## Archivos más relevantes para el bug\n")
        for cat, files in report["files"].items():
            if cat == "assets":
                continue
            relevant = [f for f in files if f.get("is_render_relevant")]
            for f in relevant[:5]:  # Top 5 por categoría
                f.write(f"- `{f['path']}`\n")
    
    print(f"\n✅ Contexto recopilado exitosamente!")
    print(f"📄 Reporte completo: {output_file}")
    print(f"📋 Resumen: {summary_file}")
    print(f"\n💡 Pasa `bug-context.json` directamente a cualquier IA para diagnóstico.")


if __name__ == "__main__":
    main()
