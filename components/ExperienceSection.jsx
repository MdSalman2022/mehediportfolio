"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building,
  Briefcase,
  Calendar,
  ChevronRight,
  MapPin,
} from "lucide-react";

const experience = [
  {
    position: "Full Stack Web Developer",
    company: "Gruham.ai",
    location: "Remote (Hyderabad, India)",
    period: "May 2023 – Present",
    responsibilities: [
      "Pioneered the integration of a chat feature, enhancing homeowner and designer real-time communication, thereby boosting user engagement",
      "Engineered front end optimizations, achieving a 75% reduction in initial load times and a 50% decrease in unnecessary code, enhancing overall performance and user experience significantly",
      "Proficiently integrated Firebase push notifications, enhancing user engagement and delivering timely updates",
      "Engineered live stream functionality for interactive events and seamless event broadcasting",
      "Worked on reels feature to enhance user engagement by showcasing short and engaging video content",
      "Developed real-time activity feeds, enriching user interactions and keeping them informed",
      "Utilized Express.js for backend development, enabling efficient server-side operations and smooth data handling with MongoDB and PostgreSQL as the databases",
      "Collaborated with a team to design and develop a user-friendly, modern React frontend",
      "Implemented AWS Lambda functions for image optimization, improving load times and user experience",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "AWS Lambda",
      "Socket.io",
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional <span className="text-blue-400">Experience</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              My journey as a Full Stack Developer with a focus on enterprise
              solutions
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="relative pl-8 mb-12 border-l-2 border-blue-600/50 pb-8"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <Building className="w-3 h-3 text-white" />
                </div>

                <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {job.position}
                      </h3>
                      <div className="flex items-center mt-2 text-gray-300">
                        <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                        <span className="mr-3">{job.company}</span>
                        <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {job.period}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex">
                          <ChevronRight className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                          <p className="text-gray-300">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
