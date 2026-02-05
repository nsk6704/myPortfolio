'use client'

import useSWR from 'swr'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { GridBackground } from "@/components/ui/grid-background"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import type { GitHubRepo } from '@/types/github'
import { PROJECT_DESCRIPTIONS, CUSTOM_PROJECTS, PROJECT_METRICS } from '@/lib/constants'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Project {
  title: string
  description: string
  tech: string[]
  links: {
    github: string | null
    demo: string | null
  }
  metric?: string
}

export function Projects() {
  const { data: repos, isLoading, error } = useSWR<GitHubRepo[]>('/api/github/repos', fetcher)

  const getFeaturedProjects = (): Project[] => {
    const projects: Project[] = []

    // Add GitHub projects
    if (repos) {
      const credify = repos.find((r) => r.name === 'Credify')
      const interview = repos.find((r) => r.name === 'InterviewAssistant')
      const algoviz = repos.find((r) => r.name === 'Algoviz')

      if (credify) {
        projects.push({
          title: 'Credify',
          description: PROJECT_DESCRIPTIONS.Credify,
          tech: ['TypeScript', 'Expo', 'React Native', 'SQLite'],
          links: {
            github: credify.html_url,
            demo: 'https://credify-website-sandy.vercel.app/'
          },
          metric: PROJECT_METRICS.Credify
        })
      }

      if (interview) {
        projects.push({
          title: 'InterviewAssistant',
          description: PROJECT_DESCRIPTIONS.InterviewAssistant,
          tech: ['TypeScript', 'Python', 'FastAPI', 'AI'],
          links: {
            github: interview.html_url,
            demo: interview.homepage
          },
          metric: PROJECT_METRICS.InterviewAssistant
        })
      }

      if (algoviz) {
        projects.push({
          title: 'AlgoViz',
          description: PROJECT_DESCRIPTIONS.Algoviz,
          tech: ['Next.js', 'FastAPI', 'LLaMA 3', 'Tailwind'],
          links: {
            github: algoviz.html_url,
            demo: algoviz.homepage || 'https://algoviz-iota.vercel.app'
          },
          metric: PROJECT_METRICS.Algoviz
        })
      }
    }

    // Add custom project (AgriGuard)
    projects.push({
      ...CUSTOM_PROJECTS.AgriGuard,
      metric: PROJECT_METRICS.AgriGuard
    })

    return projects
  }

  if (isLoading) {
    return (
      <GridBackground>
        <section id="projects" className="container py-24 sm:py-32 mx-auto px-4 bg-secondary-background">
          <h2 className="mb-12 text-3xl font-bold md:text-5xl text-center">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-[350px] border-2" />
            ))}
          </div>
        </section>
      </GridBackground>
    )
  }

  if (error) {
    // If API fails, show fallback projects
    console.error('Failed to load projects from GitHub:', error)
  }

  const projects = getFeaturedProjects()

  return (
    <GridBackground>
      <section id="projects" className="container py-24 sm:py-32 mx-auto px-4 bg-secondary-background">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-3xl font-bold md:text-5xl text-center"
        >
          <TextGenerateEffect words="Featured Projects" />
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="flex flex-col border-2 shadow-shadow bg-background transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--border)] h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="neutral" className="border-2 border-border font-base">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  {project.metric && (
                    <div className="mt-2">
                      <Badge variant="neutral" className="border-2 border-main text-main font-medium bg-main/10">
                        {project.metric}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-foreground/90">{project.description}</p>
                </CardContent>
                <CardFooter className="flex gap-4">
                  {project.links.github && (
                    <Link href={project.links.github} target="_blank" className="flex-1">
                      <Button size="sm" variant="neutral" className="w-full">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Button>
                    </Link>
                  )}
                  {project.links.demo && (
                    <Link href={project.links.demo} target="_blank" className="flex-1">
                      <Button size="sm" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {project.title === 'Credify' ? 'Landing Page' : 'Live Demo'}
                      </Button>
                    </Link>
                  )}
                  {!project.links.github && !project.links.demo && (
                    <div className="flex-1 text-center text-sm text-foreground/60">
                      Links coming soon
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </GridBackground>
  )
}
