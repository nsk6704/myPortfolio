'use client'

import useSWR from 'swr'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { ContributionHeatmap } from './contribution-heatmap'
import { NeuralGraph } from './neural-graph'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function DeveloperStats() {
  const { data: contributions, isLoading: contributionsLoading, error: contributionsError } =
    useSWR('/api/contributions', fetcher)

  if (contributionsLoading) {
    return (
      <section className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
        <h2 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-5xl">
          Developer Metrics
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-6">
          <Skeleton className="h-[350px] border-2" />
          <Skeleton className="h-[350px] border-2" />
        </div>
      </section>
    )
  }

  // Show section even if APIs fail, but with fallback
  const showContributions = contributions?.contributions && Array.isArray(contributions.contributions) && !contributionsError

  return (
    <section className="container mx-auto overflow-x-hidden px-4 py-16 sm:py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-5xl"
      >
        <TextGenerateEffect words="Developer Metrics" />
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mx-auto max-w-7xl space-y-6"
      >
        {/* Top Row: GitHub Contributions + Neural Graph */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeInUp} className="min-w-0">
            {showContributions ? (
              <ContributionHeatmap data={contributions} />
            ) : (
              <div className="border-2 border-border shadow-shadow rounded-base p-6 text-center text-foreground/60">
                Contribution data unavailable
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="min-w-0">
            <NeuralGraph />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
