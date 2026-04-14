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
      <h1 className="sr-only">Saketh Kashyap Nagendra - Software Development Engineer for Ruaa Ventures, BE CS at RV College of Engineering, BS Data Science at IIT Madras</h1>
      <div className="sr-only">
        <p>Saketh Kashyap Nagendra is a Software Development Engineer at Ruaa Ventures Private Limited. Based in Bengaluru, Saketh Kashyap Nagendra is pursuing a BE in Computer Science at RV College of Engineering and a BS in Data Science at IIT Madras.</p>
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
              "TensorFlow",
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