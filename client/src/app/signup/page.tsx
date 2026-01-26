"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/ui/AuthCard";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify({ ...formData, onboardingComplete: false }));
        router.push("/onboarding");
    };

    return (
        <AuthCard title="Root Your Journey" subtitle="Create your profile to start cultivating.">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-forest/40 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-nature-forest/30 w-4 h-4" />
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-4 bg-white/50 border border-nature-sage/10 rounded-2xl focus:outline-none focus:border-nature-forest focus:bg-white transition-all text-sm font-bold text-nature-forest"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-forest/40 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-nature-forest/30 w-4 h-4" />
                        <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-4 bg-white/50 border border-nature-sage/10 rounded-2xl focus:outline-none focus:border-nature-forest focus:bg-white transition-all text-sm font-bold text-nature-forest"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-forest/40 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-nature-forest/30 w-4 h-4" />
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-4 bg-white/50 border border-nature-sage/10 rounded-2xl focus:outline-none focus:border-nature-forest focus:bg-white transition-all text-sm font-bold text-nature-forest"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full btn-premium justify-center mt-6"
                >
                    Begin Cultivation
                    <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-[10px] font-black uppercase tracking-[0.15em] text-nature-forest/40 mt-8">
                    Member already?{" "}
                    <Link href="/login" className="text-nature-leaf hover:underline">
                        Identify
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
}
