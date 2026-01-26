"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Sparkles, Target, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-32 overflow-hidden">
            {/* Top Navigation */}
            <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
                <Link href="/login">
                    <button className="btn-glass !px-6 !py-3 !text-sm !font-bold">
                        Access Portal
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="btn-premium !px-6 !py-3 !text-sm !font-bold flex items-center gap-2 shadow-xl">
                        Start Your Journey
                        <ArrowRight size={16} />
                    </button>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center text-center mb-64 mt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black mb-8 leading-[0.95] text-forest"
                >
                    Your Future, <br />
                    <span className="text-gradient">Precisely Nurtured.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-xl md:text-2xl text-forest/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    A guided study-abroad ecosystem that reasons, recommends, and tends to your path to the world&apos;s elite universities.
                </motion.p>
            </section>

            {/* Feature Cards Section */}
            <section className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        className="glass-card flex flex-col h-full rounded-[2.5rem] bg-white/50 p-3 group border border-sage/10 relative"
                    >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] mb-6 shadow-sm">
                            <Image
                                src={feature.img}
                                alt={feature.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute top-5 right-5">
                                <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 18 })}
                                </div>
                            </div>
                        </div>

                        <div className="px-5 pb-10 pt-2 flex-grow">
                            <h3 className="text-2xl font-black mb-3 text-forest tracking-tight">{feature.title}</h3>
                            <p className="text-forest/60 text-sm leading-relaxed font-semibold">
                                {feature.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Growth Cycle Section */}
            <section className="relative z-20 w-full max-w-4xl mx-auto mt-40 mb-32">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-forest mb-6">The Growth Cycle</h2>
                    <p className="text-forest/60 text-lg font-medium max-w-xl mx-auto">
                        From the first seed of an idea to the harvest of your acceptance letter.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sage/20 via-forest/20 to-sage/20 md:-translate-x-1/2" />

                    {/* Steps */}
                    {[
                        {
                            step: "01",
                            title: "Soil Analysis",
                            desc: "We analyze your academic history, strengths, and unique traits to understand where you'll thrive best.",
                            align: "left"
                        },
                        {
                            step: "02",
                            title: "Strategic Planting",
                            desc: "AI-driven university shortlisting that matches your profile with institutions where you have the highest yield potential.",
                            align: "right"
                        },
                        {
                            step: "03",
                            title: "Nurturing & Harvest",
                            desc: "Guided essay crafting, document preparation, and rigorous review cycles until your application is ready to bloom.",
                            align: "left"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className={`relative flex items-center gap-8 md:gap-0 mb-16 last:mb-0 ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-sage flex items-center justify-center z-10 md:-translate-x-1/2 shadow-lg shadow-sage/20">
                                <div className="w-3 h-3 rounded-full bg-forest" />
                            </div>

                            {/* Content Space */}
                            <div className="md:w-1/2" />

                            {/* Card */}
                            <div className={`flex-1 pl-16 md:pl-0 ${item.align === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                <div className="glass-card p-8 rounded-[2rem] bg-white/60 hover:bg-white/80 transition-colors border border-sage/10 relative overflow-hidden group">
                                    <div className="absolute -right-4 -top-4 text-[8rem] font-black text-forest/5 leading-none select-none group-hover:text-forest/10 transition-colors">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-black text-forest mb-3 relative z-10">{item.title}</h3>
                                    <p className="text-forest/70 text-sm font-semibold leading-relaxed relative z-10">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA / Branding */}
            <footer className="mt-64 text-center flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
                <Sparkles size={32} className="text-leaf mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-forest">
                    Established for Global Excellence • AI Counsellor
                </p>
            </footer>
        </div>
    );
}
