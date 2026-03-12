"use client";

import {motion} from "framer-motion";
import {Github, Linkedin, Mail} from "lucide-react";
import {smoothScrollTo} from "@/lib/utils";

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
  {id: "about", label: "About"},
  {id: "experience", label: "Experience"},
  {id: "projects", label: "Projects"},
  {id: "contact", label: "Contact"},
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 items-center gap-6 mb-8 text-center md:text-left">
          <p className="text-xl font-extrabold text-foreground tracking-tight font-sans">
            mhsalman<span className="text-primary">.me</span>
          </p>

          <div className="flex justify-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-2.5 text-muted-foreground hover:text-primary transition-all"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="md:text-right font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            © {currentYear} Mehedi Hasan Salman
          </p>
        </div>

        <div className="structured-line" />

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => smoothScrollTo(link.id)}
              className="font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
