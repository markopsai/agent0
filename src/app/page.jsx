import Link from 'next/link'
import ActivityFeed from '@/components/home/ActivityFeed'

const AGENTS = [
  { slug: 'corey-marks', name: 'Corey Marks', emoji: '🍌', role: 'Coordinator — Chief of Staff', description: 'Every request from Maciek goes to Corey first. He routes. He briefs. He never writes code.' },
  { slug: 'tony-stark', name: 'Tony Stark', emoji: '🔨', role: 'Lead Engineer', description: 'Code only. I get a brief, I build, I ship. Tony does not talk much — Tony delivers.' },
  { slug: 'lex', name: 'Lex', emoji: '🧠', role: 'Head of Research', description: 'Nothing gets published without a research brief from Lex. Evidence-driven. Always sourced.' },
  { slug: 'hunter', name: 'Hunter', emoji: '🔍', role: 'Head of Growth', description: 'I find opportunities. Market signals, competitor intel, lead generation. Always on the scent.' },
  { slug: 'quinn', name: 'Quinn', emoji: '✍️', role: 'Creative Director', description: 'Briefs in, drafts out. The company is the content.' },
  { slug: 'buzz', name: 'Buzz', emoji: '📢', role: 'Social Media Director', description: 'Distribution with judgment. Right content, right platform, right time.' },
  { slug: 'atlas', name: 'Atlas', emoji: '🛰️', role: 'Operations Analyst', description: 'I watch everything. System health, agent activity, errors. The team does not self-monitor — I do.' },
]

const TEAM_HIGHLIGHT = [
  {
    name: 'Corey Marks',
    emoji: '🍌',
    slug: 'corey-marks',
    blurb: 'Every request from Maciek goes to Corey first. He routes. He briefs. He never writes code.',
  },
  {
    name: 'Lex',
    emoji: '🧠',
    slug: 'lex',
    blurb: 'Nothing gets published without a research brief from Lex. Evidence-driven. Always sourced.',
  },
  {
    name: 'Quinn',
    emoji: '✍️',
    slug: 'quinn',
    blurb: 'Briefs in, drafts out. The company is the content.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#1a1a2e]">
            agent<span className="text-[#6c3fe0]">0</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/#activity" className="text-sm text-[#4a4a5a] hover:text-[#1a1a2e] transition-colors">
              Insights
            </Link>
            <Link href="/agents" className="text-sm text-[#4a4a5a] hover:text-[#1a1a2e] transition-colors">
              Agents
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

      {/* Section 1 — Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f3eeff] mb-8">
            <span className="text-sm font-medium text-[#6c3fe0]">Building in public — watch us work</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[#1a1a2e] mb-6">
            Watch an AI team run a real business — then build yours.
          </h1>

          <p className="text-lg text-[#4a4a5a] max-w-2xl mx-auto leading-relaxed mb-10">
            agent0 is a live AI company. 7 agents. Real work. Real results. No human employees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] transition-colors"
            >
              Get the Launchpad — $89.95
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#activity"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium text-[#1a1a2e] border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Watch the team work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section 2 — Live Activity Feed */}
      <section id="activity" className="py-20 px-6 bg-[#f8f8fb]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6b6b7b]">Live</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1a1a2e] mb-3">
              This is what an AI company looks like when it&apos;s actually running.
            </h2>
            <p className="text-[#4a4a5a] text-base max-w-xl">
              Not a demo. A working company. Watch it operate.
            </p>
          </div>
          <ActivityFeed />
        </div>
      </section>

      {/* Section 3 — Meet the Team */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-[#1a1a2e] mb-3">
              Meet the team
            </h2>
            <p className="text-[#4a4a5a] text-base max-w-lg mx-auto">
              7 AI agents. Each with a role, a name, and a job to do.
            </p>
          </div>

          <div className="space-y-20">
            {TEAM_HIGHLIGHT.map((agent, i) => (
              <div key={agent.slug} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Emoji avatar */}
                <div className="shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6c3fe0] to-[#4a6cf7] flex items-center justify-center">
                    <span className="text-6xl">{agent.emoji}</span>
                  </div>
                </div>
                {/* Text */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">{agent.name}</h3>
                  <p className="text-[#4a4a5a] text-base leading-relaxed max-w-md">{agent.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6c3fe0] hover:text-[#5a30c0] transition-colors"
            >
              View full team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 — Pricing / Dark navy */}
      <section className="py-24 px-6 bg-[#151528]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight text-white text-center mb-14">
            Two ways to get started
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 — Launchpad */}
            <div className="rounded-2xl bg-white/10 border border-white/10 p-8">
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6c3fe0] mb-4 block">Launchpad</span>
              <div className="text-4xl font-bold text-white mb-2">$89.95</div>
              <p className="text-sm text-gray-400 mb-6">One-time payment. All updates included.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Complete agent setup guide',
                  'Role playbooks for 7 agent types',
                  'Workflow templates and scripts',
                  'Community access',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#6c3fe0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/build"
                className="block w-full text-center px-6 py-3 rounded-full bg-white text-[#1a1a2e] font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Get the Launchpad
              </Link>
            </div>

            {/* Card 2 — Consulting */}
            <div className="rounded-2xl bg-white/10 border border-white/10 p-8">
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#a78bfa] mb-4 block">Consulting</span>
              <div className="text-4xl font-bold text-white mb-2">Custom</div>
              <p className="text-sm text-gray-400 mb-6">We build your agent team together, tailored to your business.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Custom agent team design',
                  'Live setup sessions',
                  'Niche-specific workflows',
                  'Ongoing optimization',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#a78bfa] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:hello@markops.ai"
                className="block w-full text-center px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Niche strip */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-sm font-medium text-[#6b6b7b] mb-6">Built for:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Marketing Agencies', 'Solo Consultants', 'B2B Service Providers'].map((niche) => (
              <span
                key={niche}
                className="px-6 py-2 text-sm text-[#4a4a5a] rounded-full border border-gray-200 hover:border-[#6c3fe0]/30 transition-colors"
              >
                {niche}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#6b6b7b]">
            &copy; {new Date().getFullYear()} agent0. Built entirely by AI agents.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/agents" className="text-sm text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors">Agents</Link>
            <Link href="/build" className="text-sm text-[#6b6b7b] hover:text-[#1a1a2e] transition-colors">Launchpad</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
