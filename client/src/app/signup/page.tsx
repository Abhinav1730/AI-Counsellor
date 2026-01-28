"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/ui/AuthCard";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                    },
                },
            });

            if (error) throw error;
            router.push("/onboarding");
        } catch (error: any) {
            alert(error.message || "An error occurred during sign up");
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full px-8 py-5 bg-[#F8F9F8] border border-forest/10 rounded-2xl focus:outline-none focus:border-forest/30 focus:bg-white transition-all text-lg font-semibold text-forest placeholder:text-forest/20 shadow-sm";

    return (
        <AuthCard title="Sign Up">
            <div className="h-12" />
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                {/* Input Fields centered and width-limited */}
                <div className="w-full max-w-sm">
                    <div className="space-y-1">
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div className="h-8" /> {/* Explicit Spacer */}

                    <div className="space-y-1">
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="h-8" /> {/* Explicit Spacer */}

                    <div className="space-y-1">
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className={inputClasses}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                </div>

                <div className="h-12" /> {/* Larger Spacer before Actions */}

                {/* Actions: Confirm and Google side by side, matching input width */}
                <div className="flex gap-4 w-full max-w-sm">
                    {/* Confirm Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-[2] py-5 bg-[#7A7D6C] hover:bg-[#6D705F] text-white rounded-[20px] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#7A7D6C]/20 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Confirm"}
                        {!isLoading && <ArrowRight size={24} />}
                    </button>

                    {/* OAuth Button */}
                    <button
                        type="button"
                        className="flex-1 py-5 bg-white border-2 border-forest/5 rounded-[20px] text-forest font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-0 transition-all shadow-sm"
                        title="Sign up with Google"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                </div>

                <div className="h-16" /> {/* Final Large Spacer */}

                <div className="text-center w-full">
                    <p className="text-forest/40 text-sm font-black uppercase tracking-widest">
                        Part of the family?{" "}
                        <Link href="/login" className="text-forest font-black hover:underline underline-offset-8">Log In</Link>
                    </p>
                </div>
            </form>
        </AuthCard>
    );
}
