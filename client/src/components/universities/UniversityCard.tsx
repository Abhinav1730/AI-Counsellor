"use client";

import React from "react";
import { motion } from "framer-motion";
import { University, ShieldAlert, BadgeCheck, DollarSign, Lock, Unlock } from "lucide-react";

interface UniversityProps {
    uni: any;
    onLock: (id: string) => void;
    isLocked: boolean;
}

export default function UniversityCard({ uni, onLock, isLocked }: UniversityProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass p-6 rounded-3xl space-y-4 border transition-all relative overflow-hidden ${isLocked ? 'border-star-purple border-2' : 'border-white/5 hover:border-star-blue/50'
                }`}
        >
            {isLocked && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-star-purple text-white text-[10px] uppercase font-bold tracking-widest rounded-bl-xl">
                    Locked Decision
                </div>
            )}

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-star-cyan border border-white/5">
                        <University size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{uni.name}</h3>
                        <p className="text-foreground/40 text-xs">{uni.country} • {uni.category}</p>
                    </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter border ${uni.acceptance === 'High' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                        uni.acceptance === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5' :
                            'border-red-500/30 text-red-400 bg-red-500/5'
                    }`}>
                    {uni.acceptance} Chance
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <DollarSign size={14} className="text-star-cyan" />
                    {uni.cost} Cost
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <BadgeCheck size={14} className="text-star-purple" />
                    {uni.fitScore}% AI Fit
                </div>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-start gap-2">
                    <BadgeCheck size={14} className="text-star-cyan mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-foreground/70 leading-relaxed italic">"{uni.reasoning}"</p>
                </div>
                <div className="flex items-start gap-2">
                    <ShieldAlert size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-red-400/70 leading-relaxed font-medium">Risk: {uni.risk}</p>
                </div>
            </div>

            <button
                onClick={() => onLock(uni.id)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${isLocked
                        ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                        : 'bg-star-blue text-white hover:bg-star-purple'
                    }`}
            >
                {isLocked ? (
                    <>
                        <Unlock size={14} />
                        Unlock Decision
                    </>
                ) : (
                    <>
                        <Lock size={14} />
                        Lock & Commit
                    </>
                )}
            </button>
        </motion.div>
    );
}
