"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/MdSalman2022",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mehedihasan-salman/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:mehedi.salman102@gmail.com",
    label: "Email",
  },
];

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-2xl font-bold text-white">
                <span className="text-primary">Mehedi</span>
                <span>.dev</span>
              </div>{" "}
              <p className="text-gray-400 max-w-md leading-relaxed">
                Passionate Full Stack Developer specializing in modern web
                technologies, scalable backend systems, and cloud
                infrastructure. Committed to building innovative solutions that
                make a difference.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-2 bg-gray-800 hover:bg-primary text-gray-400 hover:text-white rounded-lg transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => smoothScrollTo(link.id)}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {" "}
              <h3 className="text-white font-semibold text-lg">Expertise</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Frontend Development</li>
                <li>Backend & API Development</li>
                <li>Database Architecture</li>
                <li>Cloud Infrastructure (AWS/Azure)</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Mehedi.dev.</span>
          </div>

          <motion.button
            onClick={() => smoothScrollTo("hero")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-primary text-gray-300 hover:text-white rounded-lg transition-all duration-300 group"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:transform group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
