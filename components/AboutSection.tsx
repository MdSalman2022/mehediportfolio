"use client";

import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import {Globe, Server, Database, Cloud} from "lucide-react";
import {PROFILE_IMAGE_URL} from "@/lib/constants";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Globe,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "Zustand",
      "Framer Motion",
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "RESTful APIs",
      "Socket.io",
      "Passport.js",
      "OAuth 2.0",
    ],
  },
  {
    title: "Database & Storage",
    icon: Database,
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
      "Redis",
      "AWS S3",
      "Supabase",
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      "AWS Services",
      "Azure",
      "AWS Lambda",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Git",
      "Vercel",
    ],
  },
];

const stats = [
  {value: "02+", label: "Years of Experience"},
  {value: "15+", label: "Projects Delivered"},
  {value: "25+", label: "Technologies Used"},
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    period: "2021 — 2025",
  },
];

const fadeUp = {
  initial: {opacity: 0, y: 30},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, margin: "-80px"},
  transition: {duration: 0.6},
};

export default function AboutSection() {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      {/* Parallax decorative number */}
      <motion.div
        className="absolute -right-6 md:-right-10 top-20 text-[10rem] md:text-[20rem] font-extrabold text-foreground/[0.05] dark:text-foreground/[0.02] leading-none select-none pointer-events-none"
        style={{y: parallaxY}}
      >
        01
      </motion.div>

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <motion.div {...fadeUp}>
          <p className="section-label">{"// About"}</p>
          <h2 className="section-heading mb-6">About Me</h2>
          <div className="structured-line w-20 mb-12" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Bio + Stats */}
          <motion.div {...fadeUp} transition={{duration: 0.6, delay: 0.1}}>
            <div className="relative w-40 md:w-48 mb-8">
              <div className="absolute inset-0 translate-x-2 translate-y-2 border border-primary/40 pointer-events-none" />
              <img
                src={PROFILE_IMAGE_URL}
                alt="Mehedi Hasan Salman"
                className="relative w-full aspect-square object-cover border border-border grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed text-[15px] text-base mb-6">
              I&apos;m a Full Stack Developer from{" "}
              <span className="text-foreground font-semibold">
                Dhaka, Bangladesh
              </span>{" "}
              with 2+ years of experience building web applications that scale.
              I work at the intersection of design and engineering — turning
              complex problems into clean, intuitive solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed text-[15px] text-base mb-10">
              My focus areas include{" "}
              <span className="text-primary font-semibold">
                React ecosystems
              </span>
              , cloud infrastructure on{" "}
              <span className="text-primary font-semibold">
                AWS &amp; Azure
              </span>
              , and building developer tools. I&apos;m passionate about
              open-source, clean architecture, and shipping products that make
              an impact.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 border border-border mb-12">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-6 text-center ${
                    i < 2 ? "border-r border-border" : ""
                  }`}
                >
                  <p className="font-pixel text-3xl font-extrabold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider leading-tight text-[10px] font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase">
                  {"// Education"}
                </p>
                <div className="h-px bg-border flex-1" />
              </div>
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l border-primary/30"
                >
                  <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-primary" />
                  <h4 className="text-foreground font-bold text-lg mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-primary font-medium text-sm mb-1">
                    {edu.institution}
                  </p>
                  <div className="flex justify-between items-center text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                    <span>{edu.location}</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Skill cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.title}
                className="relative group overflow-hidden border border-border bg-card/10 p-6 transition-all duration-300 hover:border-primary/50"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: i * 0.1}}
              >
                {/* Hover glow effect */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-primary/10 text-primary border border-primary/20">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-pixel text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-[11px] font-mono font-bold border border-primary/20 bg-primary/5 text-foreground transition-all duration-300 hover:border-primary hover:text-primary-foreground hover:bg-primary group-hover:border-primary/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
