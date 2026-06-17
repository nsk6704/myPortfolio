'use client'

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

gsap.registerPlugin(ScrollTrigger)

export function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const skillCardRefs = useRef<(HTMLDivElement | null)[]>([])
    const certCardRef = useRef<HTMLDivElement>(null)

    const skills = [
        {
            category: "Programming Languages",
            items: ["Python","JavaScript","SQL", "C", "Java", "TypeScript"],
        },
        {
            category: "Frameworks & Libraries",
            items: ["React", "Next.js", "React Native","Django", "PyTorch", "FastAPI"],
        },
        {
            category: "Tools & Technologies",
            items: ["Git", "Vim", "Docker", "Neon", "PostgreSQL", "GitHub", "Vercel"],
        },
    ]

    const certifications = [
        "Responsive Web Design by freeCodeCamp",
        "Introduction to React Native by Frontend Masters",
        "Gemini API by Google",
        "AI Fundamentals by DataCamp",
        "Introducing Generative AI with AWS",
        "Postman API Fundamentals by Postman",
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh()

            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                )
            }

            skillCardRefs.current.forEach((card) => {
                if (!card) return
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 80,
                        rotateX: 12,
                        transformPerspective: 1000,
                        transformOrigin: "top center",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                )
            })

            if (certCardRef.current) {
                gsap.fromTo(certCardRef.current,
                    {
                        opacity: 0,
                        y: 80,
                        rotateX: 12,
                        transformPerspective: 1000,
                        transformOrigin: "top center",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: certCardRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                )
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <section id="skills" ref={sectionRef} className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
            <h2
                ref={titleRef}
                className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-5xl"
            >
                <TextGenerateEffect words="Skills & Certifications" />
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    <h3 className="font-heading text-xl font-bold sm:text-2xl">Technical Skills</h3>
                    <div className="grid gap-6">
                        {skills.map((skillGroup, index) => (
                            <div
                                key={index}
                                ref={(el) => { skillCardRefs.current[index] = el }}
                                className="[transform-style:preserve-3d]"
                            >
                                <Card className="shadow-shadow border-2">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map((skill) => (
                                                <Badge key={skill} variant="neutral" className="text-sm py-1 px-3 border-2 border-border">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="font-heading text-xl font-bold sm:text-2xl">Certifications</h3>
                    <div
                        ref={certCardRef}
                        className="[transform-style:preserve-3d]"
                    >
                        <Card className="shadow-shadow border-2 h-full">
                            <CardContent className="pt-6">
                                <ul className="space-y-4">
                                    {certifications.map((cert, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-main shrink-0" />
                                            <span className="text-base font-medium">{cert}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
