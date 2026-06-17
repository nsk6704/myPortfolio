"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GridBackground } from "@/components/ui/grid-background";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const contentParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      if (imageParallaxRef.current) {
        gsap.to(imageParallaxRef.current, {
          y: -450,
          scale: 0.5,
          opacity: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
      if (contentParallaxRef.current) {
        gsap.to(contentParallaxRef.current, {
          y: -180,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <GridBackground>
      <section
        ref={sectionRef}
        className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center py-16 text-center sm:min-h-[calc(100vh-4rem)] sm:py-20"
      >
        <motion.div
          className="container mx-auto px-4 flex flex-col items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div ref={imageParallaxRef}>
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-main bg-background p-1 shadow-shadow sm:h-32 sm:w-32 md:h-40 md:w-40">
                <Image
                  src="/profile.jpg"
                  alt="Saketh Kashyap Nagendra"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          <div ref={contentParallaxRef}>
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-block rounded-base border-2 border-border bg-main px-3 py-1.5 font-heading text-xs font-bold text-main-foreground shadow-shadow sm:mb-8 sm:px-4 sm:text-sm"
            >
              Open to SWE Roles · Bengaluru
            </motion.div>
            <h1 className="mb-5 text-3xl font-black leading-tight sm:mb-6 sm:text-5xl md:text-7xl md:leading-none lg:text-8xl">
              Saketh Kashyap Nagendra
            </h1>
            <div className="mb-7 h-16 text-base font-bold text-main sm:mb-8 sm:h-10 sm:text-2xl md:text-3xl lg:text-4xl">
              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  2000,
                  "Machine Learning Engineer",
                  2000,
                  "Learning by building",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </div>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mb-8 max-w-2xl text-base font-medium sm:text-lg md:text-xl"
            >
              Based in Hyderabad, India
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:gap-4"
            >
              <Link href="#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full rounded-base text-base sm:w-auto"
                >
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="neutral"
                  size="lg"
                  className="w-full rounded-base text-base sm:w-auto"
                >
                  Resume <Download className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex justify-center space-x-5 sm:mt-12 sm:space-x-6"
            >
              <Link
                href="https://github.com/nsk6704"
                target="_blank"
                className="hover:text-main transition-colors"
              >
                <Github className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/saketh-kashyap-nagendra"
                target="_blank"
                className="hover:text-main transition-colors"
              >
                <Linkedin className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:sakethkashyap.nagendra@gmail.com"
                className="hover:text-main transition-colors"
              >
                <Mail className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </GridBackground>
  );
}
