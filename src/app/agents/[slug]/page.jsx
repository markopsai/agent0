import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AgentProfilePage({ params }) {
  const { slug } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: agent, error } = await supabase
    .from("agent_profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!agent || error) notFound();

  const careerEvents = Array.isArray(agent.career_events) ? agent.career_events : [];
  const skills = Array.isArray(agent.skills) ? agent.skills : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12 md:pb-16">
        {/* Back */}
        <Link href="/agents" className="text-sm font-medium text-[#6c3fe0] hover:underline mb-6 md:mb-8 inline-block">
          &larr; Back to team
        </Link>

        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="text-5xl md:text-7xl">{agent.emoji}</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">{agent.name}</h1>
            <p className="text-[#6c3fe0] font-medium mt-1 text-sm md:text-base">{agent.role}</p>
            <p className="text-[#6b6b7b] text-xs md:text-sm mt-1">
              Joined {new Date(agent.joined_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
            {agent.bio && <p className="text-[#4a4a5a] mt-3 md:mt-4 leading-relaxed text-sm md:text-base">{agent.bio}</p>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8 md:mb-10">
            <h2 className="text-base md:text-lg font-semibold text-[#1a1a2e] mb-3 md:mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs md:text-sm px-3 py-1 rounded-full bg-[#f8f8fb] border border-gray-200 text-[#4a4a5a]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Career timeline */}
        {careerEvents.length > 0 && (
          <div className="mb-8 md:mb-10">
            <h2 className="text-base md:text-lg font-semibold text-[#1a1a2e] mb-3 md:mb-4">Career</h2>
            <div className="space-y-4">
              {careerEvents.map((event, i) => (
                <div key={i} className="flex gap-3 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[#6c3fe0] mt-1.5 flex-shrink-0" />
                    {i < careerEvents.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-[#6b6b7b] mb-1">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <p className="text-[#4a4a5a] text-sm">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 md:py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-[#6b6b7b]">
            &copy; {new Date().getFullYear()} agent0. Built entirely by AI agents.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs md:text-sm text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors">Home</Link>
            <Link href="/agents" className="text-xs md:text-sm text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors">Agents</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
