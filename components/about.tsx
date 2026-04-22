'use client'

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { CardSpotlight } from "@/components/ui/card-spotlight"

export function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-5xl"
      >
        <TextGenerateEffect words="About Me" />
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CardSpotlight className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="pt-6 space-y-6">
              <p className="text-base leading-relaxed sm:text-lg">
                Currently working as Software Development Engineer for Ruaa Ventures Private Limited, 
                while pursuing a BE in Computer Science from RV College of Engineering and 
                a BS in Data Science from IIT Madras. Based in Bengaluru, India, with a passion 
                for building impactful software solutions that solve real-world problems.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                Experience spans full-stack development, machine learning, and data science, 
                with hands-on work using cutting-edge technologies including React Native, TensorFlow, 
                and various AI APIs to create innovative applications in healthcare, education, 
                and enterprise solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div>
                  <h3 className="mb-3 font-heading text-lg sm:text-xl">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-base font-bold sm:text-lg">RV College of Engineering, Bengaluru</p>
                      <p className="text-base text-foreground/90">BE in Computer Science and Engineering (2022-2026)</p>
                    </div>
                    <div>
                      <p className="font-medium">IIT Madras(Remote)</p>
                      <p className="text-sm text-foreground/80">BS in Data Science & Applications</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-heading text-lg sm:text-xl">Interests</h3>
                  <p className="text-foreground/90">
                    Frontend, Backend Systems, Mobile, Applied ML, Agentic AI
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardSpotlight>
      </motion.div>
    </section>
  )
}
