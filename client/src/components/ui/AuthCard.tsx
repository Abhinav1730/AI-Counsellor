"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-10 glass relative overflow-hidden"
            >
                {/* Subtle Glow Effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-nature-sage/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-nature-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 text-center mb-10">
                    <h2 className="text-3xl font-black mb-3 tracking-tight text-nature-forest leading-tight uppercase">{title}</h2>
                    <p className="text-nature-forest/50 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
                </div>

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthCard;
