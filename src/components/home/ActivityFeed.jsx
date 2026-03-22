'use client'

import { useState, useEffect, useRef } from 'react'

const AGENTS = {
  'corey-marks': { name: 'Corey Marks', role: 'Coordinator', color: '#4f6fff' },
  'tony-stark':  { name: 'Tony Stark', role: 'Lead Engineer', color: '#4f6fff' },
  'lex':         { name: 'Lex', role: 'Research', color: '#4f6fff' },
  'hunter':      { name: 'Hunter', role: 'Growth', color: '#4f6fff' },
  'quinn':       { name: 'Quinn', role: 'Creative', color: '#4f6fff' },
  'buzz':        { name: 'Buzz', role: 'Social', color: '#4f6fff' },
  'atlas':       { name: 'Atlas', role: 'Operations', color: '#4f6fff' },
}

const MOCK_ACTIVITY = [
  { agent: 'quinn', action: 'Published "Why AI Teams Will Replace Departments" to the blog', time: '2 min ago' },
  { agent: 'buzz', action: 'Scheduled 12 posts across LinkedIn and X for this week', time: '5 min ago' },
  { agent: 'atlas', action: 'Landing page conversion improved — 4.2% → 5.1% after copy test', time: '8 min ago' },
  { agent: 'tony-stark', action: 'Deployed agent dashboard v2.3 to production', time: '12 min ago' },
  { agent: 'lex', action: 'Identified 3 competitor moves in AI ops space — brief sent to Corey', time: '15 min ago' },
  { agent: 'hunter', action: 'Sourced 14 new lead opportunities from market signals', time: '18 min ago' },
  { agent: 'corey-marks', action: 'Reassigned weekly priorities based on revenue metrics', time: '23 min ago' },
  { agent: 'quinn', action: 'Drafted email sequence for Launchpad buyers — 5 emails, 3 days', time: '31 min ago' },
  { agent: 'atlas', action: 'Weekly report: 2,847 visitors, 142 signups, $4,280 revenue', time: '38 min ago' },
  { agent: 'tony-stark', action: 'Fixed authentication edge case on mobile Safari', time: '45 min ago' },
  { agent: 'buzz', action: 'Replied to 23 comments and 8 DMs across platforms', time: '52 min ago' },
  { agent: 'lex', action: 'Updated positioning doc based on customer interview analysis', time: '1 hr ago' },
  { agent: 'hunter', action: 'Created competitor landscape brief for Q1 planning', time: '1 hr ago' },
  { agent: 'corey-marks', action: 'Approved Quinn\'s content calendar for next 2 weeks', time: '1 hr ago' },
]

function StatusDot({ color }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  )
}

function ActivityItem({ activity, index }) {
  const agent = AGENTS[activity.agent]
  return (
    <div
      className="flex items-start gap-4 py-4 px-5 rounded-xl transition-all duration-300 hover:bg-white/[0.03] group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3 shrink-0 w-32">
        <StatusDot color={agent.color} />
        <span className="text-sm font-semibold" style={{ color: agent.color }}>
          {agent.name}
        </span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed flex-1 group-hover:text-gray-300 transition-colors">
        {activity.action}
      </p>
      <span className="text-xs text-gray-600 shrink-0 tabular-nums">
        {activity.time}
      </span>
    </div>
  )
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState(MOCK_ACTIVITY)
  const feedRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Cycle a new item to top every 8 seconds when not hovered
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActivities(prev => {
        const last = prev[prev.length - 1]
        const updated = { ...last, time: 'just now' }
        return [updated, ...prev.slice(0, prev.length - 1)]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div
      ref={feedRef}
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Feed</span>
        </div>
        <span className="text-xs text-gray-600">{activities.length} events today</span>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-white/[0.04] max-h-[520px] overflow-y-auto scrollbar-hide">
        {activities.map((activity, i) => (
          <ActivityItem key={`${activity.agent}-${activity.time}-${i}`} activity={activity} index={i} />
        ))}
      </div>

      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  )
}
