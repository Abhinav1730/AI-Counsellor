"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    Target,
    Wallet,
    ClipboardCheck,
    ArrowRight,
    ArrowLeft,
    Leaf,
    Shield
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { cn } from "@/lib/utils";

const API_BASE_URL = "http://localhost:5000/api";

const STEPS = [
    { id: "academic", title: "Academic Soil", icon: <GraduationCap />, tag: "Phase 01" },
    { id: "goals", title: "Growth Goals", icon: <Target />, tag: "Phase 02" },
    { id: "budget", title: "Resource Plan", icon: <Wallet />, tag: "Phase 03" },
    { id: "readiness", title: "Vibrant Readiness", icon: <ClipboardCheck />, tag: "Phase 04" },
];

export default function Onboarding() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for back, 1 for next
    const [formData, setFormData] = useState({
        educationLevel: "",
        major: "",
        gpa: "",
        intendedDegree: "",
        fieldOfStudy: "",
        targetIntake: "",
        preferredCountry: "",
        budget: "30000",
        funding: "",
        testStatus: "",
        sopStatus: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // We don't redirect immediately to allow demo-ing the UI, 
                // but we warn that they'll need to sign up to save.
                console.warn("No active session found. Progress won't be saved.");
            }
        };
        checkUser();
    }, []);

    const handleNext = async () => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    alert("Your session has expired or your email is not confirmed. Please sign up or log in to save your profile.");
                    router.push("/signup");
                    return;
                }

                await axios.post(`${API_BASE_URL}/profile`, {
                    userId: user.id,
                    data: {
                        ...formData,
                        onboarding_complete: true
                    }
                });

                router.push("/dashboard");
            } catch (error: any) {
                console.error("Onboarding error:", error);
                alert(error.response?.data?.error || "Failed to save profile. Please confirm your email or try again later.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 pb-24">
            {/* Progress Eco-System */}
            <div className="w-full max-w-3xl mb-0 relative px-4 flex justify-between -translate-x-12">
                <div className="progress-line-bg" />
                <div
                    className="progress-line-active"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step, i) => (
                    <div key={step.id} className="flex flex-col items-center gap-4 relative">
                        <div
                            className={cn(
                                "step-dot",
                                i <= currentStep ? "step-dot-active" : "step-dot-inactive"
                            )}
                        >
                            {React.cloneElement(step.icon as React.ReactElement<any>, {
                                size: 24,
                                strokeWidth: 1.5,
                                className: i <= currentStep ? 'text-white' : 'text-nature-sage/40'
                            })}
                        </div>
                        {i === currentStep && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] font-black uppercase tracking-[0.15em] text-nature-forest absolute -bottom-8 whitespace-nowrap"
                            >
                                {step.id}
                            </motion.span>
                        )}
                    </div>
                ))}
            </div>

            {/* Spacer */}
            <div className="h-24 md:h-32 w-full" />

            {/* Form Card */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 50, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -direction * 50, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="w-full max-w-3xl glass p-16 md:p-24 rounded-2xl shadow-premium relative overflow-hidden"
                >

                    <div className="flex flex-col items-center text-center mb-12 relative z-10">
                        <span className="text-[11px] font-black text-nature-sage uppercase tracking-[0.3em] mb-3">
                            {STEPS[currentStep].tag}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-nature-forest leading-tight tracking-tight">
                            {STEPS[currentStep].title}
                        </h2>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {currentStep === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div className="field-container">
                                    <label className="field-label">Educational Foundation</label>
                                    <div className="relative">
                                        <select
                                            className="field-select"
                                            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                                            value={formData.educationLevel}
                                        >
                                            <option value="">Select Level</option>
                                            <option value="highschool">High School</option>
                                            <option value="bachelors">Bachelor&apos;s Degree</option>
                                            <option value="masters">Master&apos;s Degree</option>
                                        </select>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                            <GraduationCap size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="field-container">
                                        <label className="field-label">Field of Vitality</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Computer Science"
                                            className="field-input"
                                            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                            value={formData.major}
                                        />
                                    </div>
                                    <div className="field-container">
                                        <label className="field-label">Yield / GPA</label>
                                        <input
                                            type="text"
                                            placeholder="3.8 or 85%"
                                            className="field-input"
                                            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                            value={formData.gpa}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div className="field-container">
                                    <label className="field-label">Desired Ecosystem</label>
                                    <select
                                        className="field-select"
                                        onChange={(e) => setFormData({ ...formData, intendedDegree: e.target.value })}
                                        value={formData.intendedDegree}
                                    >
                                        <option value="">Select Target Degree</option>
                                        <option value="masters">Master&apos;s (MS/MA)</option>
                                        <option value="mba">MBA</option>
                                        <option value="phd">PhD</option>
                                        <option value="bachelors">Bachelor&apos;s</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="field-container">
                                        <label className="field-label">Climate / Country</label>
                                        <select
                                            className="field-select"
                                            onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                                            value={formData.preferredCountry}
                                        >
                                            <option value="">USA, UK, Canada...</option>
                                            <option value="usa">United States</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="canada">Canada</option>
                                            <option value="germany">Germany</option>
                                            <option value="australia">Australia</option>
                                        </select>
                                    </div>
                                    <div className="field-container">
                                        <label className="field-label">Growth Initiation</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Fall 2025"
                                            className="field-input"
                                            onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                                            value={formData.targetIntake}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div className="space-y-4">
                                    <label className="field-label ml-2">Resource Allocation (USD)</label>
                                    <div className="px-2">
                                        <input
                                            type="range"
                                            min="5000" max="100000" step="5000"
                                            className="w-full"
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            value={formData.budget}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black text-nature-forest/30 px-2 uppercase tracking-widest">
                                        <span>Scale: $5k</span>
                                        <motion.span
                                            key={formData.budget}
                                            initial={{ scale: 1.1, color: "#1e332a" }}
                                            animate={{ scale: 1, color: "#1e332a" }}
                                            className="text-lg bg-nature-forest text-white px-8 py-2 rounded-2xl shadow-lg"
                                        >
                                            ${Number(formData.budget).toLocaleString()}
                                        </motion.span>
                                        <span>Max: $100k+</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="field-label ml-2">Primary Nutrient Source</label>
                                    <div className="h-2" />
                                    <div className="grid grid-cols-3 gap-4">
                                        {['Self', 'Loan', 'Grant'].map(source => (
                                            <button
                                                key={source}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, funding: source })}
                                                className={cn(
                                                    "p-6 rounded-[28px] border transition-all duration-500 font-black text-xs uppercase tracking-widest",
                                                    formData.funding === source
                                                        ? 'bg-nature-forest border-nature-forest text-white shadow-xl -translate-y-1'
                                                        : 'bg-white/40 border-nature-sage/5 text-nature-forest/30 hover:bg-white/60'
                                                )}
                                            >
                                                {source}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <div className="field-container">
                                    <label className="field-label">External Evaluation</label>
                                    <select
                                        className="field-select"
                                        onChange={(e) => setFormData({ ...formData, testStatus: e.target.value })}
                                        value={formData.testStatus}
                                    >
                                        <option value="">Current Status</option>
                                        <option value="not-started">Seed Phase (Not Started)</option>
                                        <option value="booked">Growth Phase (Booked)</option>
                                        <option value="completed">Vibrant Phase (Completed)</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="field-label ml-2">Vision Statement (SOP)</label>
                                    <div className="h-2" />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['Not Started', 'Drafting', 'Finalized'].map(status => (
                                            <button
                                                key={status}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, sopStatus: status })}
                                                className={cn(
                                                    "p-6 rounded-[28px] border transition-all duration-500 font-black text-[10px] uppercase tracking-widest",
                                                    formData.sopStatus === status
                                                        ? 'bg-nature-forest border-nature-forest text-white shadow-xl -translate-y-1'
                                                        : 'bg-white/40 border-nature-sage/5 text-nature-forest/30 hover:bg-white/60'
                                                )}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-20 pt-10 border-t border-nature-forest/5 relative z-10">
                        <button
                            type="button"
                            onClick={handleBack}
                            className={cn(
                                "flex items-center gap-3 px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all",
                                currentStep === 0
                                    ? 'opacity-0 pointer-events-none'
                                    : 'text-nature-forest/30 hover:text-nature-forest hover:bg-nature-forest/5'
                            )}
                        >
                            <ArrowLeft size={16} strokeWidth={3} />
                            Go Back
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="btn-premium group shadow-2xl"
                        >
                            {currentStep === STEPS.length - 1 ? (
                                <span className="flex items-center gap-3">
                                    Launch Profile <Shield size={18} fill="currentColor" />
                                </span>
                            ) : (
                                <span className="flex items-center gap-3">
                                    Next Phase <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Footer Meta */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 flex items-center gap-3 text-nature-forest/20 text-[10px] font-black uppercase tracking-[0.4em]"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-nature-leaf animate-pulse" />
                Decisions are permanent in the arboretum
            </motion.div>
        </div>
    );
}
