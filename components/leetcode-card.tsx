'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CountUp from 'react-countup'
import { Code2 } from 'lucide-react'
import type { LeetCodeStats } from '@/types/leetcode'

interface LeetCodeCardProps {
  stats: LeetCodeStats
}

export function LeetCodeCard({ stats }: LeetCodeCardProps) {
  // Get top skills from submission calendar or use default
  const topSkills = [
    { name: 'Array', count: 47 },
    { name: 'Hash Table', count: 13 },
    { name: 'Dynamic Programming', count: 9 },
  ]

  return (
    <Card className="border-2 shadow-shadow h-full overflow-hidden">
      <CardHeader className="border-b-2 border-border">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Code2 className="h-5 w-5 text-main" />
          LeetCode Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 text-sm">
        <div className="space-y-3">
          {/* Total Solved */}
          <div className="flex justify-between items-center pb-2 border-b border-border/30">
            <span className="text-foreground/70">Total Solved</span>
            <span className="text-xl font-bold text-main">
              <CountUp end={stats.totalSolved} duration={1.5} />
            </span>
          </div>

          {/* Difficulty Breakdown */}
          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="text-center">
              <div className="text-lg font-bold text-green-500">
                <CountUp end={stats.easySolved} duration={1.5} />
              </div>
              <div className="text-xs text-foreground/60">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-500">
                <CountUp end={stats.mediumSolved} duration={1.5} />
              </div>
              <div className="text-xs text-foreground/60">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-500">
                <CountUp end={stats.hardSolved} duration={1.5} />
              </div>
              <div className="text-xs text-foreground/60">Hard</div>
            </div>
          </div>

          {/* Acceptance Rate */}
          <div className="flex justify-between items-center pt-2 border-t border-border/30">
            <span className="text-foreground/70">Acceptance</span>
            <span className="font-bold">
              <CountUp end={stats.acceptanceRate} decimals={2} duration={1.5} suffix="%" />
            </span>
          </div>

          {/* Top Skills */}
          <div className="pt-3 border-t border-border/30">
            <div className="text-foreground/70 text-xs mb-2">Top Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="neutral"
                  className="text-xs py-0.5 px-2 border border-main/30 bg-main/5"
                >
                  {skill.name}×{skill.count}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
