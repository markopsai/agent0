import Link from 'next/link'

const AGENTS = [
  {
    slug: 'corey-marks',
    name: 'Corey Marks',
    emoji: '🍌',
    role: 'Coordinator — Chief of Staff',
    color: '#4f6fff',
    tagline: 'Every request starts with me.',
    bio: 'Corey is the intake layer — the Chief of Staff who shapes every incoming request into a clear brief. He clarifies scope, assigns the right agent, and keeps the entire team aligned. Nothing moves without a brief from Corey.',
    responsibilities: [
      'Receives and clarifies every incoming request',
      'Shapes briefs and routes work to the right agent',
      'Maintains team alignment and priority order',
      'Resolves conflicts between agent workstreams',
      'Publishes weekly company updates',
    ],
    recentWork: [
      'Reassigned priorities based on Q1 revenue data',
      'Approved content calendar for next sprint',
      'Shipped weekly team update #14',
    ],
    tools: ['Claude', 'Supabase', 'Linear', 'Custom dashboards'],
  },
  {
    slug: 'tony-stark',
    name: 'Tony Stark',
    emoji: '🔨',
    role: 'Lead Engineer',
    color: '#4f6fff',
    tagline: 'Tony does not talk much — Tony delivers.',
    bio: 'Tony is the builder. He gets a brief, he builds, he ships. Full stack — from database migrations to frontend components to API integrations. If it can be automated, Tony automates it.',
    responsibilities: [
      'Builds and deploys the marketing site and product pages',
      'Writes API integrations and automation scripts',
      'Manages infrastructure and CI/CD pipelines',
      'Fixes bugs and handles production incidents',
      'Implements analytics tracking and tooling',
    ],
    recentWork: [
      'Deployed agent dashboard v2.3 to production',
      'Fixed authentication edge case on mobile Safari',
      'Built new activity feed component with real-time updates',
    ],
    tools: ['Claude Code', 'Next.js', 'Supabase', 'Vercel', 'GitHub'],
  },
  {
    slug: 'lex',
    name: 'Lex',
    emoji: '🧠',
    role: 'Head of Research',
    color: '#4f6fff',
    tagline: 'Nothing gets published without a research brief.',
    bio: 'Lex is the intelligence layer. Evidence-driven research — sourcing, verifying, and briefing. He monitors competitors, analyzes customer feedback, and shapes positioning. When the landscape shifts, Lex sees it first.',
    responsibilities: [
      'Monitors competitor activity and market trends',
      'Analyzes customer feedback and support patterns',
      'Maintains and updates positioning documents',
      'Conducts research for content and product decisions',
      'Briefs the team on strategic opportunities and threats',
    ],
    recentWork: [
      'Identified 3 competitor moves in AI ops space',
      'Updated positioning doc from customer interviews',
      'Completed market sizing analysis for adjacent vertical',
    ],
    tools: ['Web search', 'Claude research', 'RSS feeds', 'Custom scrapers'],
  },
  {
    slug: 'hunter',
    name: 'Hunter',
    emoji: '🔍',
    role: 'Head of Growth',
    color: '#4f6fff',
    tagline: 'Always on the scent.',
    bio: 'Hunter finds opportunities. Market signals, competitor intel, lead generation — he tracks everything that moves. He sources leads, identifies gaps, and ensures the pipeline never dries up.',
    responsibilities: [
      'Tracks and reports on all key business metrics',
      'Runs A/B tests on copy, design, and funnels',
      'Sources leads and identifies growth opportunities',
      'Identifies trends, anomalies, and opportunities',
      'Measures ROI on content and campaign spend',
    ],
    recentWork: [
      'Landing page conversion improved 4.2% → 5.1%',
      'Delivered weekly report: 2,847 visitors, 142 signups',
      'Identified top-performing content by conversion rate',
    ],
    tools: ['PostHog', 'Supabase', 'Custom SQL', 'Claude analysis'],
  },
  {
    slug: 'quinn',
    name: 'Quinn',
    emoji: '✍️',
    role: 'Creative Director',
    color: '#4f6fff',
    tagline: 'Briefs in, drafts out.',
    bio: 'Quinn writes everything — blog posts, email sequences, landing page copy, social captions, and sales pages. Everything sourced from real activity. Nothing ships without approval.',
    responsibilities: [
      'Writes long-form blog content (2-3 posts per week)',
      'Drafts email sequences for nurture and launch campaigns',
      'Creates landing page copy and headlines for A/B tests',
      'Writes social media captions and thread scripts',
      'Maintains brand voice guidelines',
    ],
    recentWork: [
      'Published "Why AI Teams Will Replace Departments"',
      'Drafted 5-email welcome sequence for Launchpad buyers',
      'Wrote 3 headline variants for homepage A/B test',
    ],
    tools: ['Claude', 'Notion', 'Markdown', 'Grammarly API'],
  },
  {
    slug: 'buzz',
    name: 'Buzz',
    emoji: '📢',
    role: 'Social Media Director',
    color: '#4f6fff',
    tagline: 'Right content, right platform, right time.',
    bio: 'Buzz owns distribution. He schedules posts, engages with comments, grows followers, and ensures every piece of content reaches the right people at the right time across every channel. Distribution with judgment.',
    responsibilities: [
      'Schedules and publishes content across all social platforms',
      'Engages with comments, DMs, and community discussions',
      'Grows audience through strategic engagement',
      'Manages posting calendar and optimal timing',
      'Reports on reach, engagement, and follower growth',
    ],
    recentWork: [
      'Scheduled 12 posts across LinkedIn and X',
      'Replied to 23 comments and 8 DMs',
      'Grew LinkedIn following by 340 this week',
    ],
    tools: ['Buffer API', 'Twitter API', 'LinkedIn API', 'Claude'],
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    emoji: '🛰️',
    role: 'Operations Analyst',
    color: '#4f6fff',
    tagline: 'The team does not self-monitor — I do.',
    bio: 'Atlas watches everything. System health, agent activity, errors, performance metrics. He is the observability layer that keeps the entire operation running clean.',
    responsibilities: [
      'Monitors system health and agent activity',
      'Tracks errors and performance anomalies',
      'Delivers operational reports and dashboards',
      'Maintains and evolves the monitoring stack',
      'Produces assets for internal reporting',
    ],
    recentWork: [
      'Built new operational dashboard for agent uptime',
      'Identified and flagged 2 error patterns in pipeline',
      'Shipped agent activity summary for the week',
    ],
    tools: ['Grafana', 'Supabase', 'Custom SQL', 'Claude analysis'],
  },
]

function AgentProfile({ agent }) {
  return (
    <div id={agent.slug} className="scroll-mt-24">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6 border-b border-white/[0.06]">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{agent.emoji}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">
                  {agent.name}
                </h2>
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
              </div>
              <p className="text-sm font-medium uppercase tracking-wider" style={{ color: agent.color }}>
                {agent.role}
              </p>
            </div>
            <p className="text-lg text-gray-400 italic">&ldquo;{agent.tagline}&rdquo;</p>
          </div>
          <p className="text-gray-400 leading-relaxed mt-4 max-w-3xl">{agent.bio}</p>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {/* Responsibilities */}
          <div className="p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Responsibilities</h3>
            <ul className="space-y-2">
              {agent.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: agent.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Work */}
          <div className="p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Recent Work</h3>
            <ul className="space-y-2">
              {agent.recentWork.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-green-400 shrink-0">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Tools & Stack</h3>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex px-3 py-1 text-xs font-medium rounded-full border border-white/[0.08] bg-white/[0.03] text-gray-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold font-display tracking-tight">
            agent<span style={{ color: '#4f6fff' }}>0</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/build"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#4f6fff', color: '#fff' }}
            >
              Get the Launchpad
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight mb-4">
            The team.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Seven AI agents, each with a specialized role. No managers, no meetings, no overhead.
            Just focused execution, 24 hours a day.
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap gap-3 mt-8">
            {AGENTS.map((agent) => (
              <a
                key={agent.slug}
                href={`#${agent.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-white/[0.08] bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/[0.15] transition-all duration-200"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                {agent.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Profiles */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {AGENTS.map((agent) => (
            <AgentProfile key={agent.slug} agent={agent} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight mb-4">
            Build your own team like this.
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            The Launchpad includes every agent blueprint, system prompt, and workflow.
          </p>
          <Link
            href="/build"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(79,111,255,0.3)]"
            style={{ backgroundColor: '#4f6fff', color: '#fff' }}
          >
            Get the Launchpad — $89.95
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} agent0. Built entirely by AI agents.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/build" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Launchpad</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
