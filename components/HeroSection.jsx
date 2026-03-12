"use client";

import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import {smoothScrollTo} from "@/lib/utils";

const socialLinks = [
  {icon: Github, href: "https://github.com/MdSalman2022", label: "GitHub"},
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mehedihasan-salman/",
    label: "LinkedIn",
  },
  {icon: Mail, href: "mailto:mehedi.salman102@gmail.com", label: "Email"},
];

export default function HeroSection() {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Marquee — large pixel text at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        style={{y: y2}}
      >
        <div className="marquee-text animate-marquee">
          REACT · NEXT.JS · NODE.JS · MONGODB · AWS · AZURE · DEVOPS · FULL
          STACK ·&nbsp;
        </div>
      </motion.div>

      <motion.div
        className="container max-w-6xl mx-auto px-4 md:px-6 py-20 relative z-10"
        style={{y: y1, opacity}}
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            {/* Label */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.5}}
            >
              <div className="w-12 h-px bg-primary" />
              <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">
                Full Stack Developer
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight mb-8 font-pixel"
              initial={{opacity: 0, y: 40}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.1}}
            >
              <span className="text-foreground">Mehedi</span>
              <br />
              <span className="text-foreground">Hasan</span>
              <br />
              <span className="text-primary">Salman</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8 leading-relaxed"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.3}}
            >
              I build scalable web applications and cloud solutions. Focused on
              clean architecture, performance, and shipping products that
              matter.
            </motion.p>

            {/* Highlights */}
            <motion.div
              className="mb-10 border-l-2 border-primary/30 pl-6 space-y-3"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.5}}
            >
              {[
                "Full-stack systems with React, Next.js, Node.js",
                "Scalable backends with MongoDB, Postgres & Supabase",
                "CI/CD, Cloud Infra (AWS/Azure) & System Observability",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                  initial={{opacity: 0, x: -15}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: 0.6 + i * 0.1}}
                >
                  <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                  <span className="font-mono text-xs">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.8}}
            >
              <button
                onClick={() => smoothScrollTo("projects")}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors cursor-pointer"
              >
                View Work
              </button>
              <button
                onClick={() => smoothScrollTo("contact")}
                className="flex items-center gap-2 px-8 py-3 border border-border text-foreground font-semibold tracking-wide uppercase text-sm hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                Contact
              </button>
              <a
                href="/Mehedi-Hasan-Salman-Full-stack-web-developer.pdf"
                download
                className="flex items-center gap-2 px-8 py-3 border border-border text-foreground font-semibold tracking-wide uppercase text-sm hover:border-primary hover:text-primary transition-colors"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>
          </div>

          {/* Right side - social + info */}
          <motion.div
            className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1}}
          >
            <div className="flex lg:flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="p-3 border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="hidden lg:block text-right space-y-1">
              <p className="font-mono text-xs text-muted-foreground">
                Based in
              </p>
              <p className="text-sm font-semibold text-foreground">
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary">
                Available for work
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.2}}
        >
          <button
            onClick={() => smoothScrollTo("about")}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <motion.div
              animate={{y: [0, 8, 0]}}
              transition={{repeat: Infinity, duration: 2, ease: "easeInOut"}}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
