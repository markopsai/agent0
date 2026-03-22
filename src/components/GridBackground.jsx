"use client";
import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width, height;

    // Dots = agents moving across the grid
    const dots = Array.from({ length: 14 }, () => ({
      x: Math.random(),
      y: Math.random(),
      // Much slower base speed
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      // Random wandering — each dot has a target it drifts toward
      targetX: Math.random(),
      targetY: Math.random(),
      // How long until it picks a new target
      targetTimer: Math.random() * 300,
      size: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      // Occasional pause
      pauseTimer: 0,
    }));

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw grid
      const gridSize = 60;
      ctx.strokeStyle = "rgba(108, 63, 224, 0.08)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Update dots with organic movement
      dots.forEach(dot => {
        // Pause occasionally
        if (dot.pauseTimer > 0) {
          dot.pauseTimer--;
        } else {
          // Drift toward target with gentle force (not teleport)
          const dx = dot.targetX - dot.x;
          const dy = dot.targetY - dot.y;
          dot.vx += dx * 0.00008;
          dot.vy += dy * 0.00008;
          // Damping — prevents acceleration buildup
          dot.vx *= 0.97;
          dot.vy *= 0.97;
          // Clamp max speed
          const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
          if (speed > 0.0008) { dot.vx = (dot.vx / speed) * 0.0008; dot.vy = (dot.vy / speed) * 0.0008; }
          dot.x += dot.vx;
          dot.y += dot.vy;
          // Bounce softly off edges
          if (dot.x < 0.02 || dot.x > 0.98) dot.vx *= -0.7;
          if (dot.y < 0.02 || dot.y > 0.98) dot.vy *= -0.7;
          dot.x = Math.max(0.02, Math.min(0.98, dot.x));
          dot.y = Math.max(0.02, Math.min(0.98, dot.y));
          // Pick new target occasionally
          dot.targetTimer--;
          if (dot.targetTimer <= 0) {
            dot.targetX = Math.random();
            dot.targetY = Math.random();
            dot.targetTimer = 200 + Math.random() * 400;
            // Occasionally pause (agent "thinking")
            if (Math.random() < 0.2) dot.pauseTimer = 30 + Math.random() * 60;
          }
        }
      });

      // Draw dots
      dots.forEach(dot => {
        const px = dot.x * w;
        const py = dot.y * h;

        // Glow effect
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, dot.size * 4);
        gradient.addColorStop(0, `rgba(108, 63, 224, ${dot.opacity})`);
        gradient.addColorStop(1, "rgba(108, 63, 224, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, dot.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(180, 140, 255, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = (dots[i].x - dots[j].x) * w;
          const dy = (dots[i].y - dots[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.strokeStyle = `rgba(108, 63, 224, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(dots[i].x * w, dots[i].y * h);
            ctx.lineTo(dots[j].x * w, dots[j].y * h);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}
