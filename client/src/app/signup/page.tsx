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
        // Simulate signup
        localStorage.setItem("user", JSON.stringify({ ...formData, onboardingComplete: false }));
        router.push("/onboarding");
    };

    return (
        <AuthCard title="Join the Constellation" subtitle="Create your profile and start your journey.">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-foreground/50 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-glass-border rounded-xl focus:outline-none focus:border-star-blue transition-colors text-sm"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-foreground/50 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
                        <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-glass-border rounded-xl focus:outline-none focus:border-star-blue transition-colors text-sm"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-foreground/50 ml-1">Create Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-glass-border rounded-xl focus:outline-none focus:border-star-blue transition-colors text-sm"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-star-blue hover:bg-star-purple text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-star-blue/20 group"
                >
                    Embark Journey
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-foreground/40 mt-6">
                    Already a member?{" "}
                    <Link href="/login" className="text-star-cyan hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
}
