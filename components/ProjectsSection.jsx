"use client";

import {useState, useRef} from "react";
import {motion, AnimatePresence, useScroll, useTransform} from "framer-motion";
import {ExternalLink, Github} from "lucide-react";
import {usePortfolioStore} from "@/store/portfolioStore";
import {truncateText} from "@/lib/utils";

const fadeUp = {
  initial: {opacity: 0, y: 30},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, margin: "-80px"},
  transition: {duration: 0.6},
};

export default function ProjectsSection({projects = []}) {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const {openProjectModal} = usePortfolioStore();

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.project_type).filter(Boolean))),
  ];

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.project_type === active);

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden">
      <motion.div
        className="absolute -right-6 md:-right-10 top-20 text-[10rem] md:text-[20rem] font-extrabold text-foreground/[0.05] dark:text-foreground/[0.02] leading-none select-none pointer-events-none"
        style={{y: parallaxY}}
      >
        03
      </motion.div>

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <motion.div {...fadeUp}>
          <p className="section-label">// Projects</p>
          <h2 className="section-heading mb-6">Things I&apos;ve Built</h2>
          <div className="structured-line w-20 mb-12" />
        </motion.div>

        {/* Filter tabs */}
        {categories.length > 1 && (
          <motion.div
            className="flex flex-wrap gap-0 border border-border mb-12 w-fit"
            {...fadeUp}
            transition={{duration: 0.5, delay: 0.1}}
          >
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all ${
                  i < categories.length - 1 ? "border-r border-border" : ""
                } ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {filtered.length > 0 && (
            <motion.div
              key={active}
              className="grid md:grid-cols-2 gap-0 border border-border"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.3}}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{opacity: 0, y: 15}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.3, delay: i * 0.05}}
                  className={`group p-6 md:p-8 border-b border-border ${
                    i % 2 === 0 ? "md:border-r" : ""
                  } hover:bg-accent/30 transition-colors cursor-pointer`}
                  onClick={() => openProjectModal(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-xs text-primary/70 dark:text-primary/50 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                      {project.codelink && (
                        <a
                          href={project.codelink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Source code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.sitelink && (
                        <a
                          href={project.sitelink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Live site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {project.img?.[0] && (
                    <div className="relative aspect-video overflow-hidden mb-4 border border-border/40">
                      <img
                        src={project.img[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h3 className="font-pixel text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {truncateText(project.desc, 120)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[10px] font-mono font-medium border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="px-2 py-1 text-[10px] font-mono font-medium border border-border text-muted-foreground">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex justify-center mt-12"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.3}}
        >
          <a
            href="https://github.com/MdSalman2022"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 border border-border text-muted-foreground font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
          >
            <Github className="h-4 w-4" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
