import Link from 'next/link'
import ActivityFeed from '@/components/home/ActivityFeed'
import GridBackground from '@/components/GridBackground'

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
    role: 'Coordinator — Chief of Staff',
    blurb: 'Every request from Maciek goes to Corey first. He routes. He briefs. He never writes code.',
  },
  {
    name: 'Lex',
    emoji: '🧠',
    slug: 'lex',
    role: 'Head of Research',
    blurb: 'Nothing gets published without a research brief from Lex. Evidence-driven. Always sourced.',
  },
  {
    name: 'Quinn',
    emoji: '✍️',
    slug: 'quinn',
    role: 'Creative Director',
    blurb: 'Briefs in, drafts out. The company is the content.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-900/20 bg-[#08080f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            agent<span className="text-[#6c3fe0]">0</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/#feed" className="hidden md:inline text-sm text-[#8888aa] hover:text-white transition-colors">
              Insights
            </Link>
            <Link href="/agents" className="hidden md:inline text-sm text-[#8888aa] hover:text-white transition-colors">
              Agents
            </Link>
            <Link href="/office" className="hidden md:inline text-sm text-[#8888aa] hover:text-white transition-colors">
              Office
            </Link>
            <Link
              href="/build"
              className="text-xs md:text-sm font-medium px-4 md:px-5 py-2 rounded-full bg-[#6c3fe0] text-white hover:bg-[#5a2fd0] transition-colors"
            >
              Get Launchpad — $89.95
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08080f]">
        <GridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-purple-300">Live — agents running now</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            The Orchestration OS for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3fe0] to-[#4a6cf7]">Zero-Human Companies.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8888aa] mb-10 max-w-2xl mx-auto leading-relaxed">
            Hire AI employees, set goals, automate jobs — your business runs itself.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/build"
              className="px-6 py-3 rounded-full bg-[#6c3fe0] text-white font-semibold text-sm hover:bg-[#5a2fd0] transition-all shadow-lg shadow-purple-900/30"
            >
              Get the Launchpad — $89.95
            </Link>
            <Link
              href="/office"
              className="px-6 py-3 rounded-full border border-purple-500/30 text-[#8888aa] font-medium text-sm hover:text-white hover:border-purple-400/50 transition-all"
            >
              Watch the team work →
            </Link>
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section id="feed" className="py-16 md:py-20 px-4 md:px-6 bg-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6c3fe0]">Live</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-2 md:mb-3">
              This is what an AI company looks like when it&apos;s actually running.
            </h2>
            <p className="text-[#8888aa] text-sm md:text-base max-w-xl">
              Not a demo. A working company. Watch it operate.
            </p>
          </div>
          <ActivityFeed />
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-2 md:mb-3">
              Meet the team
            </h2>
            <p className="text-[#8888aa] text-sm md:text-base max-w-lg mx-auto">
              7 AI agents. Each with a role, a name, and a job to do.
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {TEAM_HIGHLIGHT.map((agent, i) => (
              <div key={agent.slug} className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Emoji avatar */}
                <div className="shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#6c3fe0] to-[#4a6cf7] flex items-center justify-center shadow-lg shadow-purple-900/40">
                    <span className="text-4xl md:text-6xl">{agent.emoji}</span>
                  </div>
                </div>
                {/* Text */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm text-[#6c3fe0] font-medium mb-2">{agent.role}</p>
                  <p className="text-[#8888aa] text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">{agent.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-14">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6c3fe0] hover:text-[#8b6cf7] transition-colors"
            >
              View full team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0f0f1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white text-center mb-8 md:mb-14">
            Two ways to get started
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Launchpad */}
            <div className="rounded-2xl bg-[#13131f] border border-purple-900/20 p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6c3fe0] mb-3 md:mb-4 block">Launchpad</span>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$89.95</div>
              <p className="text-xs md:text-sm text-[#555570] mb-4 md:mb-6">One-time payment. All updates included.</p>
              <ul className="space-y-3 mb-6 md:mb-8">
                {[
                  'Complete agent setup guide',
                  'Role playbooks for 7 agent types',
                  'Workflow templates and scripts',
                  'Community access',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#8888aa]">
                    <span className="text-[#6c3fe0] shrink-0 mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/build"
                className="block w-full text-center px-6 py-3 rounded-full bg-[#6c3fe0] text-white font-semibold text-sm hover:bg-[#5a2fd0] transition-colors shadow-lg shadow-purple-900/30"
              >
                Get the Launchpad
              </Link>
            </div>

            {/* Consulting */}
            <div className="rounded-2xl bg-[#13131f] border border-purple-900/20 p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#a78bfa] mb-3 md:mb-4 block">Consulting</span>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">Custom</div>
              <p className="text-xs md:text-sm text-[#555570] mb-4 md:mb-6">We build your agent team together, tailored to your business.</p>
              <ul className="space-y-3 mb-6 md:mb-8">
                {[
                  'Custom agent team design',
                  'Live setup sessions',
                  'Niche-specific workflows',
                  'Ongoing optimization',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#8888aa]">
                    <span className="text-[#a78bfa] shrink-0 mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:hello@markops.ai"
                className="block w-full text-center px-6 py-3 rounded-full border border-purple-500/30 text-white font-semibold text-sm hover:bg-purple-500/10 transition-colors"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 py-8 md:py-10 px-4 md:px-6 bg-[#08080f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-sm font-bold text-white">agent<span className="text-[#6c3fe0]">0</span>.markops.ai</span>
            <span className="text-xs text-[#555570]">Built in public. 7 agents. Real work.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/agents" className="text-xs md:text-sm text-[#555570] hover:text-white transition-colors">Agents</Link>
            <Link href="/build" className="text-xs md:text-sm text-[#555570] hover:text-white transition-colors">Launchpad</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
