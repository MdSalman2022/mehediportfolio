"use client";

import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import {MapPin, ExternalLink} from "lucide-react";

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Gruham.ai",
    companyUrl: "#",
    location: "Remote (Hyderabad, India)",
    period: "May 2023 — Present",
    number: "01",
    responsibilities: [
      "Built real-time communication features (chat, reels, live streaming) to enhance user engagement and facilitate seamless interaction between homeowners and designers.",
      "Engineered frontend optimizations, reducing initial load times by 75% and significantly improving the user experience.",
      "Developed and maintained backend services using Express.js, MongoDB, and Supabase, ensuring efficient data flow and reliable system performance, and CI/CD automation with GitHub Actions.",
      "Implemented scalable architecture with reverse proxy routing and optimized data fetching using RTK Query and the Context API, enhancing app performance and routing efficiency.",
    ],
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Supabase",
      "RTK Query",
      "GitHub Actions",
      "Socket.io",
    ],
  },
];

const fadeUp = {
  initial: {opacity: 0, y: 30},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, margin: "-80px"},
  transition: {duration: 0.6},
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      {/* Parallax decorative number */}
      <motion.div
        className="absolute -left-6 md:-left-10 top-40 text-[10rem] md:text-[20rem] font-extrabold text-foreground/[0.05] dark:text-foreground/[0.02] leading-none select-none pointer-events-none"
        style={{y: parallaxY}}
      >
        02
      </motion.div>

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <motion.div {...fadeUp}>
          <p className="section-label">{"// Experience"}</p>
          <h2 className="section-heading mb-6">Where I&apos;ve Worked</h2>
          <div className="structured-line w-20 mb-16" />
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="group border-t border-border py-10 md:py-14"
              {...fadeUp}
              transition={{duration: 0.6, delay: i * 0.15}}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                {/* Number + period */}
                <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-2">
                  <span className="font-pixel text-5xl font-extrabold text-primary/30 dark:text-primary/20 group-hover:text-primary/60 dark:group-hover:text-primary/40 transition-colors">
                    {exp.number}
                  </span>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {exp.period}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-9">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {exp.role}
                  </h3>
                  <a
                    href={exp.companyUrl}
                    className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline mb-6"
                  >
                    {exp.company}
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <ul className="space-y-4 mb-8">
                    {exp.responsibilities.map((item, j) => (
                      <li
                        key={j}
                        className="text-[15px] text-foreground/90 dark:text-muted-foreground leading-relaxed flex gap-4"
                      >
                        <span className="text-primary mt-1.5 shrink-0 font-mono text-[10px] font-bold">
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[11px] font-mono font-bold border border-primary/20 bg-primary/5 text-foreground transition-all duration-300 hover:border-primary hover:text-primary-foreground hover:bg-primary shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
