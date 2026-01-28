"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, Target, ArrowRight, Menu, X } from "lucide-react";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-24 md:py-40 overflow-hidden space-y-20 md:space-y-40 relative">
            {/* Top Navigation */}
            <div className="absolute top-0 w-full p-6 md:p-8 z-50 flex items-center justify-end">
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
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

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden p-2 mr-2 text-forest active:scale-95 transition-all"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-20 right-6 w-64 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-sage/20 flex flex-col gap-3 md:hidden origin-top-right"
                        >
                            <Link href="/login" className="w-full">
                                <button className="btn-glass w-full !py-4 !text-xs !font-bold">
                                    Access Portal
                                </button>
                            </Link>
                            <Link href="/signup" className="w-full">
                                <button className="btn-premium w-full !py-4 !text-xs !font-bold flex items-center justify-center gap-2 shadow-sm">
                                    Start Journey
                                    <ArrowRight size={14} />
                                </button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Hero Section */}
            <section className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-24 md:pt-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-10 leading-tight tracking-tight text-forest"
                >
                    Your Future, <br />
                    <span className="text-gradient">Precisely Nurtured.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-base md:text-lg lg:text-xl text-forest/60 max-w-xl mx-auto font-medium leading-loose tracking-wide px-4"
                >
                    A guided study-abroad ecosystem that reasons, recommends, and tends to your path to the world&apos;s elite universities.
                </motion.p>
            </section>

            {/* Feature Cards Section */}
            <section className="relative z-20 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-2 md:px-0">
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
                        className="glass-card flex flex-col h-full rounded-[2rem] md:rounded-[2.5rem] bg-white/50 p-3 md:p-4 group border border-sage/10 relative overflow-hidden"
                    >
                        <div className="relative aspect-video md:aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] mb-6 md:mb-8 shadow-sm">
                            <Image
                                src={feature.img}
                                alt={feature.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute top-4 right-4 md:top-6 md:right-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                    {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-[18px] h-[18px] md:w-[22px] md:h-[22px]" })}
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pb-8 md:px-6 md:pb-12 pt-2 md:pt-4 flex-grow space-y-3 md:space-y-4">
                            <h3 className="text-xl md:text-2xl font-black text-forest tracking-tight">{feature.title}</h3>
                            <p className="text-forest/60 text-sm md:text-base leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Bottom CTA / Branding */}
            <footer className="text-center flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity space-y-4 pb-8">
                <Sparkles size={24} className="text-leaf md:w-8 md:h-8" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-forest">
                    Established for Global Excellence • AI Counsellor
                </p>
            </footer>
        </div>
    );
}
