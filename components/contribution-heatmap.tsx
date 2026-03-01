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

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Show Mon, Wed, Fri labels only (indices 1, 3, 5)
const DAY_LABELS: Record<number, string> = { 1: 'Mon', 3: 'Wed', 5: 'Fri' }

export function ContributionHeatmap({ data }: ContributionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Show last 12 weeks
  const WEEKS = 12
  const recent = data.contributions.slice(-(WEEKS * 7))

  // Dynamic color scaling: relative to the max count in the shown period
  const maxCount = Math.max(...recent.map(d => d.count), 1)

  const getDynamicLevel = (count: number): number => {
    if (count === 0) return 0
    const ratio = count / maxCount
    if (ratio <= 0.25) return 1
    if (ratio <= 0.5) return 2
    if (ratio <= 0.75) return 3
    return 4
  }

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-border/15',  // 0 – no contributions
      'bg-main/20',    // 1 – low
      'bg-main/40',    // 2 – low-mid
      'bg-main/65',    // 3 – mid-high
      'bg-main',       // 4 – max
    ]
    return colors[level] ?? colors[0]
  }

  // Build week grid: columns = weeks, rows = day of week (0 Sun … 6 Sat)
  const buildWeekGrid = (): (ContributionDay | null)[][] => {
    if (recent.length === 0) return []

    // Use noon UTC to avoid timezone day-shift
    const firstDow = new Date(recent[0].date + 'T12:00:00').getDay()

    // Pad start so index 0 in each column = Sunday
    const padded: (ContributionDay | null)[] = [
      ...Array(firstDow).fill(null),
      ...recent,
    ]
    // Pad end to complete the last week
    while (padded.length % 7 !== 0) padded.push(null)

    const weeks: (ContributionDay | null)[][] = []
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7))
    }
    return weeks
  }

  const weeks = buildWeekGrid()

  // Month labels: place at the first column where a new month appears
  const monthLabels: Map<number, string> = new Map()
  let lastMonth = -1
  weeks.forEach((week, col) => {
    const firstReal = week.find(d => d !== null)
    if (firstReal) {
      const m = new Date(firstReal.date + 'T12:00:00').getMonth()
      if (m !== lastMonth) {
        monthLabels.set(col, MONTH_NAMES[m])
        lastMonth = m
      }
    }
  })

  const CELL = 22   // px
  const GAP = 4     // px
  const STEP = CELL + GAP

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
        <div className="relative flex flex-col items-center overflow-x-auto">
          {/* Month labels row */}
          <div className="flex mb-1" style={{ paddingLeft: 44 }}>
            {weeks.map((_, col) => (
              <div
                key={col}
                className="flex-none text-xs text-foreground/50 leading-none"
                style={{ width: STEP }}
              >
                {monthLabels.get(col) ?? ''}
              </div>
            ))}
          </div>

          {/* Day-of-week labels + week columns */}
          <div className="flex items-start">
            {/* Day labels (Sun–Sat) */}
            <div className="flex flex-col mr-1 shrink-0" style={{ gap: GAP }}>
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className="text-xs text-foreground/50 leading-none flex items-center justify-end pr-1"
                  style={{ height: CELL, width: 40 }}
                >
                  {DAY_LABELS[i] ?? ''}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((week, col) => (
                <div key={col} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((day, row) => (
                    <div
                      key={row}
                      className={`rounded-sm transition-all ${
                        day
                          ? `${getLevelColor(getDynamicLevel(day.count))} hover:ring-1 hover:ring-main hover:scale-110 cursor-pointer`
                          : 'bg-transparent'
                      }`}
                      style={{ width: CELL, height: CELL }}
                      onMouseEnter={(e) => {
                        if (day) {
                          setHoveredDay(day)
                          setTooltipPos({ x: e.clientX, y: e.clientY })
                        }
                      }}
                      onMouseMove={(e) => {
                        if (day) setTooltipPos({ x: e.clientX, y: e.clientY })
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <div
              className="fixed bg-background border-2 border-border shadow-shadow px-3 py-2 rounded-base text-sm font-medium whitespace-nowrap z-50 pointer-events-none"
              style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 36 }}
            >
              {new Date(hoveredDay.date + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
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
              <div key={level} className={`w-5 h-5 rounded-sm ${getLevelColor(level)}`} />
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
            <div className="text-xs text-foreground/60">Total Contributions in the past one year</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
