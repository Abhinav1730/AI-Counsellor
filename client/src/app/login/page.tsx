"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/ui/AuthCard";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.email === formData.email) {
            if (user.onboardingComplete) {
                router.push("/dashboard");
            } else {
                router.push("/onboarding");
            }
        } else {
            router.push("/onboarding");
        }
    };

    return (
        <AuthCard title="Welcome Back" subtitle="Re-enter your academic ecosystem.">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-forest/40 ml-1">Guardian Email</label>
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
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-forest/40 ml-1">Access Token</label>
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
                    Resume Mission
                    <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-[10px] font-black uppercase tracking-[0.15em] text-nature-forest/40 mt-8">
                    New Seed?{" "}
                    <Link href="/signup" className="text-nature-leaf hover:underline">
                        Plant Profile
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
}
