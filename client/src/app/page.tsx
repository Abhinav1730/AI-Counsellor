"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, Compass, Sparkles, Target, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center text-center mb-32">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-nature-sage/20 bg-white/40 backdrop-blur-xl text-nature-forest text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm"
        >
          <Sprout size={14} className="text-nature-leaf" />
          <span>The Academic Arboretum</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[0.95] text-nature-forest"
        >
          Your Future, <br />
          <span className="text-gradient">Precisely Nurtured.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-2xl text-nature-forest/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          A guided study-abroad ecosystem that reasons, recommends, and tends to your path to the world&apos;s elite universities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/signup">
            <button className="btn-premium">
              Start Your Journey
              <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/login">
            <button className="btn-glass">
              Access Portal
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            img: "/discovery.png",
            icon: <Compass className="text-nature-sage" />,
            title: "Discovery",
            desc: "Map your academic DNA to find universities that perfectly fit your unique career ecosystem."
          },
          {
            img: "/focus.png",
            icon: <Target className="text-nature-forest" />,
            title: "Nurtured Focus",
            desc: "Advanced logic that ensures your commitment leads to growth, not just applications."
          },
          {
            img: "/precision.png",
            icon: <Sparkles className="text-nature-gold" />,
            title: "Elite Precision",
            desc: "AI precision handling every detail of your roadmap with world-class execution."
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="glass-card flex flex-col h-full overflow-hidden group"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={feature.img}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-0 group-hover:-translate-y-2 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
            </div>

            <div className="p-10 pt-4">
              <h3 className="text-2xl font-black mb-4 text-nature-forest">{feature.title}</h3>
              <p className="text-nature-forest/60 text-base leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Bottom CTA / Branding */}
      <footer className="mt-40 text-center flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
        <Sprout size={32} className="text-nature-leaf mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-nature-forest">
          Established for Global Excellence • AI Counsellor
        </p>
      </footer>
    </div>
  );
}
