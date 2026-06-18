import { Metadata } from "next";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { DeveloperStats } from "@/components/developer-stats";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  alternates: {
    languages: {
      en: "https://sakethkashyap.dev",
    },
  },
};

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Saketh Kashyap Nagendra - Software Development Engineer | Full-Stack & AI Developer</h1>
      <div className="sr-only">
        <p>Saketh Kashyap Nagendra is joining HSBC as a Software Engineer. Recently completed a BE in Computer Science from RV College of Engineering. Passionate about building software that makes a difference.</p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Saketh Kashyap Nagendra",
            url: "https://sakethkashyap.dev",
            jobTitle: "Software Development Engineer",
            worksFor: {
              "@type": "Organization",
              name: "Ruaa Ventures Private Limited",
            },
            alumniOf: [
              {
                "@type": "EducationalOccupationalCredential",
                name: "BE in Computer Science and Engineering",
                credentialCategory: "Bachelor's Degree",
              },
              {
                "@type": "EducationalOccupationalCredential",
                name: "BS in Data Science & Applications",
                credentialCategory: "Bachelor's Degree",
              },
            ],
            knowsAbout: [
              "React",
              "Next.js",
              "React Native",
              "TypeScript",
              "Python",
              "PyTorch",
              "Django",
              "FastAPI",
              "Full Stack Development",
              "Machine Learning",
              "Data Science",
            ],
            sameAs: [
              "https://github.com/nsk6704",
              "https://www.linkedin.com/in/saketh-kashyap-nagendra",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              addressCountry: "IN",
            },
          }),
        }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <DeveloperStats />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}