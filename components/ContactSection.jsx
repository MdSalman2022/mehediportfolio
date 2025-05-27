"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactInfo from "./ui/ContactInfo";
import ContactForm from "./ui/ContactForm";
import Card from "./ui/Card";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mehedi.salman102@gmail.com",
    href: "mailto:mehedi.salman102@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+8801860222102",
    href: "tel:+8801860222102",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mirpur, Dhaka, Bangladesh",
    href: null,
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-blue-400">Information</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Interested in discussing job opportunities or collaboration? I'd
              love to hear from you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Let's Connect
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I'm always interested in new opportunities and collaborations.
                  Whether you have a project in mind or just want to say hello,
                  feel free to reach out!
                </p>
              </div>

              <ContactInfo items={contactInfo} />

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-6 bg-green-600/10 border border-green-600/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 font-semibold">
                      Available for new projects
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Currently accepting new freelance opportunities and
                    full-time positions.
                  </p>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
