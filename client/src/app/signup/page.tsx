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

                {/* Actions: Confirm */}
                <div className="w-full max-w-sm">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-[#7A7D6C] hover:bg-[#6D705F] text-white rounded-[20px] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#7A7D6C]/20 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Confirm"}
                        {!isLoading && <ArrowRight size={24} />}
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
