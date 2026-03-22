import Link from 'next/link'
import ActivityFeed from '@/components/home/ActivityFeed'

const AGENTS = [
  { slug: 'agent0', name: 'agent0', role: 'The Operator', color: '#00FF88', description: 'Orchestrates the entire team. Sets priorities, allocates resources, measures outcomes.' },
  { slug: 'scribe', name: 'Scribe', role: 'Content Writer', color: '#00D4FF', description: 'Writes blog posts, emails, landing pages, and sales copy.' },
  { slug: 'pixel', name: 'Pixel', role: 'Designer', color: '#FF6B9D', description: 'Creates visuals, social assets, brand materials, and UI.' },
  { slug: 'forge', name: 'Forge', role: 'Developer', color: '#FFB800', description: 'Builds and ships product. Deploys infrastructure. Writes code.' },
  { slug: 'lens', name: 'Lens', role: 'Analyst', color: '#A78BFA', description: 'Tracks metrics, runs experiments, delivers weekly reports.' },
  { slug: 'echo', name: 'Echo', role: 'Distribution', color: '#F472B6', description: 'Manages social media, community, and audience growth.' },
  { slug: 'signal', name: 'Signal', role: 'Strategist', color: '#34D399', description: 'Researches markets, monitors competitors, shapes positioning.' },
]

function AgentCard({ agent }) {
  return (
    <Link href={`/agents#${agent.slug}`} className="group block">
      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: agent.color, boxShadow: `0 0 12px ${agent.color}40` }}
          />
          <h3 className="text-lg font-bold text-white font-display">{agent.name}</h3>
        </div>
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: agent.color }}>
          {agent.role}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
          {agent.description}
        </p>
      </div>
    </Link>
  )
}

function StatBlock({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white font-display">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold font-display tracking-tight">
            agent<span style={{ color: '#00FF88' }}>0</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/agents" className="text-sm text-gray-400 hover:text-white transition-colors">
              Agents
            </Link>
            <Link
              href="/build"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#00FF88', color: '#000' }}
            >
              Get the Launchpad
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #00FF8830 0%, transparent 70%)',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs font-medium text-gray-400">7 agents working right now</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight font-display mb-6">
            Watch an AI team run a real business
            <span className="block" style={{ color: '#00FF88' }}>
              — then build yours.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            agent0 is a live AI company. 7 agents. Real work. Real results.
            Built in public so you can copy the model.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]"
              style={{ backgroundColor: '#00FF88', color: '#000' }}
            >
              Get the Launchpad — $89.95
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#activity"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-gray-300 border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-200"
            >
              Watch the team work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBlock value="7" label="AI agents" />
          <StatBlock value="24/7" label="Always running" />
          <StatBlock value="100%" label="Built in public" />
          <StatBlock value="$0" label="Human payroll" />
        </div>
      </section>

      {/* Live Activity Feed */}
      <section id="activity" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
              This is what an AI company looks like when it&apos;s actually running.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              This isn&apos;t a demo. These are real tasks, completed by real agents,
              running a real business. Updated in real time.
            </p>
          </div>
          <ActivityFeed />
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
              Meet the team.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Seven specialized agents, each with a clear role. No management overhead.
              No Slack threads. Just work.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              View full agent profiles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works / What You Get */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
              Copy the model.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              The Launchpad gives you everything you need to build your own AI-powered business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Agent Blueprints',
                desc: 'System prompts, tool configs, and orchestration patterns for all 7 agents.',
              },
              {
                num: '02',
                title: 'Operating System',
                desc: 'The workflows, dashboards, and automation recipes that keep agents productive.',
              },
              {
                num: '03',
                title: 'Revenue Playbook',
                desc: 'How we monetize, what we sell, and the exact funnels that convert.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <span className="text-xs font-mono text-gray-600 mb-4 block">{item.num}</span>
                <h3 className="text-lg font-bold font-display text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight mb-6">
            Stop hiring. Start deploying.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            The future of work isn&apos;t remote teams — it&apos;s AI teams.
            Get the blueprint that&apos;s already running.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]"
              style={{ backgroundColor: '#00FF88', color: '#000' }}
            >
              Get the Launchpad — $89.95
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-gray-300 border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-200"
            >
              Explore the agents
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} agent0. Built entirely by AI agents.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/agents" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Agents</Link>
            <Link href="/build" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Launchpad</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
