'use client'

import { useRef, useEffect, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const lineGlowRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const dotRefs = useRef<(HTMLDivElement | null)[]>([])

    const experiences = [
        {
            company: "str8bat Sport Tech Solutions",
            role: "Data Science Intern",
            period: "Jan 2026 – Feb 2026 (1 month)",
            location: "Bengaluru, India",
            description: [
                "Refined and preprocessing complex datasets with manual, noisy labels, ensuring high-quality input for model training.",
                "Improved an existing XGBoost model through extensive feature pruning and hyperparameter tuning, achieving significant performance gains.",
                "Investigated and implemented diverse strategies to solve specific product-related challenges, focusing on model accuracy and robustness.",
            ],
        },
        {
            company: "Boeing",
            role: "Software Engineering Intern",
            period: "May 2025 – July 2025",
            location: "Bengaluru, India",
            description: [
                "Worked on the frontend of a Next.js web application used to monitor parts inventory and logistics related to International Space Station (ISS) operations.",
                "Improved page load times and overall responsiveness by optimizing frontend logic and reducing unnecessary data fetches.",
                "Collaborated with backend engineers to integrate REST APIs and ensure accurate data display on the UI.",
                "Redesigned existing screens to be more intuitive and user-friendly while actively participating in sprint discussions and reviews.",
            ],
        },
        {
            company: "Ruaa Ventures Private Limited",
            role: "SDE Intern",
            period: "Jan 2025 – May 2025",
            location: "Remote",
            description: [
                "Contributed to the development of the company's mobile application, Kanoon, using React Native with a focus on frontend features.",
                "Implemented new UI components and refined existing screens based on feedback from designers and early users.",
                "Worked on improving usability, consistency, and overall user experience across the app.",
                "Participated in regular team meetings and sprint planning to track progress and align with product goals.",
            ],
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh()

            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, y: 50, scale: 0.95 },
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

            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleY: 0, opacity: 0 },
                    {
                        scaleY: 1, opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            end: "bottom 30%",
                            scrub: 1,
                        },
                    }
                )
            }

            if (lineGlowRef.current) {
                gsap.fromTo(lineGlowRef.current,
                    { scaleY: 0, opacity: 0 },
                    {
                        scaleY: 1, opacity: 0.5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            end: "bottom 30%",
                            scrub: 1,
                        },
                    }
                )
            }

            cardRefs.current.forEach((card, i) => {
                if (!card) return
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 120,
                        rotateX: 18,
                        transformPerspective: 1200,
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

            dotRefs.current.forEach((dot, i) => {
                if (!dot || !cardRefs.current[i]) return
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        duration: 0.4,
                        ease: "back.out(2.5)",
                        scrollTrigger: {
                            trigger: cardRefs.current[i],
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                )
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" ref={sectionRef} className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
            <h2
                ref={titleRef}
                className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl md:mb-12 md:text-5xl"
            >
                Experience
            </h2>

            <div className="relative mx-auto max-w-4xl" style={{ perspective: "1200px" }}>
                <div
                    ref={lineGlowRef}
                    className="absolute left-[15px] top-0 w-1 bg-main/30 rounded-full origin-top blur-sm md:left-[23px]"
                />
                <div
                    ref={lineRef}
                    className="absolute left-4 top-0 w-0.5 bg-main origin-top md:left-6"
                />

                <div className="space-y-8 pl-10 md:pl-14">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative">
                            <div
                                ref={(el) => { dotRefs.current[index] = el }}
                                className="absolute -left-[22px] top-6 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-main bg-background shadow-[0_0_10px] shadow-main/40 md:-left-[29px]"
                            />
                            <div
                                ref={(el) => { cardRefs.current[index] = el }}
                                className="[transform-style:preserve-3d]"
                            >
                                <Card className="border-2 shadow-shadow hover:shadow-[8px_8px_0px_0px_var(--border)] transition-shadow">
                                    <CardHeader>
                                        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                            <div>
                                                <CardTitle className="text-lg sm:text-xl">{exp.role}</CardTitle>
                                                <CardDescription className="text-base font-medium text-foreground">
                                                    {exp.company}
                                                </CardDescription>
                                            </div>
                                            <div className="text-left text-sm text-foreground/80 md:text-right">
                                                <p>{exp.period}</p>
                                                <p>{exp.location}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                                            {exp.description.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
