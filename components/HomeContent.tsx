"use client";

import {useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import type {Project} from "@/lib/types";

export default function HomeContent({projects}: {projects: Project[]}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("smoothscroll-polyfill")
        .then((smoothscroll) => {
          smoothscroll.polyfill();
        })
        .catch(() => {});
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
        className="min-h-screen bg-background text-foreground"
      >
        <Navbar />

        <ScrollProgress />

        <div className="relative">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
          >
            <HeroSection />
          </motion.div>{" "}
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.8}}
          >
            <AboutSection />
          </motion.div>
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.8}}
          >
            <ExperienceSection />
          </motion.div>
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.8}}
          >
            <ProjectsSection projects={projects} />
          </motion.div>
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.8}}
          >
            <ContactSection />
          </motion.div>
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.8}}
          >
            <Footer />
          </motion.div>
        </div>

        <ProjectModal />
        <BackToTop />
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none grid-overlay" />
      </motion.main>
    </AnimatePresence>
  );
}
