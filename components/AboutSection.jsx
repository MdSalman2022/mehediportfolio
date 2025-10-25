"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  Code,
  Server,
  Database,
  Cloud,
  Award,
  Target,
  Zap,
  Globe,
  Users,
} from "lucide-react";

const stats = [
  { icon: Calendar, label: "Professional Experience", value: "2+ Years" },
  { icon: Code, label: "Projects Delivered", value: "15+" },
  { icon: Server, label: "Technologies Mastered", value: "20+" },
  { icon: Cloud, label: "Cloud Platforms", value: "AWS & Azure" },
];

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Globe,
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "HTML5/CSS3",
    ],
    colorClasses: {
      bg: "bg-blue-600/20",
      border: "border-blue-600/30",
      text: "text-blue-400",
      skillBg: "bg-blue-600/20",
      skillBorder: "border-blue-600/30",
      skillText: "text-blue-300",
    },
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "RESTful APIs",
      "Socket.io",
      "RBAC",
    ],
    colorClasses: {
      bg: "bg-green-600/20",
      border: "border-green-600/30",
      text: "text-green-400",
      skillBg: "bg-green-600/20",
      skillBorder: "border-green-600/30",
      skillText: "text-green-300",
    },
  },
  {
    title: "Database & Storage",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "AWS S3"],
    colorClasses: {
      bg: "bg-purple-600/20",
      border: "border-purple-600/30",
      text: "text-purple-400",
      skillBg: "bg-purple-600/20",
      skillBorder: "border-purple-600/30",
      skillText: "text-purple-300",
    },
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: ["AWS Services", "Azure", "Docker", "CI/CD", "Git", "Vercel"],
    colorClasses: {
      bg: "bg-orange-600/20",
      border: "border-orange-600/30",
      text: "text-orange-400",
      skillBg: "bg-orange-600/20",
      skillBorder: "border-orange-600/30",
      skillText: "text-orange-300",
    },
  },
];

const achievements = [
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Consistently deliver 70%+ improvements in application load times through code optimization and efficient architecture",
  },
  {
    icon: Users,
    title: "Real-time Features",
    description:
      "Architected and implemented real-time communication systems including chat, notifications, and live updates",
  },
  {
    icon: Target,
    title: "Scalable Solutions",
    description:
      "Built enterprise-grade applications serving thousands of users with high availability and performance",
  },
  {
    icon: Award,
    title: "Cloud Architecture",
    description:
      "Designed and deployed cloud-native solutions using AWS Lambda, S3, and other modern cloud services",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-gray-800/50">
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
              About <span className="text-blue-400">Me</span>
            </h2>{" "}
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Full Stack Developer passionate about building scalable web
              applications and delivering exceptional user experiences through
              clean, efficient code
            </p>
          </motion.div>{" "}
          <div className="space-y-16">
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto text-center"
            >
              {" "}
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Passionate Full Stack Developer with{" "}
                  <span className="text-blue-400 font-semibold">
                    2+ years of professional experience
                  </span>{" "}
                  building robust web applications and scalable backend systems.
                  Experienced in delivering{" "}
                  <span className="text-blue-400 font-semibold">
                    high-performance solutions
                  </span>{" "}
                  that drive business growth and enhance user engagement across
                  diverse industry verticals.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Specialized in modern web technologies including{" "}
                  <span className="text-blue-400">
                    React, Next.js, and Node.js
                  </span>
                  , with expertise in{" "}
                  <span className="text-blue-400">
                    database design, API development
                  </span>
                  , and{" "}
                  <span className="text-blue-400">cloud infrastructure</span>.
                  Committed to writing maintainable code, following industry
                  best practices, and continuously learning emerging
                  technologies to solve complex business challenges.
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center hover:bg-gray-800/70 transition-all duration-300 group"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-white text-center mb-8">
                Technical <span className="text-blue-400">Expertise</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-2 rounded-lg ${category.colorClasses.bg} ${category.colorClasses.border} mr-3`}
                      >
                        <category.icon
                          className={`w-5 h-5 ${category.colorClasses.text}`}
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-white">
                        {category.title}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 ${category.colorClasses.skillBg} ${category.colorClasses.skillText} rounded-md text-sm ${category.colorClasses.skillBorder} text-center`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-white text-center mb-8">
                Key <span className="text-blue-400">Achievements</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
                    }
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300"
                  >
                    <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-600/30 flex-shrink-0">
                      <achievement.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
