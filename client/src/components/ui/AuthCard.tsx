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
                className="w-full max-w-md p-8 rounded-3xl glass relative overflow-hidden"
            >
                {/* Glow Effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-star-blue/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-star-purple/20 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">{title}</h2>
                    <p className="text-foreground/60 text-sm">{subtitle}</p>
                </div>

                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthCard;
