'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

export function Hero() {
    return (
        <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
            <motion.div 
                className="container mx-auto px-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <motion.div 
                    variants={fadeInUp}
                    className="mb-8 inline-block rounded-base border-2 border-border bg-main px-4 py-1.5 font-heading text-sm font-bold text-main-foreground shadow-shadow"
                >
                    Available for Opportunities
                </motion.div>
                <motion.h1 
                    variants={fadeInUp}
                    className="mb-6 text-5xl font-black leading-none md:text-7xl lg:text-8xl"
                >
                    Saketh Kashyap <br className="hidden md:block" /> Nagendra
                </motion.h1>
                <motion.p 
                    variants={fadeInUp}
                    className="mx-auto mb-8 max-w-2xl text-lg font-medium md:text-xl"
                >
                    Software Engineering Intern at Boeing | Data Science Student at IIT Madras
                    <br />
                    Based in Bengaluru, India
                </motion.p>

                <motion.div 
                    variants={fadeInUp}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Link href="#projects">
                        <Button size="lg" className="rounded-base text-base">
                            View Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/resume.pdf" target="_blank">
                        <Button variant="neutral" size="lg" className="rounded-base text-base">
                            Resume <Download className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    className="mt-12 flex justify-center space-x-6"
                >
                    <Link href="https://github.com/nsk6704" target="_blank" className="hover:text-main transition-colors">
                        <Github className="h-8 w-8" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://www.linkedin.com/in/saketh-kashyap-nagendra" target="_blank" className="hover:text-main transition-colors">
                        <Linkedin className="h-8 w-8" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:sakethkashyap.nagendra@gmail.com" className="hover:text-main transition-colors">
                        <Mail className="h-8 w-8" />
                        <span className="sr-only">Email</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    )
}
