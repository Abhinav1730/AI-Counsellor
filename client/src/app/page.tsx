"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Sparkles, Target, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-20 max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-star-blue/30 bg-star-blue/10 text-star-cyan text-sm mb-6"
        >
          <Sparkles size={14} />
          <span>Intelligent Study Abroad Guidance</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Navigate Your Future with <br />
          <span className="text-gradient">AI Precision</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          The only study-abroad guide that doesn&apos;t just answer questions—it reasons,
          recommends, and executes your path to the world&apos;s top universities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup">
            <button className="px-8 py-4 rounded-xl bg-star-blue hover:bg-star-purple text-white font-semibold transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-star-blue/20">
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/login">
            <button className="px-8 py-4 rounded-xl border border-glass-border hover:bg-white/5 transition-all duration-300 font-semibold glass">
              Login to Portal
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Floating Features (Simplified Constellation nodes) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-star-blue rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-star-purple rounded-full blur-[100px]"
        />
      </div>

      {/* Visual Metaphor: Stage indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full z-20">
        {[
          { icon: <Compass className="text-star-cyan" />, title: "Discovery", desc: "AI-led profile building and goal alignment." },
          { icon: <Target className="text-star-purple" />, title: "Precision", desc: "Data-driven university recommendations and risk analysis." },
          { icon: <Sparkles className="text-star-white" />, title: "Execution", desc: "Step-by-step application guidance and automated to-dos." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="p-6 rounded-2xl glass hover:border-star-blue/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
