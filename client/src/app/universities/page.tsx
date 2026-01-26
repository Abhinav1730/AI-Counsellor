"use client";

import React, { useState, useEffect } from "react";
import { UNIVERSITIES } from "@/lib/mockUniversities";
import UniversityCard from "@/components/universities/UniversityCard";
import { ArrowLeft, Search, Filter, Info, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function UniversityDiscovery() {
    const [lockedId, setLockedId] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("lockedUni");
        if (saved) setLockedId(saved);
    }, []);

    const handleLock = (id: string) => {
        if (lockedId === id) {
            if (confirm("Are you sure you want to unlock this decision? This will reset your application strategy.")) {
                setLockedId(null);
                localStorage.removeItem("lockedUni");
            }
        } else {
            setLockedId(id);
            localStorage.setItem("lockedUni", id);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <Link href="/dashboard">
                            <button className="flex items-center gap-2 text-foreground/50 hover:text-white transition-colors mb-4">
                                <ArrowLeft size={18} />
                                Dashboard
                            </button>
                        </Link>
                        <h1 className="text-4xl font-bold">University Discovery</h1>
                        <p className="text-foreground/50 max-w-xl">
                            Based on your profile, we&apos;ve mapped out {UNIVERSITIES.length} constellations that match your goals.
                        </p>
                    </div>

                    <div className="flex gap-3 h-fit">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                            <input
                                type="text"
                                placeholder="Search universities..."
                                className="bg-white/5 border border-glass-border rounded-xl pl-10 pr-4 py-3 outline-none focus:border-star-blue text-sm"
                            />
                        </div>
                        <button className="p-3 glass rounded-xl border-white/10 hover:border-star-blue transition-colors text-foreground/60 hover:text-white">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {lockedId && (
                    <div className="p-4 rounded-2xl bg-star-purple/10 border border-star-purple/30 text-star-purple flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-full bg-star-purple/20 flex items-center justify-center flex-shrink-0">
                            <Info size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Strategic Focus Locked</h4>
                            <p className="text-xs opacity-70">Your application guidance for {UNIVERSITIES.find(u => u.id === lockedId)?.name} is now available in your dashboard.</p>
                        </div>
                        <Link href="/dashboard" className="ml-auto">
                            <button className="px-4 py-2 bg-star-purple text-white rounded-lg text-xs font-bold hover:opacity-80 transition-all">
                                View Roadmap
                            </button>
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {UNIVERSITIES.map((uni) => (
                        <UniversityCard
                            key={uni.id}
                            uni={uni}
                            onLock={handleLock}
                            isLocked={lockedId === uni.id}
                        />
                    ))}
                </div>

                {!lockedId && (
                    <div className="p-8 glass rounded-3xl border-dashed border-red-500/20 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-400">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Decision Required</h3>
                        <p className="text-foreground/40 text-sm max-w-md mx-auto">
                            To unlock Stage 4 (Application Guidance), you must lock at least one university. This ensures focus and momentum in your preparation.
                        </p>
                    </div>
                )}

            </div>

            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 right-8 z-[60] bg-star-blue text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
                    >
                        <BadgeCheck className="text-star-cyan" />
                        <span className="font-bold text-sm">Decision Locked Successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function BadgeCheck(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
