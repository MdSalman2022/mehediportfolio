"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {Menu, X, Sun, Moon, Github, Linkedin} from "lucide-react";
import {useTheme} from "next-themes";
import {usePortfolioStore} from "@/store/portfolioStore";
import {smoothScrollTo} from "@/lib/utils";

const navLinks = [
  {id: "hero", label: "Home"},
  {id: "about", label: "About"},
  {id: "experience", label: "Experience"},
  {id: "projects", label: "Projects"},
  {id: "contact", label: "Contact"},
];

export default function Navbar() {
  const {theme, setTheme} = useTheme();
  const {activeSection, isMenuOpen, setMenuOpen} = usePortfolioStore();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (isMenuOpen) setMenuOpen(false);
    const delay = isMenuOpen && window.innerWidth < 768 ? 300 : 0;
    setTimeout(() => smoothScrollTo(sectionId), delay);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("hero")}
          className="text-xl font-bold text-foreground hover:text-primary transition-colors tracking-tight font-sans cursor-pointer"
        >
          mhsalman<span className="text-primary">.me</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                />
              )}
            </button>
          ))}
          <div className="w-px h-5 bg-border mx-3" />
          <a
            href="https://github.com/MdSalman2022"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mehedihasan-salman/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <div className="w-px h-5 bg-border mx-3" />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-3 font-mono text-xs uppercase tracking-widest text-left transition-colors border-b border-border last:border-0 ${
                  activeSection === link.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
