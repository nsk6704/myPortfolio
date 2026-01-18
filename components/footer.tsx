import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer id="contact" className="border-t-2 border-border bg-main text-main-foreground">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading">Saketh Kashyap Nagendra</h3>
                        <p className="max-w-xs text-main-foreground/90">
                            Building digital experiences with code and creativity. Open for opportunities.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-bold font-heading">Contact</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="mailto:sakethkashyap.nagendra@gmail.com" className="hover:underline">
                                    sakethkashyap.nagendra@gmail.com
                                </a>
                            </li>
                            <li>
                                <p>(+91) 7093445470</p>
                            </li>
                            <li>
                                <p>Bengaluru, India</p>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-bold font-heading">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href="https://github.com" target="_blank" className="rounded-base border-2 border-border bg-white p-2 text-black hover:bg-white/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" className="rounded-base border-2 border-border bg-white p-2 text-black hover:bg-white/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="mailto:sakethkashyap.nagendra@gmail.com" className="rounded-base border-2 border-border bg-white p-2 text-black hover:bg-white/90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t-2 border-border/50 pt-8 text-center text-sm font-medium">
                    <p>&copy; {new Date().getFullYear()} Saketh Kashyap Nagendra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
