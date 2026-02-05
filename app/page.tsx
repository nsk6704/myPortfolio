import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { GitHubStats } from "@/components/github-stats";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <GitHubStats />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}