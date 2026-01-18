import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
            <div className="container mx-auto px-4">
                <div className="mb-8 inline-block rounded-base border-2 border-border bg-main px-4 py-1.5 font-heading text-sm font-bold text-main-foreground shadow-shadow">
                    Available for Opportunities
                </div>
                <h1 className="mb-6 text-5xl font-black leading-none md:text-7xl lg:text-8xl">
                    Saketh Kashyap <br className="hidden md:block" /> Nagendra
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-lg font-medium md:text-xl">
                    Software Engineering Intern at Boeing | Data Science Student at IIT Madras
                    <br />
                    Based in Bengaluru, India
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
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
                </div>

                <div className="mt-12 flex justify-center space-x-6">
                    <Link href="https://github.com" target="_blank" className="hover:text-main transition-colors">
                        <Github className="h-8 w-8" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="hover:text-main transition-colors">
                        <Linkedin className="h-8 w-8" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:sakethkashyap.nagendra@gmail.com" className="hover:text-main transition-colors">
                        <Mail className="h-8 w-8" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
