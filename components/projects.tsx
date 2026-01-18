import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

export function Projects() {
    const projects = [
        {
            title: "AgriGuard",
            tech: ["Flask", "TensorFlow", "LLaMA 3", "Groq API"],
            description: "Designed a web application to detect diseases in crops like tomato and bell pepper using a TensorFlow CNN model trained on 37 disease classes. Developed a custom RAG chatbot using LLaMA 3 and Groq API to deliver real-time, contextual disease insights to users. Built a modular Flask backend handling image preprocessing, model inference, and chatbot responses.",
            links: {
                github: "#",
                demo: "#",
            },
        },
        {
            title: "AlgoViz",
            tech: ["Next.js", "FastAPI", "LLaMA 3", "Groq API", "Tailwind"],
            description: "Developed a full-stack platform with 15+ visualized algorithms across sorting, graphs, AI/ML, and theory of computation using Canvas animations. Built responsive UI with step controls and zoom/pan support using Next.js, Tailwind, and shadcn/ui. Connected FastAPI backend to LLaMA 3 via Groq API for chatbot, quiz, and learning path generation with <1s latency.",
            links: {
                github: "#",
                demo: "#",
            },
        },
    ]

    return (
        <section id="projects" className="container py-24 sm:py-32 mx-auto px-4 bg-secondary-background">
            <h2 className="mb-12 text-3xl font-bold md:text-5xl text-center">Projects</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                {projects.map((project, index) => (
                    <Card key={index} className="flex flex-col border-2 shadow-shadow bg-background">
                        <CardHeader>
                            <CardTitle className="text-2xl">{project.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tech.map((t) => (
                                    <Badge key={t} variant="neutral" className="border-2 border-border font-base">
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-foreground/90">{project.description}</p>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                            <Link href={project.links.github} target="_blank">
                                <Button size="sm" variant="neutral" className="w-full">
                                    <Github className="mr-2 h-4 w-4" /> Code
                                </Button>
                            </Link>
                            <Link href={project.links.demo} target="_blank">
                                <Button size="sm" className="w-full">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}
