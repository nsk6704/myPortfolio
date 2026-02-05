'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import CountUp from 'react-countup'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionData {
  contributions: ContributionDay[]
  currentStreak: number
  totalContributions: number
  username: string
}

interface ContributionHeatmapProps {
  data: ContributionData
}

export function ContributionHeatmap({ data }: ContributionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  // Get last 12 weeks for compact display
  const recentContributions = data.contributions.slice(-84) // 12 weeks * 7 days

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-border/10',           // 0 contributions
      'bg-main/20',             // 1-2 contributions
      'bg-main/40',             // 3-4 contributions
      'bg-main/60',             // 5-6 contributions
      'bg-main',                // 7+ contributions
    ]
    return colors[level] || colors[0]
  }

  return (
    <Card className="border-2 shadow-shadow h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            GitHub Contributions
          </CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-orange-500">
              <CountUp end={data.currentStreak} duration={1.5} /> day streak
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Heatmap Grid */}
        <div className="relative">
          <div className="grid grid-cols-12 gap-1">
            {recentContributions.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-sm ${getLevelColor(day.level)} transition-all hover:ring-2 hover:ring-main hover:scale-110 cursor-pointer`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-background border-2 border-border shadow-shadow px-3 py-2 rounded-base text-sm font-medium whitespace-nowrap z-10">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}: {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-foreground/60 pt-2">
          <span>Last 12 weeks</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center pt-3 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold">
              <CountUp end={data.totalContributions} duration={1.5} />
            </div>
            <div className="text-xs text-foreground/60">Total Contributions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
