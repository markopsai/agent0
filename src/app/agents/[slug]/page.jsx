import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AgentProfilePage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: agent } = await supabase
    .from("agent_profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!agent) notFound();

  const careerEvents = Array.isArray(agent.career_events) ? agent.career_events : [];
  const skills = Array.isArray(agent.skills) ? agent.skills : [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Back */}
        <Link href="/agents" className="text-sm text-[#4f6fff] hover:underline mb-8 inline-block">← Back to team</Link>

        {/* Profile header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="text-7xl">{agent.emoji}</div>
          <div>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <p className="text-[#4f6fff] font-medium mt-1">{agent.role}</p>
            <p className="text-slate-500 text-sm mt-1">Joined {new Date(agent.joined_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            {agent.bio && <p className="text-slate-300 mt-4 leading-relaxed">{agent.bio}</p>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-sm px-3 py-1 rounded-full bg-[#13131a] border border-[#1e1e2e] text-slate-300">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Career timeline */}
        {careerEvents.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Career</h2>
            <div className="space-y-4">
              {careerEvents.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#4f6fff] mt-1.5 flex-shrink-0" />
                    {i < careerEvents.length - 1 && <div className="w-px flex-1 bg-[#1e1e2e] mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-slate-500 mb-1">{new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                    <p className="text-slate-300 text-sm">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
