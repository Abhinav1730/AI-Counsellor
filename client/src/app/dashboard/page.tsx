"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
    Bell
} from "lucide-react";

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
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const lockedId = localStorage.getItem("lockedUni");

        if (!storedUser.email) {
            router.push("/signup");
        } else if (!storedUser.onboardingComplete) {
            router.push("/onboarding");
        } else {
            setUser(storedUser);
            if (lockedId) {
                const uni = require("@/lib/mockUniversities").UNIVERSITIES.find((u: any) => u.id === lockedId);
                setLockedUni(uni);
                setStage(4); // Advance to Phase 4 if locked
            }
        }
    }, [router]);

    if (!user) return null;

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="min-h-screen pt-20 px-4 md:px-8 pb-12">
            {/* Top Bar */}
            <nav className="fixed top-0 left-0 w-full glass z-50 flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                    <div className="w-8 h-8 bg-star-blue rounded-lg flex items-center justify-center">
                        <Lock className="text-white w-4 h-4" />
                    </div>
                    <span className="font-bold text-xl tracking-tighter">AI COUNSELLOR</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/universities">
                        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-2">
                            <Search size={14} />
                            Discover
                        </button>
                    </Link>
                    <div className="w-10 h-10 rounded-full border border-star-blue p-0.5">
                        <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
                            <User size={20} className="text-star-cyan" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column - Stage & Profile */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Stage Indicator */}
                    <div className="glass p-8 rounded-3xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-star-cyan text-sm uppercase tracking-widest font-semibold mb-1">Current Mission</p>
                                    <h2 className="text-3xl font-bold">
                                        {stage === 4 ? "Stage 4: Preparing Applications" : "Stage 2: Discovering Universities"}
                                    </h2>
                                </div>
                                <p className="text-foreground/40 text-sm">{Math.round((stage / 4) * 100)}% Journey Complete</p>
                            </div>

                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`h-2 flex-1 rounded-full overflow-hidden transition-all duration-500 ${s < stage ? 'bg-star-blue' : s === stage ? 'bg-star-blue/20' : 'bg-white/5'
                                            }`}
                                    >
                                        {(s < stage || s === stage) && (
                                            <motion.div
                                                className="h-full bg-star-blue"
                                                initial={{ width: 0 }}
                                                animate={{ width: s < stage ? "100%" : "60%" }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-star-blue/10 rounded-full blur-[100px] -z-10" />
                    </div>

                    {/* Conditional: Strategy for Locked University */}
                    {lockedUni ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-8 rounded-3xl border-star-purple border-2"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 text-star-purple text-xs font-bold uppercase tracking-widest mb-1">
                                        <Lock size={12} />
                                        Locked Roadmap
                                    </div>
                                    <h3 className="text-2xl font-bold">{lockedUni.name}</h3>
                                </div>
                                <button
                                    onClick={() => router.push("/universities")}
                                    className="text-xs text-foreground/40 hover:text-white transition-colors"
                                >
                                    Change Selection
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: "Required Docs", items: ["Official Transcripts", "Passport Copy", "Proof of Funds"] },
                                    { title: "Test Targets", items: ["GRE/GMAT", "IELTS (7.0+)", "TOEFL (100+)"] },
                                    { title: "Next Milestones", items: ["SOP Draft", "2 LORs", "Financial Plan"] }
                                ].map((section, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                        <h4 className="text-sm font-bold text-star-cyan">{section.title}</h4>
                                        <ul className="space-y-2">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="text-xs text-foreground/60 flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-star-blue" />
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
                            className="glass p-8 rounded-3xl border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:border-star-blue/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-foreground/40 group-hover:text-star-blue transition-colors">
                                <Lock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Application Logic: Encrypted</h3>
                                <p className="text-sm text-foreground/40 max-w-xs">Lock at least one university to reveal your detailed application roadmap and specific guidance.</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Profile Summary */}
                        <div className="glass p-8 rounded-3xl space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Profile Summary</h3>
                                <BarChart3 className="text-star-cyan w-5 h-5" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "Intake", value: user.profile?.targetIntake || "2025" },
                                    { label: "Degree", value: user.profile?.intendedDegree?.toUpperCase() || "MASTERS" },
                                    { label: "Country", value: user.profile?.preferredCountry?.toUpperCase() || "USA" },
                                    { label: "Budget", value: `$${user.profile?.budget || '30'}k / year` }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                        <span className="text-foreground/40 text-sm">{item.label}</span>
                                        <span className="text-sm font-semibold">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Profile Strength */}
                        <div className="glass p-8 rounded-3xl space-y-6">
                            <h3 className="text-xl font-bold">Profile Strength</h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Academics", value: 85, color: "var(--star-blue)" },
                                    { label: "Readiness", value: 40, color: "var(--star-cyan)" },
                                    { label: "Budget Fit", value: 70, color: "var(--star-purple)" },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span>{item.label}</span>
                                            <span className="text-foreground/60">{item.value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                transition={{ delay: 1 + i * 0.1, duration: 1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 rounded-xl bg-star-blue/10 border border-star-blue/20 text-xs text-star-cyan leading-relaxed">
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
                            <h3 className="text-xl font-bold">Your Tasks</h3>
                            <CheckSquare className="text-star-purple w-5 h-5" />
                        </div>
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className="group flex items-center gap-4 cursor-pointer"
                                >
                                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${task.completed ? 'bg-star-purple border-star-purple' : 'border-white/20 group-hover:border-star-purple'
                                        }`}>
                                        {task.completed && <CheckSquare size={14} className="text-white" />}
                                    </div>
                                    <span className={`text-sm transition-all ${task.completed ? 'text-foreground/30 line-through' : 'text-foreground'
                                        }`}>
                                        {task.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick AI Suggestion */}
                    <div className="p-1 rounded-3xl bg-gradient-to-br from-star-blue to-star-purple shadow-xl">
                        <div className="bg-space-deep p-8 rounded-[1.4rem] space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-star-cyan">
                                    <Stars size={20} />
                                </div>
                                <h3 className="font-bold">Ask AI Counsellor</h3>
                            </div>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                "I've found 3 universities in {user.profile?.preferredCountry || 'USA'} that perfectly match your budget. Want to see them?"
                            </p>
                            <button
                                onClick={() => router.push("/chat")}
                                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-semibold flex items-center justify-center gap-2"
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
