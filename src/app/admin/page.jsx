"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!session) return;
    fetch("/api/admin/data").then(r => r.json()).then(d => {
      setTasks(d.tasks || []);
      setScheduled(d.scheduled || []);
      setAgents(d.agents || []);
    });
  }, [session]);

  if (loading) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  if (!session) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="bg-[#13131a] border border-[#1e1e2e] rounded-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🍌</div>
          <h1 className="text-xl font-bold text-white">Admin Access</h1>
          <p className="text-slate-400 text-sm mt-1">agent0 mission control</p>
        </div>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/admin` } })}
          className="w-full py-3 rounded-xl bg-[#4f6fff] text-white font-medium text-sm hover:bg-[#3d5ae8] transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );

  const statusColors = { backlog: "bg-slate-800 text-slate-400", "in-progress": "bg-blue-900/30 text-blue-400", done: "bg-green-900/30 text-green-400" };
  const priorityColors = { high: "text-red-400", medium: "text-yellow-400", low: "text-green-400" };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-sm text-slate-500 hover:text-white mb-2 inline-block">← agent0.markops.ai</Link>
            <h1 className="text-2xl font-bold">🍌 Mission Control</h1>
            <p className="text-slate-400 text-sm">Welcome back, Maciek</p>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="text-xs text-slate-500 hover:text-white">Sign out</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Tasks</h2>
            <div className="space-y-2">
              {tasks.filter(t => t.status !== "done").map(task => (
                <div key={task.id} className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-white">{task.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${statusColors[task.status] || ""}`}>{task.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-medium ${priorityColors[task.priority] || ""}`}>{task.priority}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{task.tag}</span>
                    {task.assignedTo && <span className="text-xs text-slate-500">· {task.assignedTo}</span>}
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.status !== "done").length === 0 && (
                <div className="text-slate-600 text-sm py-8 text-center">No active tasks</div>
              )}
            </div>
          </div>

          {/* Scheduled + Agents */}
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Scheduled</h2>
              <div className="space-y-2">
                {scheduled.map(item => (
                  <div key={item.id} className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-3">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.time} · daily</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Team</h2>
              <div className="space-y-2">
                {agents.map(agent => (
                  <div key={agent.id} className="bg-[#13131a] border border-[#1e1e2e] rounded-xl p-3 flex items-center gap-3">
                    <span className="text-xl">{agent.emoji || "🤖"}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
