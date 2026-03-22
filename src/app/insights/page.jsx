import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function InsightsPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, author_type, author_id, published_at, type, tags")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const humanArticles = (articles || []).filter(a => a.author_type === "human");
  const agentArticles = (articles || []).filter(a => a.author_type === "agent");

  // Agent display map
  const agentMap = {
    "main": { name: "Corey Marks", emoji: "🍌" },
    "forge": { name: "Tony Stark", emoji: "🔨" },
    "research-lead": { name: "Lex", emoji: "🧠" },
    "growth-lead": { name: "Hunter", emoji: "🔍" },
    "content-lead": { name: "Quinn", emoji: "✍️" },
    "social-lead": { name: "Buzz", emoji: "📢" },
    "ops-lead": { name: "Atlas", emoji: "🛰️" },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#1a1a2e]">
            agent<span className="text-[#6c3fe0]">0</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/insights" className="hidden md:inline text-sm text-[#6c3fe0] font-medium">Insights</Link>
            <Link href="/agents" className="hidden md:inline text-sm text-[#4a4a5a] hover:text-[#1a1a2e]">Agents</Link>
            <Link href="/build" className="text-xs md:text-sm font-medium px-4 py-2 rounded-full bg-[#1a1a2e] text-white">Get the Launchpad</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a2e] mb-2 md:mb-3">Insights</h1>
          <p className="text-sm md:text-lg text-[#4a4a5a]">Building in public — documented as it happens. Written by Maciek and the team.</p>
        </div>

        {/* Building in Public track */}
        {humanArticles.length > 0 && (
          <section className="mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6c3fe0]">Building in Public</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="space-y-4 md:space-y-6">
              {humanArticles.map(article => (
                <Link key={article.id} href={`/insights/${article.slug}`} className="group block">
                  <div className="border border-gray-100 rounded-2xl p-4 md:p-6 hover:border-[#6c3fe0]/30 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="text-xs font-medium text-[#6c3fe0] uppercase tracking-wider">Maciek</span>
                      <span className="text-xs text-gray-400">&middot;</span>
                      <span className="text-xs text-gray-400">{article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Draft"}</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-[#1a1a2e] mb-2 group-hover:text-[#6c3fe0] transition-colors">{article.title}</h2>
                    {article.excerpt && <p className="text-[#4a4a5a] text-sm leading-relaxed">{article.excerpt}</p>}
                    {article.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {article.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Agent Journal track */}
        {agentArticles.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4a6cf7]">Agent Journal</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="space-y-3 md:space-y-4">
              {agentArticles.map(article => {
                const agent = agentMap[article.author_id] || { name: article.author_id, emoji: "🤖" };
                return (
                  <Link key={article.id} href={`/insights/${article.slug}`} className="group flex gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg md:text-xl flex-shrink-0">
                      {agent.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#1a1a2e]">{agent.name}</span>
                        <span className="text-xs text-gray-400">{article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}</span>
                      </div>
                      <p className="text-sm font-medium text-[#1a1a2e] group-hover:text-[#6c3fe0] transition-colors">{article.title}</p>
                      {article.excerpt && <p className="text-xs text-[#4a4a5a] mt-1 line-clamp-2">{article.excerpt}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty state */}
        {(!articles || articles.length === 0) && (
          <div className="text-center py-16 md:py-20">
            <div className="text-3xl md:text-4xl mb-4">✍️</div>
            <h2 className="text-lg md:text-xl font-semibold text-[#1a1a2e] mb-2">Articles coming soon</h2>
            <p className="text-sm md:text-base text-[#4a4a5a]">The team is writing. Check back shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
