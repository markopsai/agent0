"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const AGENTS = [
  { id: "corey", name: "Corey Marks", emoji: "🍌", role: "Coordinator", color: "#6c3fe0" },
  { id: "tony", name: "Tony Stark", emoji: "🔨", role: "Engineer", color: "#4a6cf7" },
  { id: "lex", name: "Lex", emoji: "🧠", role: "Research", color: "#7c3aed" },
  { id: "hunter", name: "Hunter", emoji: "🔍", role: "Growth", color: "#2563eb" },
  { id: "quinn", name: "Quinn", emoji: "✍️", role: "Content", color: "#9333ea" },
  { id: "buzz", name: "Buzz", emoji: "📢", role: "Social", color: "#3b82f6" },
  { id: "atlas", name: "Atlas", emoji: "🛰️", role: "Ops", color: "#6366f1" },
];

// Office zones where agents hang out
const ZONES = [
  { name: "Strategy", x: 0.15, y: 0.2 },
  { name: "Build", x: 0.5, y: 0.2 },
  { name: "Research", x: 0.82, y: 0.2 },
  { name: "Content", x: 0.15, y: 0.65 },
  { name: "Comms", x: 0.5, y: 0.65 },
  { name: "Ops", x: 0.82, y: 0.65 },
];

export default function OfficePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    // Initialize agents at their home zones
    const agents = AGENTS.map((a, i) => {
      const zone = ZONES[i % ZONES.length];
      return {
        ...a,
        x: zone.x + (Math.random() - 0.5) * 0.1,
        y: zone.y + (Math.random() - 0.5) * 0.1,
        targetX: zone.x,
        targetY: zone.y,
        homeZone: zone,
        targetTimer: Math.random() * 200,
        pauseTimer: 0,
        vx: 0, vy: 0,
        activity: "idle",
        activityTimer: 0,
      };
    });

    const activities = ["thinking...", "processing", "analyzing", "drafting", "reviewing", "optimizing"];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawOffice(w, h) {
      // Background
      ctx.fillStyle = "#08080f";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(108, 63, 224, 0.06)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Draw zones (desks/areas)
      ZONES.forEach(zone => {
        const zx = zone.x * w;
        const zy = zone.y * h;
        const zw = 90, zh = 50;
        ctx.fillStyle = "rgba(108, 63, 224, 0.06)";
        ctx.strokeStyle = "rgba(108, 63, 224, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(zx - zw/2, zy - zh/2, zw, zh, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(108, 63, 224, 0.5)";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(zone.name, zx, zy + zh/2 + 14);
      });
    }

    function drawAgent(agent, w, h) {
      const ax = agent.x * w;
      const ay = agent.y * h;

      // Glow
      const grad = ctx.createRadialGradient(ax, ay, 0, ax, ay, 20);
      grad.addColorStop(0, agent.color + "40");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ax, ay, 20, 0, Math.PI * 2);
      ctx.fill();

      // Agent dot
      ctx.fillStyle = agent.color;
      ctx.beginPath();
      ctx.arc(ax, ay, 6, 0, Math.PI * 2);
      ctx.fill();

      // Emoji above
      ctx.font = "14px serif";
      ctx.textAlign = "center";
      ctx.fillText(agent.emoji, ax, ay - 12);

      // Name label
      ctx.fillStyle = "rgba(240, 240, 255, 0.8)";
      ctx.font = "bold 9px monospace";
      ctx.fillText(agent.name.split(" ")[0], ax, ay + 18);

      // Activity bubble
      if (agent.activityTimer > 0) {
        ctx.fillStyle = "rgba(13, 13, 26, 0.85)";
        ctx.strokeStyle = agent.color + "60";
        ctx.lineWidth = 1;
        const text = agent.activity;
        const tw = ctx.measureText(text).width + 12;
        ctx.beginPath();
        ctx.roundRect(ax - tw/2, ay - 40, tw, 16, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = agent.color;
        ctx.font = "8px monospace";
        ctx.fillText(text, ax, ay - 29);
        agent.activityTimer--;
      }
    }

    function update() {
      agents.forEach(agent => {
        if (agent.pauseTimer > 0) { agent.pauseTimer--; return; }

        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;
        agent.vx += dx * 0.0006;
        agent.vy += dy * 0.0006;
        agent.vx *= 0.92;
        agent.vy *= 0.92;

        const speed = Math.sqrt(agent.vx * agent.vx + agent.vy * agent.vy);
        if (speed > 0.003) { agent.vx = (agent.vx/speed)*0.003; agent.vy = (agent.vy/speed)*0.003; }

        agent.x += agent.vx;
        agent.y += agent.vy;
        agent.x = Math.max(0.05, Math.min(0.95, agent.x));
        agent.y = Math.max(0.05, Math.min(0.95, agent.y));

        agent.targetTimer--;
        if (agent.targetTimer <= 0) {
          // Wander near home zone mostly, occasionally visit another zone
          const wander = Math.random() < 0.7;
          if (wander) {
            agent.targetX = agent.homeZone.x + (Math.random() - 0.5) * 0.15;
            agent.targetY = agent.homeZone.y + (Math.random() - 0.5) * 0.15;
          } else {
            const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
            agent.targetX = zone.x + (Math.random() - 0.5) * 0.08;
            agent.targetY = zone.y + (Math.random() - 0.5) * 0.08;
          }
          agent.targetTimer = 150 + Math.random() * 300;
          if (Math.random() < 0.3) {
            agent.pauseTimer = 40 + Math.random() * 80;
            agent.activity = activities[Math.floor(Math.random() * activities.length)];
            agent.activityTimer = 80;
          }
        }
      });
    }

    function drawConnections(w, h) {
      for (let i = 0; i < agents.length; i++) {
        for (let j = i+1; j < agents.length; j++) {
          const dx = (agents[i].x - agents[j].x) * w;
          const dy = (agents[i].y - agents[j].y) * h;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            const opacity = (1 - dist/120) * 0.2;
            ctx.strokeStyle = `rgba(108, 63, 224, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(agents[i].x * w, agents[i].y * h);
            ctx.lineTo(agents[j].x * w, agents[j].y * h);
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w || canvas.height !== h) resize();
      ctx.clearRect(0, 0, w, h);
      drawOffice(w, h);
      update();
      drawConnections(w, h);
      agents.forEach(a => drawAgent(a, w, h));
      animId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="min-h-screen bg-[#08080f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-900/20 bg-[#08080f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-white">agent<span className="text-[#6c3fe0]">0</span></Link>
          <div className="flex items-center gap-4">
            <Link href="/insights" className="text-sm text-[#8888aa] hover:text-white hidden md:block">Insights</Link>
            <Link href="/agents" className="text-sm text-[#8888aa] hover:text-white hidden md:block">Agents</Link>
            <Link href="/build" className="text-sm font-medium px-4 py-2 rounded-full bg-[#6c3fe0] text-white">Get Launchpad</Link>
          </div>
        </div>
      </nav>

      <div className="pt-14 md:pt-16 h-screen flex flex-col">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-purple-900/20 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">🏢 The Office</h1>
            <p className="text-xs text-[#8888aa]">7 agents — live activity</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-[#8888aa]">Running now</span>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Agent legend */}
        <div className="px-4 md:px-6 py-3 border-t border-purple-900/20 flex flex-wrap gap-3">
          {AGENTS.map(a => (
            <div key={a.id} className="flex items-center gap-1.5">
              <span className="text-sm">{a.emoji}</span>
              <span className="text-xs text-[#8888aa]">{a.name.split(" ")[0]}</span>
              <span className="text-xs text-[#555570]">· {a.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
