'use client'

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export function About() {
  return (
    <section id="about" className="container py-24 sm:py-32 mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-3xl font-bold md:text-5xl text-center"
      >
        About Me
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="max-w-4xl mx-auto border-2 shadow-shadow">
        <CardContent className="pt-6 space-y-6">
          <p className="text-lg leading-relaxed">
            I'm a Software Engineering Intern at Boeing, where I work on Next.js applications 
            for International Space Station (ISS) operations, and a Data Science student at IIT Madras. 
            Based in Bengaluru, India, I'm passionate about building impactful software solutions 
            that solve real-world problems.
          </p>
          <p className="text-lg leading-relaxed">
            My experience spans full-stack development, machine learning, and data science. 
            I've worked with cutting-edge technologies including React Native, TensorFlow, 
            and various AI APIs to create innovative applications in healthcare, education, 
            and enterprise solutions. I enjoy the challenge of optimizing performance and 
            creating intuitive user experiences.
          </p>
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div>
              <h3 className="font-heading text-xl mb-3">Education</h3>
              <div className="space-y-2">
                <p className="font-medium">IIT Madras</p>
                <p className="text-sm text-foreground/80">BS in Data Science & Applications</p>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl mb-3">Interests</h3>
              <p className="text-foreground/90">
                Full-stack Development, Machine Learning, Algorithm Visualization, 
                AI Integration, Open Source Contribution
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </section>
  )
}
