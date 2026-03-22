import Link from 'next/link'

const AGENTS = [
  {
    slug: 'corey-marks',
    name: 'Corey Marks',
    emoji: '🍌',
    role: 'Coordinator — Chief of Staff',
    bio: 'The intake layer — the Chief of Staff who shapes every incoming request into a clear brief. He clarifies scope, assigns the right agent, and keeps the entire team aligned.',
  },
  {
    slug: 'tony-stark',
    name: 'Tony Stark',
    emoji: '🔨',
    role: 'Lead Engineer',
    bio: 'Tony is the builder. He gets a brief, he builds, he ships. Full stack — from database migrations to frontend components to API integrations.',
  },
  {
    slug: 'lex',
    name: 'Lex',
    emoji: '🧠',
    role: 'Head of Research',
    bio: 'Evidence-driven intelligence. Lex sources, verifies, and briefs. When the landscape shifts, Lex sees it first.',
  },
  {
    slug: 'hunter',
    name: 'Hunter',
    emoji: '🔍',
    role: 'Head of Growth',
    bio: 'Hunter finds opportunities. Market signals, competitor intel, lead generation — he tracks everything that moves.',
  },
  {
    slug: 'quinn',
    name: 'Quinn',
    emoji: '✍️',
    role: 'Creative Director',
    bio: 'Quinn writes everything — blog posts, email sequences, landing page copy, social captions. Everything sourced from real activity.',
  },
  {
    slug: 'buzz',
    name: 'Buzz',
    emoji: '📢',
    role: 'Social Media Director',
    bio: 'Buzz owns distribution. Right content, right platform, right time. Distribution with judgment across every channel.',
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    emoji: '🛰️',
    role: 'Operations Analyst',
    bio: 'Atlas watches everything. System health, agent activity, errors, performance metrics. The observability layer that keeps the operation clean.',
  },
]

function AgentCard({ agent }) {
  return (
    <Link href={`/agents/${agent.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="text-5xl mb-4">{agent.emoji}</div>
        <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1">{agent.name}</h3>
        <p className="text-[13px] font-medium text-[#6c3fe0] mb-3">{agent.role}</p>
        <p className="text-sm text-[#4a4a5a] leading-relaxed">{agent.bio}</p>
        <div className="mt-4">
          <span className="text-sm font-medium text-[#6c3fe0] group-hover:underline">
            View profile &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#1a1a2e]">
            agent<span className="text-[#6c3fe0]">0</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm text-[#4a4a5a] hover:text-[#1a1a2e] transition-colors">
              Home
            </Link>
            <Link
              href="/build"
              className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] transition-colors"
            >
              Get Launchpad — $89.95
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a2e] mb-4">
            The Team
          </h1>
          <p className="text-lg text-[#4a4a5a] max-w-lg mx-auto">
            7 AI agents. Each with a role, a personality, and a job to do.
          </p>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#6b6b7b]">
            &copy; {new Date().getFullYear()} agent0. Built entirely by AI agents.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors">Home</Link>
            <Link href="/build" className="text-sm text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors">Launchpad</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
