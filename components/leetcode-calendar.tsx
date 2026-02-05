'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code2, Calendar } from 'lucide-react'
import { useState, useMemo } from 'react'
import CountUp from 'react-countup'

interface LeetCodeCalendarProps {
  submissionCalendar: Record<string, number>
}

interface SubmissionDay {
  date: string
  count: number
  level: number
}

export function LeetCodeCalendar({ submissionCalendar }: LeetCodeCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<SubmissionDay | null>(null)
  
  // Process submission calendar data
  const processedData = useMemo(() => {
    const days: SubmissionDay[] = []
    const today = new Date()
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(today.getFullYear() - 1)
    
    // Create array of all days in the past year
    const dateMap: Record<string, number> = {}
    
    // Convert Unix timestamps to dates and count submissions
    Object.entries(submissionCalendar || {}).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000)
      const dateStr = date.toISOString().split('T')[0]
      dateMap[dateStr] = count
    })
    
    // Initialize all days in last 12 weeks
    const twelveWeeksAgo = new Date()
    twelveWeeksAgo.setDate(today.getDate() - 84) // 12 weeks * 7 days
    
    for (let d = new Date(twelveWeeksAgo); d <= today; d = new Date(d.setDate(d.getDate() + 1))) {
      const dateStr = d.toISOString().split('T')[0]
      const count = dateMap[dateStr] || 0
      days.push({
        date: dateStr,
        count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4,
      })
    }
    
    // Calculate total submissions in last year
    const totalSubmissions = Object.values(dateMap).reduce((a, b) => a + b, 0)
    
    // Calculate current streak
    let currentStreak = 0
    const sortedDates = Object.keys(dateMap)
      .filter(date => new Date(date) >= twelveWeeksAgo)
      .sort()
      .reverse()
    
    for (const date of sortedDates) {
      if (dateMap[date] > 0) {
        currentStreak++
      } else if (currentStreak > 0) {
        break
      }
    }
    
    return { days, totalSubmissions, currentStreak }
  }, [submissionCalendar])

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-border/10',           // 0 submissions
      'bg-yellow-500/20',       // 1-2 submissions
      'bg-yellow-500/40',       // 3-5 submissions
      'bg-yellow-500/60',       // 6-10 submissions
      'bg-yellow-500',          // 11+ submissions
    ]
    return colors[level] || colors[0]
  }

  return (
    <Card className="border-2 shadow-shadow h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            LeetCode Activity
          </CardTitle>
          {processedData.currentStreak > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-yellow-500" />
              <span className="font-bold text-yellow-500">
                <CountUp end={processedData.currentStreak} duration={1.5} /> day streak
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Heatmap Grid */}
        <div className="relative">
          <div className="grid grid-cols-12 gap-1">
            {processedData.days.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-sm ${getLevelColor(day.level)} transition-all hover:ring-2 hover:ring-yellow-500 hover:scale-110 cursor-pointer`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${day.date}: ${day.count} submissions`}
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
              })}: {hoveredDay.count} {hoveredDay.count === 1 ? 'submission' : 'submissions'}
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
        <div className="flex justify-around pt-3 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold">
              <CountUp end={processedData.totalSubmissions} duration={1.5} />
            </div>
            <div className="text-xs text-foreground/60">Total Submissions</div>
          </div>
          {processedData.currentStreak > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                <CountUp end={processedData.currentStreak} duration={1.5} />
              </div>
              <div className="text-xs text-foreground/60">Day Streak</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
