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
    Clock
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import axios from "axios";

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

                if (!profile || !profile.onboarding_complete) {
                    router.push("/onboarding");
                } else {
                    setUser({ ...supabaseUser, profile });
                    const lockedId = localStorage.getItem("lockedUni");
                    if (lockedId) {
                        const module = await import("@/lib/mockUniversities");
                        const uni = module.UNIVERSITIES.find((u: any) => u.id === lockedId);
                        setLockedUni(uni);
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

                    <div className="flex items-center gap-6">
                        <Link href="/universities">
                            <button className="px-6 py-2.5 rounded-full bg-nature-forest hover:bg-[#15251d] text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-nature-forest/10 active:scale-95">
                                Plant Your Flag
                            </button>
                        </Link>
                        <div className="w-10 h-10 rounded-full border border-nature-sage/20 p-0.5">
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
                                        <p className="text-sm font-bold text-nature-forest/40 leading-relaxed">
                                            {lockedUni
                                                ? "Your personalized timeline for admission is ready to germinate. Start your tasks to progress."
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
                                            { label: "Country", value: user.profile?.preferredCountry || "USA" },
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
                                            { label: "Academics", value: 85, color: "#1e332a" },
                                            { label: "Readiness", value: 40, color: "#7a9c84" },
                                            { label: "Budget Fit", value: 70, color: "#b08d4a" },
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

                            {/* Task Garden */}
                            <section className="premium-card p-10">
                                <header className="flex items-center justify-between mb-10">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-black text-nature-forest tracking-tight uppercase leading-none">To-Do Garden</h3>
                                        <span className="text-[9px] font-black text-nature-sage uppercase tracking-widest mt-1">Maintenance</span>
                                    </div>
                                    <CheckSquare size={20} className="text-nature-forest/20" />
                                </header>
                                <div className="space-y-6">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className="group flex gap-4 cursor-pointer items-start"
                                        >
                                            <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${task.completed
                                                ? 'bg-nature-forest border-nature-forest shadow-lg shadow-nature-forest/20'
                                                : 'border-nature-sage/20 bg-white group-hover:border-nature-leaf'
                                                }`}>
                                                {task.completed && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white"><CheckSquare size={12} /></motion.div>}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className={`text-sm font-bold tracking-tight leading-tight transition-all duration-300 ${task.completed ? 'text-nature-forest/30 line-through' : 'text-nature-forest'
                                                    }`}>
                                                    {task.title}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* AI Oracle Card */}
                            <section className="relative group perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-br from-nature-leaf/20 to-nature-forest/20 rounded-[28px] blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative premium-card p-10 bg-[#1e332a] border-white/5">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-nature-leaf shadow-inner">
                                            <Sparkles size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-black uppercase tracking-tighter leading-none">AI Oracle</h3>
                                            <p className="text-[9px] font-black text-nature-leaf uppercase tracking-widest mt-1">Direct Consultation</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-black /80 leading-relaxed mb-10 italic">
                                        "The current soil conditions for Masters in the USA are vibrant. Shall we analyze your target shortlist?"
                                    </p>
                                    <button
                                        onClick={() => router.push("/chat")}
                                        className="w-full py-5 rounded-2xl bg-nature-leaf hover:bg-[#328f6d] text-nature-forest transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-nature-leaf/20 flex items-center justify-center gap-3 active:scale-95"
                                    >
                                        <MessageSquare size={18} />
                                        Enter Chambers
                                    </button>
                                </div>
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
