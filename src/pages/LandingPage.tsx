"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Cpu, Brain, Database, Lock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/HeroSection";
import InnovativeSolutions from '@/components/landing/InnovativeSolutions';
import TestimonialSection from "@/components/landing/TestmonialsSection";
import Footer from "@/components/landing/Footer";
export function LandingPage() {
  // Data for features and solutions
  const features = [
    { title: "AI Model Marketplace", description: "Trade and discover AI models", icon: Brain },
    { title: "AI Agent Rental", description: "Rent AI agents", icon: Cpu },
    { title: "Computing Power", description: "Access computing resources", icon: Database },
    { title: "On-Chain Execution", description: "Execute AI models on-chain", icon: Lock },
  ];

  const solutions = [
    { title: "AI Model Licensing", description: "Secure licensing", demo: <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" /> },
    { title: "Federated Learning", description: "Collaborative training", demo: <div className="h-40 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg" /> },
    { title: "Dynamic Pricing", description: "Market-driven pricing", demo: <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg" /> },
  ];

  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);

  // Intersection Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && controls.start("visible"),
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <HeroSection>
        <div></div>
      </HeroSection>

      {/* Core Features Section */}
      <section ref={ref} id="features-section" className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.1),transparent_50%)]" />

        {/* Core Features */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 
            className="text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            Core Features
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={controls}
            variants={{
              visible: { 
                transition: { staggerChildren: 0.2 }
              },
              hidden: {}
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 }
                }}
                className="relative p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300"
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        
        {/* Solutions Section */}
        
        <InnovativeSolutions/>

        {/* Testimonials with enhanced styling */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <TestimonialSection />
          <Footer />
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => {
          const featuresSection = document.querySelector('#features-section');
          featuresSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
        <span className="text-sm">Scroll to explore</span>
      </motion.div>
    </div>
  );
}