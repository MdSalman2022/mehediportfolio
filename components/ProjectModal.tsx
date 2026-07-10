"use client";

import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {X, ExternalLink, Github, ArrowLeft, ArrowRight} from "lucide-react";
import {Drawer} from "vaul";
import {usePortfolioStore} from "@/store/portfolioStore";

export default function ProjectModal() {
  const {selectedProject, isProjectModalOpen, closeProjectModal} =
    usePortfolioStore();
  const [imgIndex, setImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset image index when project changes
  if (!selectedProject) return null;

  const images = selectedProject.img ?? [];
  const hasManyImages = images.length > 1;

  const prev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setImgIndex((i) => (i + 1) % images.length);
  };

  const ProjectContent = ({isDrawer = false}) => (
    <>
      {isDrawer ? (
        <>
          <Drawer.Title className="sr-only">
            {selectedProject.title}
          </Drawer.Title>
          <Drawer.Description className="sr-only">
            Project details for {selectedProject.title}
          </Drawer.Description>
        </>
      ) : (
        <h2 className="sr-only">{selectedProject.title}</h2>
      )}
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary/60 tracking-widest">
            PROJECT
          </span>
          <div className="w-px h-4 bg-border" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            {selectedProject.project_type ?? "work"}
          </span>
        </div>
        {!isMobile && (
          <button
            onClick={closeProjectModal}
            className="p-1.5 text-muted-foreground hover:text-primary border border-transparent hover:border-border transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Image viewer */}
      {images.length > 0 && (
        <div className="relative aspect-video overflow-hidden bg-muted shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIndex}
              src={images[imgIndex]}
              alt={`${selectedProject.title} screenshot ${imgIndex + 1}`}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-card/60 via-transparent to-transparent pointer-events-none" />

          {/* Prev / Next */}
          {hasManyImages && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/70 border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/70 border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all backdrop-blur-sm"
                aria-label="Next image"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIndex(i);
                    }}
                    className={`w-1.5 h-1.5 transition-all ${
                      i === imgIndex
                        ? "bg-primary w-4"
                        : "bg-foreground/30 hover:bg-foreground/60"
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Content scroll area */}
      <div className="p-6 md:p-8 space-y-8 grow overflow-y-auto">
        {/* Title + CTAs */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="font-pixel text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1">
              {selectedProject.title}
            </h2>
            {selectedProject.project_type && (
              <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase">
                {selectedProject.project_type}
              </p>
            )}
          </div>
          <div className="flex gap-3 shrink-0">
            {selectedProject.sitelink && (
              <a
                href={selectedProject.sitelink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Site
              </a>
            )}
            {selectedProject.codelink && (
              <a
                href={selectedProject.codelink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-muted-foreground font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* About */}
        <div>
          <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-3">
            {"// About"}
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {selectedProject.desc}
          </p>
        </div>

        {/* Tech stack */}
        {selectedProject.technologies?.length > 0 && (
          <div>
            <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-4">
            {"// Stack"}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-mono font-medium border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery thumbnails */}
        {hasManyImages && (
          <div className="pb-8 md:pb-0">
            <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-4">
            {"// Gallery"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`relative aspect-video overflow-hidden border transition-all ${
                    i === imgIndex
                      ? "border-primary"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedProject.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {i === imgIndex && (
                    <div className="absolute inset-0 bg-primary/10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer.Root
        open={isProjectModalOpen}
        onOpenChange={(open) => !open && closeProjectModal()}
        shouldScaleBackground
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-60 backdrop-blur-sm" />
          <Drawer.Content className="bg-card border-t border-border flex flex-col rounded-t-[10px] h-fit max-h-[96svh] fixed bottom-0 left-0 right-0 z-70 outline-none">
            <div className="mx-auto w-12 h-1 rounded-full bg-border mt-3 mb-1 shrink-0" />
            <ProjectContent isDrawer={true} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <AnimatePresence onExitComplete={() => setImgIndex(0)}>
      {isProjectModalOpen && (
        <motion.div
          key="backdrop"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-sm"
          onClick={closeProjectModal}
        >
          <motion.div
            key="panel"
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 24}}
            transition={{duration: 0.25, ease: "easeOut"}}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-card border border-border flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectContent isDrawer={false} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
