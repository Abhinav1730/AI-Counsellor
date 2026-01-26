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
        // Simulate login
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.email === formData.email) {
            if (user.onboardingComplete) {
                router.push("/dashboard");
            } else {
                router.push("/onboarding");
            }
        } else {
            // For demo, just let them in to onboarding if user doesn't exist
            router.push("/onboarding");
        }
    };

    return (
        <AuthCard title="Reconnect" subtitle="Access your study abroad portal.">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <label className="text-xs uppercase tracking-widest text-foreground/50 ml-1">Password</label>
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
                    className="w-full py-4 bg-star-blue hover:bg-star-purple text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-star-blue/20 group"
                >
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-foreground/40 mt-6">
                    New to the portal?{" "}
                    <Link href="/signup" className="text-star-cyan hover:underline">
                        Create account
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
}
