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
    Stars
} from "lucide-react";

const STEPS = [
    { id: "academic", title: "Academic Background", icon: <GraduationCap /> },
    { id: "goals", title: "Study Goals", icon: <Target /> },
    { id: "budget", title: "Budget & Funding", icon: <Wallet /> },
    { id: "readiness", title: "Readiness", icon: <ClipboardCheck /> },
];

export default function Onboarding() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        educationLevel: "",
        major: "",
        gpa: "",
        intendedDegree: "",
        fieldOfStudy: "",
        targetIntake: "",
        preferredCountry: "",
        budget: "",
        funding: "",
        testStatus: "",
        sopStatus: ""
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete onboarding
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem("user", JSON.stringify({ ...user, profile: formData, onboardingComplete: true }));
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-12 flex justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-star-blue -translate-y-1/2 -z-10 transition-all duration-500"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step, i) => (
                    <div
                        key={step.id}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${i <= currentStep ? 'bg-star-blue border-star-blue' : 'bg-space-void border-white/10'
                            }`}
                    >
                        {React.cloneElement(step.icon as React.ReactElement, { size: 18, className: i <= currentStep ? 'text-white' : 'text-white/30' })}
                    </div>
                ))}
            </div>

            {/* Form Card */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-2xl glass p-10 rounded-3xl"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-lg bg-star-blue/20 text-star-cyan">
                        {React.cloneElement(STEPS[currentStep].icon as React.ReactElement, { size: 24 })}
                    </div>
                    <h2 className="text-3xl font-bold">{STEPS[currentStep].title}</h2>
                </div>

                <div className="space-y-6">
                    {currentStep === 0 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-foreground/60">Highest Education Level</label>
                                <select
                                    className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue appearance-none"
                                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                                    value={formData.educationLevel}
                                >
                                    <option value="">Select Level</option>
                                    <option value="highschool">High School</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-foreground/60">Major / Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Computer Science"
                                        className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue"
                                        onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                        value={formData.major}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-foreground/60">GPA / Percentage</label>
                                    <input
                                        type="text"
                                        placeholder="3.8 or 85%"
                                        className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue"
                                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                        value={formData.gpa}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-foreground/60">Intended Degree</label>
                                <select
                                    className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue"
                                    onChange={(e) => setFormData({ ...formData, intendedDegree: e.target.value })}
                                    value={formData.intendedDegree}
                                >
                                    <option value="">Select Degree</option>
                                    <option value="masters">Master's (MS/MA)</option>
                                    <option value="mba">MBA</option>
                                    <option value="phd">PhD</option>
                                    <option value="bachelors">Bachelor's</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-foreground/60">Preferred Country</label>
                                    <select
                                        className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue"
                                        onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                                        value={formData.preferredCountry}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="usa">USA</option>
                                        <option value="uk">UK</option>
                                        <option value="canada">Canada</option>
                                        <option value="germany">Germany</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-foreground/60">Target Intake Year</label>
                                    <input
                                        type="text"
                                        placeholder="2025"
                                        className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue"
                                        onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                                        value={formData.targetIntake}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-foreground/60">Annual Budget (USD)</label>
                                <input
                                    type="range"
                                    min="5000" max="100000" step="5000"
                                    className="w-full accent-star-blue"
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                />
                                <div className="flex justify-between text-xs text-foreground/40">
                                    <span>$5k</span>
                                    <span className="text-star-cyan font-bold">${formData.budget || '30k'}</span>
                                    <span>$100k+</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-foreground/60">Primary Funding Source</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Self', 'Loan', 'Scholarship'].map(source => (
                                        <button
                                            key={source}
                                            onClick={() => setFormData({ ...formData, funding: source })}
                                            className={`p-4 rounded-xl border transition-all ${formData.funding === source ? 'bg-star-blue/20 border-star-blue text-white' : 'bg-white/5 border-glass-border text-foreground/40'
                                                }`}
                                        >
                                            {source}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm text-foreground/60">Test Readiness (IELTS/TOEFL/GRE)</label>
                                <select
                                    className="w-full bg-white/5 border border-glass-border p-4 rounded-xl outline-none focus:border-star-blue"
                                    onChange={(e) => setFormData({ ...formData, testStatus: e.target.value })}
                                    value={formData.testStatus}
                                >
                                    <option value="">Select Status</option>
                                    <option value="not-started">Not Started</option>
                                    <option value="booked">Booked</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-foreground/60">SOP Status</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Not Started', 'Drafting', 'Ready'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setFormData({ ...formData, sopStatus: status })}
                                            className={`p-4 rounded-xl border transition-all text-sm ${formData.sopStatus === status ? 'bg-star-blue/20 border-star-blue text-white' : 'bg-white/5 border-glass-border text-foreground/40'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                    <button
                        onClick={handleBack}
                        className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/5'
                            }`}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        className="px-8 py-4 bg-star-blue hover:bg-star-purple text-white rounded-xl font-bold transition-all flex items-center gap-2 group shadow-lg shadow-star-blue/20"
                    >
                        {currentStep === STEPS.length - 1 ? 'Launch Portal' : 'Next Step'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
