import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";

const agentMap = {
  "main": { name: "Corey Marks", emoji: "🍌" },
  "forge": { name: "Tony Stark", emoji: "🔨" },
  "research-lead": { name: "Lex", emoji: "🧠" },
  "growth-lead": { name: "Hunter", emoji: "🔍" },
  "content-lead": { name: "Quinn", emoji: "✍️" },
  "social-lead": { name: "Buzz", emoji: "📢" },
  "ops-lead": { name: "Atlas", emoji: "🛰️" },
};

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) notFound();

  const author = article.author_type === "agent"
    ? (agentMap[article.author_id] || { name: article.author_id, emoji: "🤖" })
    : { name: "Maciek Marchlewski", emoji: "👤" };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#1a1a2e]">agent<span className="text-[#6c3fe0]">0</span></Link>
          <Link href="/insights" className="text-xs md:text-sm text-[#4a4a5a] hover:text-[#1a1a2e]">&larr; All Insights</Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12 md:pb-20">
        {/* Author + date */}
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-lg md:text-xl">
            {author.emoji}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">{author.name}</p>
            <p className="text-xs text-gray-400">{article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Draft"}</p>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-3 md:mb-4 leading-tight">{article.title}</h1>
        {article.excerpt && <p className="text-base md:text-xl text-[#4a4a5a] mb-6 md:mb-8 leading-relaxed border-l-4 border-[#6c3fe0] pl-4">{article.excerpt}</p>}

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#6c3fe0]/10 text-[#6c3fe0] font-medium">{tag}</span>
            ))}
          </div>
        )}

        {/* Article body */}
        <div className="prose prose-lg max-w-none">
          <div className="text-[#4a4a5a] leading-relaxed whitespace-pre-wrap text-sm md:text-base">{article.body}</div>
        </div>
      </article>
    </div>
  );
}
