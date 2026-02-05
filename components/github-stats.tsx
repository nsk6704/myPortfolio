'use client'

import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { GitHubStats } from '@/types/github'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function GitHubStats() {
  const { data: stats, isLoading, error } = useSWR<GitHubStats>('/api/github/stats', fetcher)

  if (isLoading) {
    return (
      <section className="container py-24 sm:py-32 mx-auto px-4 bg-secondary-background">
        <h2 className="mb-12 text-3xl font-bold md:text-5xl text-center">
          GitHub Activity
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-32 border-2" />
          ))}
        </div>
      </section>
    )
  }

  if (error || !stats) {
    return null // Fail silently if GitHub API is down
  }

  const topLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)

  return (
    <section className="container py-24 sm:py-32 mx-auto px-4 bg-secondary-background">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-3xl font-bold md:text-5xl text-center"
      >
        GitHub Activity
      </motion.h2>
      
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
      >
        <motion.div variants={fadeInUp}>
          <Card className="border-2 shadow-shadow text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-black">{stats.totalRepos}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">Public Repositories</p>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="border-2 shadow-shadow text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-black">{stats.totalStars}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">Total Stars</p>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="border-2 shadow-shadow text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-black">{stats.totalForks}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">Total Forks</p>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="max-w-4xl mx-auto border-2 shadow-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Most Used Languages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topLanguages.map(([lang, count]) => (
              <Badge key={lang} variant="neutral" className="text-sm py-1.5 px-3 border-2">
                {lang} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </section>
  )
}
