'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from 'react-type-animation'
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { GridBackground } from "@/components/ui/grid-background"

import Image from "next/image"

export function Hero() {
    return (
        <GridBackground>
            <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
                <motion.div
                    className="container mx-auto px-4 flex flex-col items-center"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="mb-8"
                    >
                        <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-main shadow-shadow p-1 bg-background">
                            <Image
                                src="/profile.jpg"
                                alt="Saketh Kashyap Nagendra"
                                fill
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="mb-8 inline-block rounded-base border-2 border-border bg-main px-4 py-1.5 font-heading text-sm font-bold text-main-foreground shadow-shadow"
                    >
                        Open to Collaborations
                    </motion.div>
                    <h1 className="mb-6 text-5xl font-black leading-none md:text-7xl lg:text-8xl">
                        Saketh Kashyap Nagendra
                    </h1>
                    <div className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl text-main h-10">
                        <TypeAnimation
                            sequence={[
                                'Frontend Developer',
                                2000,
                                'Machine Learning Engineer',
                                2000,
                                'Learning by building things',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            cursor={true}
                        />
                    </div>

                    <motion.p
                        variants={fadeInUp}
                        className="mx-auto mb-8 max-w-2xl text-lg font-medium md:text-xl"
                    >
                        Data Science Intern at str8bat
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
        </GridBackground >
    )
}
