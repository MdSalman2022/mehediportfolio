import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const smoothScrollTo = (elementId) => {
  console.log("smoothScrollTo called with:", elementId); // Debug log
  const element = document.getElementById(elementId);
  console.log("Element found:", element); // Debug log

  if (element) {
    const navbarHeight = 64; // Height of the fixed navbar
    const elementPosition = element.offsetTop - navbarHeight;
    console.log("Scrolling to position:", elementPosition); // Debug log

    // For mobile devices, add a small delay to ensure menu is closed first
    if (window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }, 100);
    } else {
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }
};

export const formatTechStack = (technologies) => {
  return technologies.join(" • ");
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
