"use client";

import {motion} from "framer-motion";
import {Mail, Phone, MapPin, ArrowUpRight} from "lucide-react";
import ContactForm from "./ui/ContactForm";

const fadeUp = {
  initial: {opacity: 0, y: 30},
  whileInView: {opacity: 1, y: 0},
  viewport: {once: true, margin: "-80px"},
  transition: {duration: 0.6},
};

const contactItems = [
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
  return (
    <section id="contact" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <motion.div {...fadeUp}>
          <p className="section-label">{"// Contact"}</p>
          <h2 className="section-heading mb-6">Get In Touch</h2>
          <div className="structured-line w-20 mb-6" />
          <p className="text-muted-foreground text-base max-w-lg mb-16">
            I&apos;m currently open to new opportunities. Whether you have a
            question, a project idea, or just want to say hi — my inbox is
            always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <motion.div
            className="space-y-4"
            {...fadeUp}
            transition={{duration: 0.6, delay: 0.1}}
          >
            {contactItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-5 p-5 border border-border hover:border-primary transition-all"
                >
                  <div className="p-3 border border-border group-hover:border-primary transition-colors shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground font-semibold group-hover:text-primary transition-colors truncate">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ) : (
                <div
                  key={item.label}
                  className="flex items-center gap-5 p-5 border border-border"
                >
                  <div className="p-3 border border-border shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground font-semibold">
                      {item.value}
                    </p>
                  </div>
                </div>
              ),
            )}

            <div className="p-5 border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-semibold text-primary">
                  Open to opportunities
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Currently accepting full-time roles, freelance projects, and
                interesting collaborations.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div {...fadeUp} transition={{duration: 0.6, delay: 0.2}}>
            <div className="border border-border p-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
