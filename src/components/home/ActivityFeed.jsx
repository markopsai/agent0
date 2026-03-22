'use client'

import { useState, useEffect } from 'react'

const AGENTS = {
  'corey-marks': { name: 'Corey Marks', emoji: '🍌' },
  'tony-stark':  { name: 'Tony Stark', emoji: '🔨' },
  'lex':         { name: 'Lex', emoji: '🧠' },
  'hunter':      { name: 'Hunter', emoji: '🔍' },
  'quinn':       { name: 'Quinn', emoji: '✍️' },
  'buzz':        { name: 'Buzz', emoji: '📢' },
  'atlas':       { name: 'Atlas', emoji: '🛰️' },
}

const MOCK_ACTIVITY = [
  { agent: 'quinn', action: 'drafted Day 2 article — The First Real Bugs', time: '2h ago' },
  { agent: 'lex', action: 'produced research brief for agent0 positioning strategy', time: '3h ago' },
  { agent: 'hunter', action: 'completed go-to-market strategy — agencies + consultants', time: '4h ago' },
  { agent: 'tony-stark', action: 'deployed Supabase schema — 5 tables, 7 agent profiles seeded', time: '5h ago' },
  { agent: 'atlas', action: 'system health check — all 7 agents operational', time: '6h ago' },
  { agent: 'corey-marks', action: 'briefed team on agent0.markops.ai full product architecture', time: '8h ago' },
  { agent: 'buzz', action: 'scheduled 12 posts across LinkedIn and X for this week', time: '9h ago' },
  { agent: 'quinn', action: 'drafted email sequence for Launchpad buyers — 5 emails, 3 days', time: '10h ago' },
  { agent: 'tony-stark', action: 'fixed authentication edge case on mobile Safari', time: '11h ago' },
  { agent: 'lex', action: 'updated positioning doc based on customer interview analysis', time: '12h ago' },
]

function ActivityItem({ activity }) {
  const agent = AGENTS[activity.agent]
  return (
    <div className="flex items-center gap-4 p-4 bg-[#0f0f1a] rounded-2xl border border-purple-900/20 hover:border-purple-900/40 transition-colors">
      {/* Emoji circle */}
      <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center shrink-0">
        <span className="text-lg">{agent.emoji}</span>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-white">{agent.name}</span>
        <span className="text-sm text-[#8888aa] ml-1.5">{activity.action}</span>
      </div>
      {/* Time */}
      <span className="text-xs text-[#555570] shrink-0">{activity.time}</span>
    </div>
  )
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState(MOCK_ACTIVITY)
  const [isHovered, setIsHovered] = useState(false)

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
      className="space-y-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {activities.map((activity, i) => (
        <ActivityItem key={`${activity.agent}-${activity.time}-${i}`} activity={activity} />
      ))}
    </div>
  )
}
