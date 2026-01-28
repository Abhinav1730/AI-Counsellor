"use client";

import React, { useState, useEffect, useCallback } from "react";
import { UNIVERSITIES } from "@/lib/mockUniversities";
import UniversityCard from "@/components/universities/UniversityCard";
import { ArrowLeft, Search, Filter, Info, AlertTriangle, Sprout, Sparkles, MapPin, Compass, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export default function UniversityDiscovery() {
    const router = useRouter();
    const [lockedId, setLockedId] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Search & Data State
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedUnis, setDisplayedUnis] = useState<any[]>(UNIVERSITIES);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) setUser(supabaseUser);

            const saved = localStorage.getItem("lockedUni");
            if (saved) setLockedId(saved);
        };
        checkUser();
    }, []);

    // Debounced Search Logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setDisplayedUnis(UNIVERSITIES);
            setIsSearching(false);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            setIsSearching(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/universities/search`, {
                    params: {
                        q: searchQuery,
                        userId: user?.id
                    }
                });
                setDisplayedUnis(response.data);
            } catch (error) {
                console.error("Search failed:", error);
                // Fallback to local filtering if API fails
                const filtered = UNIVERSITIES.filter(u =>
                    u.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setDisplayedUnis(filtered);
            } finally {
                setIsLoading(false);
            }
        }, 800); // 800ms debounce for premium feel

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, user]);

    const handleLock = (id: string) => {
        const uniToLock = displayedUnis.find(u => u.id === id);

        if (lockedId === id) {
            if (confirm("Are you sure you want to release this commitment? This will pause your personalized roadmap.")) {
                setLockedId(null);
                localStorage.removeItem("lockedUni");
                localStorage.removeItem("lockedUniData");
            }
        } else {
            setLockedId(id);
            localStorage.setItem("lockedUni", id);
            if (uniToLock) {
                localStorage.setItem("lockedUniData", JSON.stringify(uniToLock));
            }
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-transparent pb-24 flex flex-col items-center">
            {/* Top Bar */}
            <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-[100] border-b border-nature-forest/5 px-16 py-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push("/")}>
                        <div className="w-10 h-10 bg-nature-forest rounded-xl flex items-center justify-center shadow-lg shadow-nature-forest/20 group-hover:scale-105 transition-all">
                            <Sprout className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg tracking-tighter text-nature-forest uppercase leading-none">Academic Arboretum</span>
                            <span className="text-[10px] font-bold text-nature-sage uppercase tracking-[0.2em] mt-1">Discovery Engine</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/dashboard">
                            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-nature-forest/10 hover:bg-nature-forest hover:text-white text-nature-forest text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
                                <ArrowLeft size={14} />
                                Back to Soil
                            </button>
                        </Link>
                        <div className="w-10 h-10 rounded-full border border-nature-sage/20 p-0.5">
                            <div className="w-full h-full bg-nature-sage/10 rounded-full flex items-center justify-center text-nature-forest font-black text-xs">
                                {user?.email?.[0].toUpperCase() || "A"}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="h-16" />

            <main className="w-full max-w-5xl pt-44 px-6 lg:px-0">
                <div className="flex flex-col gap-12">

                    {/* Header Controls */}
                    <header className="premium-card p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Compass className="text-nature-leaf w-4 h-4" />
                                    <span className="text-nature-forest/40 text-[10px] font-black uppercase tracking-[0.25em]">Habitat Discovery</span>
                                </div>
                                <h1 className="text-4xl font-black text-nature-forest tracking-tighter leading-none">
                                    {isSearching ? "Search Results" : "University Constellations"}
                                </h1>
                                <p className="text-sm font-bold text-nature-forest/40 max-w-xl leading-relaxed">
                                    {isSearching
                                        ? `Exploring the global arboretum for "${searchQuery}"...`
                                        : "We've analyzed your academic genome against thousands of data points. These institutions offer the richest soil for your growth."
                                    }
                                </p>
                            </div>

                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="relative flex-1 md:w-[480px]">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="SEARCH UNIVERSITIES..."
                                        className="w-full bg-nature-forest/5 border border-nature-forest/5 rounded-2xl px-8 py-5 outline-none focus:border-nature-leaf/30 text-[11px] font-black uppercase tracking-[0.2em] text-nature-forest shadow-inner"
                                    />
                                    {isLoading && (
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                            <Loader2 size={18} className="text-nature-leaf animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <button className="p-4 bg-nature-forest/5 rounded-2xl border border-nature-forest/5 hover:border-nature-leaf/30 transition-all text-nature-forest">
                                    <Filter size={20} />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Locked Status Banner */}
                    <AnimatePresence>
                        {lockedId && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-8 rounded-[32px] bg-nature-forest text-white flex items-center gap-6 shadow-2xl shadow-nature-forest/20">
                                    <div className="w-14 h-14 rounded-2xl bg-nature-leaf/20 flex items-center justify-center flex-shrink-0 text-nature-leaf shadow-inner">
                                        <Sparkles size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-lg uppercase tracking-tight leading-none">Strategic Focus Rooted</h4>
                                        <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-2 block">
                                            {displayedUnis.find(u => u.id === lockedId)?.name || "Selected Habitat"} is now your primary target.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => router.push("/dashboard")}
                                        className="px-8 py-4 bg-nature-leaf text-nature-forest rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#328f6d] transition-all"
                                    >
                                        Inspect Roadmap
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* University Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isSearching ? 'results' : 'featured'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-10"
                        >
                            {displayedUnis.length > 0 ? (
                                displayedUnis.map((uni) => (
                                    <UniversityCard
                                        key={uni.id}
                                        uni={uni}
                                        onLock={handleLock}
                                        isLocked={lockedId === uni.id}
                                    />
                                ))
                            ) : (
                                !isLoading && (
                                    <div className="col-span-full p-20 premium-card text-center space-y-4">
                                        <div className="w-20 h-20 bg-nature-forest/5 rounded-full flex items-center justify-center mx-auto text-nature-sage">
                                            <Search size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-nature-forest uppercase tracking-tighter">No Habitats Found</h3>
                                        <p className="text-sm font-bold text-nature-forest/40 uppercase tracking-widest">Try adjusting your search filters or term.</p>
                                    </div>
                                )
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State / Warning if nothing locked */}
                    {!lockedId && !isSearching && (
                        <div className="p-16 premium-card border-dashed border-nature-forest/10 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-3xl bg-[#E14D4D]/5 flex items-center justify-center text-[#E14D4D]">
                                <AlertTriangle size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-nature-forest uppercase tracking-tighter">Commitment Required</h3>
                                <p className="text-sm font-bold text-nature-forest/40 max-w-sm mx-auto leading-relaxed uppercase tracking-widest">
                                    Lock at least one habitat to germinate your personalized application timeline and growth intelligence.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Sub-Brand Footer Line */}
                    <footer className="mt-12 opacity-20 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-nature-forest">
                        <span>Habitat Discovery Engine v2.0</span>
                        <span>© 2026 Academic Arboretum</span>
                    </footer>

                </div>
            </main>

            {/* Success Toast */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="fixed bottom-12 right-12 z-[100] bg-nature-forest text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-nature-leaf/20"
                    >
                        <div className="w-6 h-6 rounded-full bg-nature-leaf flex items-center justify-center">
                            <Sparkles size={14} className="text-nature-forest" />
                        </div>
                        <span className="font-black text-[10px] uppercase tracking-widest">Target Rooted Successfully</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
