"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ComponentType } from "react";
import Card from "./Card";

export interface ContactInfoItemData {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}

const ContactInfoItem = ({
  icon: Icon,
  label,
  value,
  href,
  index,
}: ContactInfoItemData & { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="flex items-center gap-4 p-4" hover>
        <div className="flex-shrink-0 w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600/30">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h4 className="text-white font-semibold">{label}</h4>
          {href ? (
            <a
              href={href}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              {value}
            </a>
          ) : (
            <p className="text-gray-400">{value}</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const ContactInfo = ({ items }: { items: ContactInfoItemData[] }) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <ContactInfoItem key={item.label} {...item} index={index} />
      ))}
    </div>
  );
};

export default ContactInfo;
