import React, { useRef, useEffect, useState, type ReactNode } from "react";

interface SpotlightsNavProps {
  children: ReactNode;
  count?: number;
  theme?: "warm" | "cool" | "mixed";
  beamAlpha?: number;
  navBg?: string;
}

const SpotlightsNav: React.FC<SpotlightsNavProps> = ({
  children,
  count = 3,
  theme = "warm",
  beamAlpha = 0.88,
  navBg = "#0f0f11",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };

    window.addEventListener("resize", resize);
    resize();

    // Spotlight state
    const lights = Array.from({ length: count }).map((_, _i) => ({
      x: 0,
      y: 0,
      targetX: 0,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Need to clear with the right scale
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      
      const dpr = window.devicePixelRatio;
      const logicalWidth = width / dpr;
      // const logicalHeight = height / dpr;
      
      ctx.scale(dpr, dpr);

      lights.forEach((light, i) => {
        // Move towards mouse if hovering, else oscilate
        if (isHovering) {
          const spacing = count > 1 ? 60 : 0;
          light.targetX = mousePos.x + (i - (count - 1) / 2) * spacing;
        } else {
          light.targetX = (logicalWidth / (count + 1)) * (i + 1) + Math.sin(time / 1500 + light.phase) * 30;
        }

        if (light.x === 0) light.x = light.targetX; // Initial position
        light.x += (light.targetX - light.x) * 0.08;

        /* Drawing disabled to remove Canvas gradients as requested
        const gradient = ctx.createLinearGradient(
          light.x, 0,
          light.x, logicalHeight
        );

        let color = "255, 190, 40"; // warm gold
        if (theme === "cool") color = "0, 230, 255";
        if (theme === "mixed") {
            color = i % 2 === 0 ? "255, 190, 40" : "0, 230, 255";
        }

        gradient.addColorStop(0, `rgba(${color}, ${beamAlpha})`);
        gradient.addColorStop(0.4, `rgba(${color}, ${beamAlpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.moveTo(light.x - 15, 0);
        ctx.lineTo(light.x + 15, 0);
        ctx.lineTo(light.x + 80, logicalHeight);
        ctx.lineTo(light.x - 80, logicalHeight);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(light.x, 0, 20, 0, Math.PI * 2);
        const flare = ctx.createRadialGradient(light.x, 0, 0, light.x, 0, 20);
        flare.addColorStop(0, `rgba(${color}, ${beamAlpha})`);
        flare.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = flare;
        ctx.fill();
        */
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, theme, beamAlpha, mousePos, isHovering]);

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", height: "auto" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas de los reflectores — encima del nav */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
 
      {/* Nav */}
      <nav
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: navBg,
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}
      >
        {children}
      </nav>
    </div>
  );
};

export default SpotlightsNav;
