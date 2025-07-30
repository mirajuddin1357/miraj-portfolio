import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = theme === "dark" 
          ? `rgba(147, 197, 253, ${particle.opacity})` 
          : `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particle.x - particlesRef.current[j].x;
          const dy = particle.y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = theme === "dark" 
              ? `rgba(147, 197, 253, ${opacity})` 
              : `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationIdRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      resizeCanvas();
      initParticles();
      animate();
    };

    startAnimation();

    const handleResize = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      startAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        id="particles-canvas"
        className="w-full h-full opacity-70"
      />
    </div>
  );
}
