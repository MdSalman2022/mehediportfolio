import { create } from "zustand";

export const usePortfolioStore = create((set, get) => ({
  // Projects state
  projects: [],
  isProjectsLoading: false,
  projectsError: null,

  // UI state
  activeSection: "hero",
  isMenuOpen: false,
  scrollY: 0,

  // Theme state
  isDarkMode: true,

  // Modal state
  selectedProject: null,
  isProjectModalOpen: false,

  // Actions
  setProjects: (projects) => set({ projects }),
  setProjectsLoading: (loading) => set({ isProjectsLoading: loading }),
  setProjectsError: (error) => set({ projectsError: error }),

  setActiveSection: (section) => set({ activeSection: section }),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setScrollY: (y) => set({ scrollY: y }),

  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  openProjectModal: (project) =>
    set({
      selectedProject: project,
      isProjectModalOpen: true,
    }),
  closeProjectModal: () =>
    set({
      selectedProject: null,
      isProjectModalOpen: false,
    }),

  // Async actions
  fetchProjects: async () => {
    set({ isProjectsLoading: true, projectsError: null });
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projects = await response.json();
      set({ projects, isProjectsLoading: false });
    } catch (error) {
      set({ projectsError: error.message, isProjectsLoading: false });
    }
  },
}));
