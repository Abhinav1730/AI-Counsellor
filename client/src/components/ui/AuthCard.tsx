"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 bg-transparent relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full max-w-[560px] relative"
            >
                {/* Decorative Sprout Icon */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-nature-forest rounded-3xl flex items-center justify-center shadow-2xl shadow-nature-forest/30 z-[20]">
                    <Sprout className="text-white w-10 h-10" />
                </div>

                {/* Main Glass Container */}
                <div className="premium-card p-12 md:p-16 pt-24 bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[48px]">
                    <header className="text-center space-y-3 mb-12">
                        <h2 className="text-4xl font-black text-nature-forest tracking-tighter uppercase leading-none">{title}</h2>
                        <p className="text-[10px] font-black text-nature-sage uppercase tracking-[0.3em]">{subtitle || "Cultivating Your Academic Future"}</p>
                    </header>

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>

                {/* Sub-Brand Footer */}
                <div className="mt-12 text-center opacity-30 text-[9px] font-black uppercase tracking-[0.5em] text-nature-forest">
                    Academic Arboretum Intelligence
                </div>
            </motion.div>
        </div>
    );
};

export default AuthCard;
