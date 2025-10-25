"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
  } = useContactForm();

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">
          Thank you for reaching out. I'll get back to you soon!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{submitError}</p>
        </motion.div>
      )}

      <Input
        {...register("name")}
        label="Name"
        placeholder="Your full name"
        error={errors.name?.message}
        required
      />

      <Input
        {...register("email")}
        type="email"
        label="Email"
        placeholder="your.email@example.com"
        error={errors.email?.message}
        required
      />

      <Input
        {...register("subject")}
        label="Subject"
        placeholder="What's this about?"
        error={errors.subject?.message}
        required
      />

      <TextArea
        {...register("message")}
        label="Message"
        rows={6}
        placeholder="Tell me about your project..."
        error={errors.message?.message}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        icon={!isSubmitting ? <Send className="w-4 h-4" /> : null}
        className="w-full"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
