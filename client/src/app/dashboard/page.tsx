"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    User,
    Sprout,
    Search,
    BarChart3,
    Lock,
    Sparkles,
    MessageSquare,
    CheckSquare,
    ArrowRight,
    Leaf,
    Clock,
    LogOut
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import ChatBox from "@/components/counsellor/ChatBox";

const API_BASE_URL = "http://localhost:5000/api";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [stage, setStage] = useState(1);
    const [tasks, setTasks] = useState([
        { id: 1, title: "Complete Profile Analysis", completed: true },
        { id: 2, title: "Shortlist 5 Dream Universities", completed: false },
        { id: 3, title: "Draft Statement of Purpose", completed: false },
        { id: 4, title: "Book IELTS/TOEFL Exam", completed: false },
    ]);

    const [lockedUni, setLockedUni] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();

            if (!supabaseUser) {
                router.push("/signup");
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/profile/${supabaseUser.id}`);
                const profile = response.data;
                const localOnboarding = localStorage.getItem("onboarding_complete");

                if ((!profile || !profile.onboarding_complete) && localOnboarding !== "true") {
                    router.push("/onboarding");
                } else {
                    setUser({ ...supabaseUser, profile: profile || { onboarding_complete: true } });
                    const lockedId = localStorage.getItem("lockedUni");
                    const cachedData = localStorage.getItem("lockedUniData");

                    if (lockedId) {
                        if (cachedData) {
                            setLockedUni(JSON.parse(cachedData));
                        } else {
                            const module = await import("@/lib/mockUniversities");
                            const uni = module.UNIVERSITIES.find((u: any) => u.id === lockedId);
                            setLockedUni(uni);
                        }
                        setStage(4);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                router.push("/onboarding");
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    if (loading || !user) return (
        <div className="min-h-screen flex items-center justify-center bg-nature-cream">
            <div className="flex flex-col items-center gap-4">
                <Sprout className="w-12 h-12 text-nature-forest animate-bounce" />
                <p className="font-black text-nature-forest uppercase tracking-[0.2em] text-xs">Growing your dashboard...</p>
            </div>
        </div>
    );

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="min-h-screen bg-transparent pb-24 flex flex-col items-center">
            {/* Top Bar - Strictly Centered */}
            <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-[100] border-b border-nature-forest/5 px-16 py-8">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push("/")}>
                        <div className="w-10 h-10 bg-nature-forest rounded-xl flex items-center justify-center shadow-lg shadow-nature-forest/20 group-hover:scale-105 transition-all">
                            <Sprout className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg tracking-[-0.03em] text-nature-forest uppercase leading-none">Academic Arboretum</span>
                            <span className="text-[10px] font-bold text-nature-sage uppercase tracking-[0.2em] mt-1">Growth Intelligence</span>
                        </div>
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/universities">
                            <button className="flex items-center gap-3 px-8 py-3 rounded-full bg-nature-forest/5 hover:bg-nature-forest hover:text-white text-nature-forest text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-nature-forest/5 active:scale-95 border border-nature-forest/10">
                                <Search size={14} strokeWidth={3} />
                                {lockedUni ? "Seek Different Habitat" : "Find Your Habitat"}
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                router.push("/login");
                            }}
                            className="w-10 h-10 rounded-full border border-nature-sage/20 flex items-center justify-center text-nature-forest/40 hover:text-nature-forest hover:bg-nature-forest/5 hover:border-nature-forest/30 transition-all"
                            title="Sign Out"
                        >
                            <LogOut size={14} strokeWidth={2.5} />
                        </button>
                        <div className="w-10 h-10 rounded-full border border-nature-sage/20 p-0.5 pointer-events-none select-none">
                            <div className="w-full h-full bg-nature-sage/10 rounded-full flex items-center justify-center text-nature-forest font-black text-xs">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="h-16" /> {/* Navigation Buffer */}

            <main className="w-full max-w-5xl pt-44 px-6 lg:px-0">
                <div className="flex flex-col gap-12">

                    {/* Header / Stage Row */}
                    <header className="premium-card p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-nature-leaf animate-pulse" />
                                    <span className="text-nature-forest/40 text-[10px] font-black uppercase tracking-[0.25em]">Phase Alignment</span>
                                </div>
                                <h1 className="text-4xl font-black text-nature-forest tracking-tighter leading-none">
                                    {stage === 4 ? "Final Preparation" : "Discovering Your Soil"}
                                </h1>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-4xl font-black text-nature-forest leading-none">{Math.round((stage / 4) * 100)}%</span>
                                <span className="text-nature-forest/30 text-[10px] font-black uppercase tracking-widest mt-2">Overall Momentum</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className="h-3 flex-1 rounded-full bg-nature-forest/5 relative overflow-hidden">
                                    <AnimatePresence>
                                        {(s <= stage) && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: s < stage ? "100%" : "60%" }}
                                                className="absolute inset-0 bg-gradient-to-r from-nature-sage to-nature-leaf rounded-full shadow-[0_0_10px_rgba(45,158,118,0.2)]"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </header>

                    {/* Main Grid System */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* Primary Content (8 Columns) */}
                        <div className="lg:col-span-8 space-y-10">

                            {/* Strategic Roadmap - Now clearly structural */}
                            <section className="premium-card p-12 text-center group">
                                <div className="max-w-md mx-auto space-y-8">
                                    <div className="w-20 h-20 mx-auto rounded-3xl bg-nature-forest/5 flex items-center justify-center text-nature-sage group-hover:bg-nature-forest group-hover:text-white transition-all duration-500">
                                        {lockedUni ? <Leaf size={32} /> : <Lock size={32} />}
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-nature-forest uppercase tracking-tighter">
                                            {lockedUni ? lockedUni.name : "Strategic Roadmap Encrypted"}
                                        </h3>
                                        <p className="text-sm font-bold text-nature-forest/40 leading-relaxed max-w-lg mx-auto italic">
                                            {lockedUni
                                                ? (lockedUni.reasoning || "Your personalized timeline for admission is ready to germinate.")
                                                : "Lock at least one university to germinate your personalized application timeline and growth intelligence."}
                                        </p>
                                    </div>
                                    {!lockedUni && (
                                        <button
                                            onClick={() => router.push("/universities")}
                                            className="px-12 py-6 rounded-2xl bg-white border border-nature-forest/10 font-black text-xs uppercase tracking-[0.2em] text-nature-forest hover:bg-nature-forest hover:text-white transition-all shadow-xl shadow-nature-forest/5 active:scale-95"
                                        >
                                            Explore The Arboretum
                                        </button>
                                    )}
                                </div>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Ecosystem Metrics */}
                                <div className="premium-card">
                                    <header className="flex items-center justify-between mb-8 pb-4 border-b border-nature-forest/5">
                                        <h3 className="text-sm font-black text-nature-forest uppercase tracking-widest">Ecosystem</h3>
                                        <BarChart3 size={18} className="text-nature-sage" />
                                    </header>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Intake", value: user.profile?.targetIntake || "2026" },
                                            { label: "Degree", value: user.profile?.intendedDegree || "Masters" },
                                            { label: "Country", value: lockedUni?.country || user.profile?.preferredCountry || "Global" },
                                            { label: "Budget", value: `$${user.profile?.budget || "250"}k / yr` }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center group">
                                                <span className="text-nature-forest/30 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                                <span className="text-xs font-black text-nature-forest group-hover:text-nature-leaf transition-colors uppercase">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Projections */}
                                <div className="premium-card">
                                    <header className="flex items-center justify-between mb-8 pb-4 border-b border-nature-forest/5">
                                        <h3 className="text-sm font-black text-nature-forest uppercase tracking-widest">Projections</h3>
                                        <Sparkles size={18} className="text-nature-gold" />
                                    </header>
                                    <div className="space-y-6">
                                        {[
                                            { label: "AI Fit Score", value: lockedUni?.fitScore || 85, color: "#1e332a" },
                                            { label: "Readiness", value: 40, color: "#7a9c84" },
                                            { label: "Budget Fit", value: lockedUni?.cost === 'High' ? 45 : 80, color: "#b08d4a" },
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between items-center px-0.5">
                                                    <span className="text-[10px] font-black text-nature-forest/40 uppercase tracking-widest">{item.label}</span>
                                                    <span className="text-xs font-black text-nature-forest tracking-tighter">{item.value}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-nature-forest/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.value}%` }}
                                                        transition={{ duration: 1.5, ease: "circOut" }}
                                                        className="h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)]"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Content (4 Columns) */}
                        <aside className="lg:col-span-4 space-y-10">

                            {/* Embedded AI Counsellor */}
                            <section>
                                <ChatBox lockedUni={lockedUni} />
                            </section>

                        </aside>

                    </div>
                </div>
            </main>

            {/* Sub-Brand Footer Line */}
            <footer className="w-full max-w-5xl mt-24 px-6 opacity-20 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-nature-forest">
                <span>Botanical Intelligence Engine v2.0</span>
                <span>© 2026 Academic Arboretum</span>
            </footer>
        </div>
    );
}
