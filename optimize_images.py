from PIL import Image
import os

def convert_to_webp(source, target_quality=85):
    if not os.path.exists(source):
        print(f"Error: {source} not found")
        return
    
    target = os.path.splitext(source)[0] + ".webp"
    # Ensure spaces are handled or renamed safely
    if " " in target:
        target = target.replace(" ", "_")
        
    img = Image.open(source)
    img.save(target, "WEBP", quality=target_quality)
    size_mb = os.path.getsize(target) / (1024 * 1024)
    print(f"Converted {source} -> {target} ({size_mb:.2f} MB)")

# Convert the specified images
convert_to_webp("src/assets/home/img/hero 4.png")
convert_to_webp("src/assets/home/img/secciones.png")
