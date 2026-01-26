"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-8 md:p-20 overflow-hidden bg-[#F5F5F0]">
            {/* Immersive Arboreal Background */}
            <div className="absolute inset-0 z-0 scale-105">
                <Image
                    src="/auth-bg.png"
                    alt="The Academic Arboretum"
                    fill
                    className="object-cover opacity-70 blur-[1px]"
                    priority
                />
                <div className="absolute inset-0 bg-[#1e332a]/10 backdrop-blur-[2px]" />
            </div>

            {/* GlassContainer (Outer) - Increased max-width and padding */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[680px] mx-auto p-6 md:p-10 bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[50px]"
            >
                {/* Inner Form Box - Increased padding */}
                <div className="bg-[#F5F5F0] rounded-[40px] py-16 px-10 md:px-20 shadow-inner">
                    {/* Header: Title */}
                    <div className="relative flex justify-center mb-16">
                        <h2 className="text-3xl font-black text-forest tracking-tight uppercase text-center">{title}</h2>
                    </div>

                    {/* Form Content */}
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </motion.div>

            {/* Soft Botanical Orbs */}
            <div className="absolute top-1/2 -left-48 -translate-y-1/2 w-[500px] h-[500px] bg-sage/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
};

export default AuthCard;
