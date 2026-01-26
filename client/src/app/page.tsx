"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Sparkles, Target, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-40 overflow-hidden space-y-40">
            {/* Top Navigation */}
            <div className="absolute top-8 right-8 z-50 flex items-center gap-6">
                <Link href="/login">
                    <button className="btn-glass !px-8 !py-4 !text-sm !font-bold">
                        Access Portal
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="btn-premium !px-8 !py-4 !text-sm !font-bold flex items-center gap-3 shadow-xl">
                        Start Your Journey
                        <ArrowRight size={18} />
                    </button>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tight text-forest"
                >
                    Your Future, <br />
                    <span className="text-gradient">Precisely Nurtured.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-lg md:text-xl text-forest/60 max-w-xl mx-auto font-medium leading-loose tracking-wide"
                >
                    A guided study-abroad ecosystem that reasons, recommends, and tends to your path to the world&apos;s elite universities.
                </motion.p>
            </section>

            {/* Feature Cards Section */}
            <section className="relative z-20 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    {
                        img: "/discovery.png",
                        icon: <Compass className="text-sage" />,
                        title: "Discovery",
                        desc: "Map your academic DNA to find universities that perfectly fit your unique career ecosystem."
                    },
                    {
                        img: "/focus.png",
                        icon: <Target className="text-forest" />,
                        title: "Nurtured Focus",
                        desc: "Advanced logic that ensures your commitment leads to growth, not just applications."
                    },
                    {
                        img: "/precision.png",
                        icon: <Sparkles className="text-gold" />,
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
                        className="glass-card flex flex-col h-full rounded-[2.5rem] bg-white/50 p-4 group border border-sage/10 relative overflow-hidden"
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] mb-8 shadow-sm">
                            <Image
                                src={feature.img}
                                alt={feature.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute top-6 right-6">
                                <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 22 })}
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-12 pt-4 flex-grow space-y-4">
                            <h3 className="text-2xl font-black text-forest tracking-tight">{feature.title}</h3>
                            <p className="text-forest/60 text-base leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Bottom CTA / Branding */}
            <footer className="text-center flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity space-y-4">
                <Sparkles size={32} className="text-leaf" />
                <p className="text-xs font-black uppercase tracking-[0.3em] text-forest">
                    Established for Global Excellence • AI Counsellor
                </p>
            </footer>
        </div>
    );
}
