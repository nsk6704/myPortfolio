import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function Experience() {
    const experiences = [
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
                "Contributed to the development of the company’s mobile application, Kanoon, using React Native with a focus on frontend features.",
                "Implemented new UI components and refined existing screens based on feedback from designers and early users.",
                "Worked on improving usability, consistency, and overall user experience across the app.",
                "Participated in regular team meetings and sprint planning to track progress and align with product goals.",
            ],
        },
    ]

    return (
        <section id="experience" className="container py-24 sm:py-32 mx-auto px-4">
            <h2 className="mb-12 text-3xl font-bold md:text-5xl text-center">Experience</h2>
            <div className="mx-auto grid max-w-4xl gap-8">
                {experiences.map((exp, index) => (
                    <Card key={index} className="border-2 shadow-shadow">
                        <CardHeader>
                            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                <div>
                                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                                    <CardDescription className="text-base font-medium text-foreground">
                                        {exp.company}
                                    </CardDescription>
                                </div>
                                <div className="text-right text-sm text-foreground/80 md:text-left">
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
                ))}
            </div>
        </section>
    )
}
