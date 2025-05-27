"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Code,
  Server,
  Cloud,
  Database,
} from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

const skills = [
  {
    icon: Code,
    label: "Frontend",
    description: "React, Next.js, Tailwind, Bootstrap, JavaScript",
  },
  {
    icon: Server,
    label: "Backend",
    description: "Node.js, Express, Python, REST APIs",
  },
  {
    icon: Database,
    label: "Databases",
    description: "MongoDB, PostgreSQL, MySQL, Firebase",
  },
  { icon: Cloud, label: "DevOps", description: "AWS, Azure, CI/CD, GitHub" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>
      </div>
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window?.innerWidth || 1920,
              y: Math.random() * window?.innerHeight || 1080,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Name and Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Mehedi
              </span>
            </motion.h1>{" "}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300"
            >
              <span className="block">Full Stack Developer</span>
              <span className="text-blue-400 font-semibold">
                Specialized in Web & Cloud Solutions
              </span>
            </motion.div>
          </div>{" "}
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Experienced Full Stack Developer with 2+ years in professional
            software development, specializing in scalable web applications, API
            development, and cloud solutions. Passionate about delivering
            optimized, secure, and maintainable code that drives business
            success and exceptional user experiences.
          </motion.p>
          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
              >
                <skill.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{skill.label}</h3>
                <p className="text-gray-400 text-sm">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            {" "}
            <button
              onClick={() => smoothScrollTo("projects")}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <a
              href="/Mehedi-hasan-salman-full-stack-developer.pdf"
              download
              className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download Full CV
            </a>
          </motion.div>
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={() => smoothScrollTo("about")}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
