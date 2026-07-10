import { create } from "zustand";
import type { Project } from "@/lib/types";

interface PortfolioState {
  activeSection: string;
  isMenuOpen: boolean;

  selectedProject: Project | null;
  isProjectModalOpen: boolean;

  setActiveSection: (section: string) => void;
  setMenuOpen: (open: boolean) => void;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: "hero",
  isMenuOpen: false,

  selectedProject: null,
  isProjectModalOpen: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setMenuOpen: (open) => set({ isMenuOpen: open }),

  openProjectModal: (project) =>
    set({ selectedProject: project, isProjectModalOpen: true }),
  closeProjectModal: () =>
    set({ selectedProject: null, isProjectModalOpen: false }),
}));
