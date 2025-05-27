"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { truncateText } from "@/lib/utils";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    projects,
    isProjectsLoading,
    projectsError,
    fetchProjects,
    openProjectModal,
  } = usePortfolioStore();

  useEffect(() => {
    if (projects.length === 0 && !isProjectsLoading) {
      fetchProjects();
    }
    // Remove fetchProjects from the dependency array, or use a ref to track if we've already fetched
  }, [projects.length, isProjectsLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {" "}
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Enterprise-level applications and solutions showcasing my
              technical expertise and professional experience
            </p>
          </motion.div>
          {/* Loading State */}
          {isProjectsLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-400">Loading projects...</span>
            </div>
          )}
          {/* Error State */}
          {projectsError && (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">
                Failed to load projects: {projectsError}
              </p>
              <button
                onClick={fetchProjects}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          {/* Projects Grid */}
          {!isProjectsLoading && !projectsError && projects.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {" "}
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className="group relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 md:hover:transform md:hover:scale-105 cursor-pointer md:cursor-default"
                  onClick={() => {
                    // Only trigger on mobile/tablet devices
                    if (window.innerWidth < 768) {
                      openProjectModal(project);
                    }
                  }}
                >
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.img[0]}
                      alt={project.title}
                      className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    {/* Overlay on Hover - Desktop */}
                    <div className="hidden md:flex absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center cursor-pointer">
                      <button
                        onClick={() => openProjectModal(project)}
                        className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>{" "}
                    {/* Mobile View Details Button */}
                    <div className="md:hidden absolute bottom-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectModal(project);
                        }}
                        className="px-4 py-2 bg-blue-600/90 backdrop-blur-md text-white text-sm font-semibold rounded-lg border border-blue-500/50 hover:bg-blue-600 transition-all duration-300 shadow-lg"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {truncateText(project.desc, 120)}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded border border-blue-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded border border-gray-600/30">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex items-center gap-3">
                      {project.sitelink && (
                        <a
                          href={project.sitelink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-sm rounded-lg transition-colors border border-blue-600/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Live
                        </a>
                      )}
                      {project.codelink && (
                        <a
                          href={project.codelink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 text-sm rounded-lg transition-colors border border-gray-600/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-3 h-3" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Type Badge */}
                  {project.project_type && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-600/30 backdrop-blur-sm">
                        {project.project_type}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
          {/* Empty State */}
          {!isProjectsLoading && !projectsError && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No projects found.</p>
            </div>
          )}
          {/* View All Projects CTA */}
          {projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center mt-12"
            >
              <a
                href="https://github.com/MdSalman2022"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                View All Projects on GitHub
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
