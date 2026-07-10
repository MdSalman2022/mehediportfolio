import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const navbarHeight = 64;
  const elementPosition = element.offsetTop - navbarHeight;

  if (window.innerWidth < 768) {
    setTimeout(() => {
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }, 100);
  } else {
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  }
};

export const formatTechStack = (technologies: string[]) => {
  return technologies.join(" • ");
};

export const truncateText = (text: string, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
