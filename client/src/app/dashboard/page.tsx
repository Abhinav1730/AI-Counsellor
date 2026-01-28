"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    User,
    Map,
    University,
    CheckSquare,
    MessageSquare,
    BarChart3,
    Lock,
    Search,
    Settings,
    Bell,
    Sprout,
    Leaf,
    Sparkles,
    ArrowRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [stage, setStage] = useState(1); // 1-4 stages
    const [tasks, setTasks] = useState([
        { id: 1, title: "Complete Profile Analysis", completed: true },
        { id: 2, title: "Shortlist 5 Dream Universities", completed: false },
        { id: 3, title: "Draft Statement of Purpose", completed: false },
        { id: 4, title: "Book IELTS/TOEFL Exam", completed: false },
    ]);

    const [lockedUni, setLockedUni] = useState<any>(null);

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
                        import("@/lib/mockUniversities").then((module) => {
                            const uni = module.UNIVERSITIES.find((u: any) => u.id === lockedId);
                            setLockedUni(uni);
                            setStage(4);
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                router.push("/onboarding");
            }
        };

        checkUser();
    }, [router]);

    if (!user) return null;

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="min-h-screen pt-20 px-4 md:px-8 pb-12">
            {/* Top Bar */}
            <nav className="fixed top-0 left-0 w-full glass z-50 flex items-center justify-between px-8 py-4 !rounded-none">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                    <div className="w-8 h-8 bg-nature-forest rounded-lg flex items-center justify-center shadow-lg shadow-nature-forest/20">
                        <Sprout className="text-white w-4 h-4" />
                    </div>
                    <span className="font-bold text-xl tracking-tighter text-nature-forest uppercase">Academic Arboretum</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/universities">
                        <button className="px-5 py-2 rounded-xl bg-nature-forest hover:bg-nature-forest/90 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-nature-forest/20">
                            <Search size={14} />
                            Discover
                        </button>
                    </Link>
                    <div className="w-10 h-10 rounded-full border border-nature-sage p-0.5">
                        <div className="w-full h-full bg-nature-sage/10 rounded-full flex items-center justify-center">
                            <User size={20} className="text-nature-forest" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">

                {/* Left Column - Stage & Profile */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Stage Indicator */}
                    <div className="glass p-8 rounded-3xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-nature-sage text-sm uppercase tracking-widest font-bold mb-1 italic">Growth Phase</p>
                                    <h2 className="text-3xl font-bold text-nature-forest">
                                        {stage === 4 ? "Preparing Applications" : "Discovering Your Soil"}
                                    </h2>
                                </div>
                                <p className="text-nature-forest/40 text-sm font-bold">{Math.round((stage / 4) * 100)}% Momentum</p>
                            </div>

                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`h-2.5 flex-1 rounded-full overflow-hidden transition-all duration-700 bg-nature-sage/10`}
                                    >
                                        {(s < stage || s === stage) && (
                                            <motion.div
                                                className="h-full bg-nature-sage"
                                                initial={{ width: 0 }}
                                                animate={{ width: s < stage ? "100%" : "60%" }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-nature-sage/10 rounded-full blur-[100px] -z-10" />
                    </div>

                    {/* Conditional: Strategy for Locked University */}
                    {lockedUni ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-8 rounded-3xl border-nature-sage/30 border-2"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 text-nature-forest text-xs font-bold uppercase tracking-widest mb-1">
                                        <Leaf size={12} className="text-nature-sage" />
                                        Rooted Strategy
                                    </div>
                                    <h3 className="text-2xl font-bold text-nature-forest">{lockedUni.name}</h3>
                                </div>
                                <button
                                    onClick={() => router.push("/universities")}
                                    className="text-xs text-nature-forest/40 hover:text-nature-forest transition-colors font-bold"
                                >
                                    Modify Decision
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: "Essential Docs", items: ["Official Transcripts", "Passport Copy", "Proof of Funds"] },
                                    { title: "Test Targets", items: ["GRE/GMAT", "IELTS (7.0+)", "TOEFL (100+)"] },
                                    { title: "Next Milestones", items: ["SOP Draft", "2 LORs", "Financial Plan"] }
                                ].map((section, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-white/40 border border-nature-sage/10 space-y-3 shadow-sm">
                                        <h4 className="text-sm font-bold text-nature-forest">{section.title}</h4>
                                        <ul className="space-y-2">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="text-xs text-nature-forest/60 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-nature-sage" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <div
                            onClick={() => router.push("/universities")}
                            className="glass p-12 rounded-3xl border-dashed border-nature-sage/30 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:border-nature-sage/60 transition-all group bg-white/20"
                        >
                            <div className="w-16 h-16 rounded-full bg-nature-sage/10 flex items-center justify-center text-nature-sage group-hover:scale-110 transition-transform">
                                <Leaf size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-nature-forest">Roadmap Encrypted</h3>
                                <p className="text-sm text-nature-forest/40 max-w-sm mt-1">Lock at least one university to reveal your detailed application roadmap and specific guidance.</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Profile Summary */}
                        <div className="glass p-8 rounded-3xl space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-nature-forest">Profile Ecosystem</h3>
                                <BarChart3 className="text-nature-sage w-5 h-5" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "Intake", value: user.profile?.targetIntake || "2025" },
                                    { label: "Degree", value: user.profile?.intendedDegree?.toUpperCase() || "MASTERS" },
                                    { label: "Country", value: user.profile?.preferredCountry?.toUpperCase() || "USA" },
                                    { label: "Budget", value: `$${user.profile?.budget || '30'}k / yr` }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between p-3.5 rounded-xl bg-white/40 border border-nature-sage/10 shadow-sm font-bold">
                                        <span className="text-nature-forest/40 text-[10px] uppercase tracking-wider">{item.label}</span>
                                        <span className="text-sm text-nature-forest">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Profile Strength */}
                        <div className="glass p-8 rounded-3xl space-y-6">
                            <h3 className="text-xl font-bold text-nature-forest">Growth Potential</h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Academics", value: 85, color: "var(--nature-forest)" },
                                    { label: "Readiness", value: 40, color: "var(--nature-sage)" },
                                    { label: "Budget Fit", value: 70, color: "var(--nature-gold)" },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-nature-forest/60">
                                            <span>{item.label}</span>
                                            <span>{item.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                transition={{ delay: 1 + i * 0.1, duration: 1.5 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 rounded-xl bg-nature-sage/5 border border-nature-sage/20 text-[11px] text-nature-forest/70 leading-relaxed italic">
                                "Your background in {user.profile?.major || 'your field'} is strong. Focusing on your GRE scores will significantly increase your Ivy League chances."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - To-Do & AI Actions */}
                <div className="lg:col-span-4 space-y-8">

                    {/* AI To-Do List */}
                    <div className="glass p-8 rounded-3xl h-fit">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-nature-forest">To-Do Garden</h3>
                            <CheckSquare className="text-nature-forest w-5 h-5" />
                        </div>
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className="group flex items-center gap-4 cursor-pointer"
                                >
                                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${task.completed ? 'bg-nature-forest border-nature-forest shadow-md shadow-nature-forest/20' : 'border-nature-sage/30 group-hover:border-nature-forest'
                                        }`}>
                                        {task.completed && <CheckSquare size={14} className="text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium transition-all ${task.completed ? 'text-nature-forest/30 line-through' : 'text-nature-forest'
                                        }`}>
                                        {task.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick AI Suggestion */}
                    <div className="p-1 rounded-[2rem] bg-gradient-to-br from-nature-forest to-nature-sage shadow-2xl">
                        <div className="bg-nature-cream p-8 rounded-[1.8rem] space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-nature-forest flex items-center justify-center text-white">
                                    <Sparkles size={20} />
                                </div>
                                <h3 className="font-bold text-nature-forest">Ask Counsellor</h3>
                            </div>
                            <p className="text-sm text-nature-forest/70 leading-relaxed font-bold mb-4">
                                "I've found 3 universities that match your unique soil. Shall we examine them?"
                            </p>
                            <button
                                onClick={() => router.push("/chat")}
                                className="w-full py-4 rounded-xl bg-nature-forest hover:bg-nature-forest/90 text-white transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-nature-forest/20"
                            >
                                <MessageSquare size={18} />
                                Start Chat
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
