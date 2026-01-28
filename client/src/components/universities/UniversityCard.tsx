"use client";

import React from "react";
import { motion } from "framer-motion";
import { University, ShieldAlert, BadgeCheck, DollarSign, Lock, Unlock, Sparkles, MapPin } from "lucide-react";

interface UniversityProps {
    uni: any;
    onLock: (id: string) => void;
    isLocked: boolean;
}

export default function UniversityCard({ uni, onLock, isLocked }: UniversityProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`premium-card p-10 group transition-all duration-500 ${isLocked ? 'border-nature-leaf/40 ring-2 ring-nature-leaf/10' : 'hover:border-nature-leaf/30'
                }`}
        >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isLocked ? 'bg-nature-leaf text-white shadow-xl shadow-nature-leaf/20' : 'bg-nature-forest/5 text-nature-forest group-hover:bg-nature-forest group-hover:text-white'
                        }`}>
                        <University size={28} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h3 className="font-black text-xl text-nature-forest tracking-tighter leading-none">{uni.name}</h3>
                        <div className="flex items-center gap-2">
                            <MapPin size={10} className="text-nature-sage" />
                            <span className="text-[10px] font-bold text-nature-sage uppercase tracking-[0.2em]">{uni.country} • {uni.category}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-5 mb-10">
                <div className="bg-nature-forest/5 rounded-3xl p-6 flex flex-col gap-2">
                    <span className="text-[9px] font-black text-nature-forest/30 uppercase tracking-[0.2em]">Admissions</span>
                    <span className={`text-xs font-black uppercase tracking-tight ${uni.acceptance === 'High' ? 'text-nature-leaf' :
                        uni.acceptance === 'Medium' ? 'text-nature-gold' : 'text-[#E14D4D]'
                        }`}>
                        {uni.acceptance} Chance
                    </span>
                </div>
                <div className="bg-nature-forest/5 rounded-3xl p-6 flex flex-col gap-2">
                    <span className="text-[9px] font-black text-nature-forest/30 uppercase tracking-[0.2em]">AI Matching</span>
                    <span className="text-xs font-black text-nature-forest uppercase flex items-center gap-1.5 tracking-tight">
                        <Sparkles size={11} className="text-nature-gold" />
                        {uni.fitScore}% Score
                    </span>
                </div>
            </div>

            {/* AI Insights Block */}
            <div className="space-y-6 p-8 rounded-[32px] bg-nature-cream/50 border border-nature-forest/5 mb-10">
                <div className="flex items-start gap-4">
                    <BadgeCheck size={16} className="text-nature-leaf mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] font-bold text-nature-forest/70 leading-relaxed italic">"{uni.reasoning}"</p>
                </div>
                <div className="flex items-start gap-4 pt-6 border-t border-nature-forest/5">
                    <ShieldAlert size={16} className="text-[#E14D4D] mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] font-black text-[#E14D4D]/70 leading-relaxed uppercase tracking-tight">Risk Projection: {uni.risk}</p>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={() => onLock(uni.id)}
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${isLocked
                    ? 'bg-[#E14D4D]/10 border border-[#E14D4D]/20 text-[#E14D4D] hover:bg-[#E14D4D] hover:text-white'
                    : 'bg-nature-forest text-white hover:bg-[#15251d] shadow-xl shadow-nature-forest/10'
                    }`}
            >
                {isLocked ? (
                    <>
                        <Unlock size={14} />
                        Release Commitment
                    </>
                ) : (
                    <>
                        <Lock size={14} />
                        Commit to Genome
                    </>
                )}
            </button>
        </motion.div>
    );
}
