import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Skills() {
    const skills = [
        {
            category: "Programming Languages",
            items: ["C", "Python", "Java", "JavaScript", "SQL"],
        },
        {
            category: "Frameworks & Libraries",
            items: ["Flask", "React", "Next.js", "NumPy", "Pandas", "Tailwind CSS"],
        },
        {
            category: "Tools & Technologies",
            items: ["Git", "pgAdmin", "Firebase", "Vim", "Docker", "Postman"],
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

    return (
        <section id="skills" className="container py-24 sm:py-32 mx-auto px-4">
            <h2 className="mb-12 text-3xl font-bold md:text-5xl text-center">Skills & Certifications</h2>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold font-heading">Technical Skills</h3>
                    <div className="grid gap-6">
                        {skills.map((skillGroup, index) => (
                            <Card key={index} className="shadow-shadow border-2">
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
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-bold font-heading">Certifications</h3>
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
        </section>
    )
}
