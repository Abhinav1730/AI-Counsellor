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
    Sprout,
    Leaf
} from "lucide-react";

const STEPS = [
    { id: "academic", title: "Academic Soil", icon: <GraduationCap /> },
    { id: "goals", title: "Growth Goals", icon: <Target /> },
    { id: "budget", title: "Resource Plan", icon: <Wallet /> },
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
        budget: "30000",
        funding: "",
        testStatus: "",
        sopStatus: ""
    });

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem("user", JSON.stringify({ ...user, profile: formData, onboardingComplete: true }));
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-12 flex justify-between relative px-2">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-nature-sage/10 -translate-y-1/2 -z-10" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-nature-forest -translate-y-1/2 -z-10 transition-all duration-700 rounded-full"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step, i) => (
                    <div
                        key={step.id}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${i <= currentStep ? 'bg-nature-forest border-nature-forest shadow-nature-forest/20' : 'bg-white border-nature-sage/10'
                            }`}
                    >
                        {React.cloneElement(step.icon as React.ReactElement, { size: 20, className: i <= currentStep ? 'text-white' : 'text-nature-sage/50' })}
                    </div>
                ))}
            </div>

            {/* Form Card */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl glass p-10 rounded-3xl"
            >
                <div className="flex items-center gap-3 mb-16">
                    <div className="p-3 rounded-2xl bg-nature-sage/10 text-nature-forest shadow-inner">
                        {React.cloneElement(STEPS[currentStep].icon as React.ReactElement, { size: 28 })}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-nature-sage uppercase tracking-widest">Phase {currentStep + 1}</p>
                        <h2 className="text-3xl font-bold text-nature-forest leading-tight">{STEPS[currentStep].title}</h2>
                    </div>
                </div>

                <div className="space-y-6">
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Highest Education Level</label>
                                <select
                                    className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest appearance-none text-nature-forest font-medium"
                                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                                    value={formData.educationLevel}
                                >
                                    <option value="">Select Level</option>
                                    <option value="highschool">High School</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Major / Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Computer Science"
                                        className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest text-nature-forest placeholder:text-nature-forest/30 font-medium"
                                        onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                        value={formData.major}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">GPA / Percentage</label>
                                    <input
                                        type="text"
                                        placeholder="3.8 or 85%"
                                        className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest text-nature-forest placeholder:text-nature-forest/30 font-medium"
                                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                        value={formData.gpa}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Intended Degree</label>
                                <select
                                    className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest text-nature-forest font-medium"
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
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Preferred Country</label>
                                    <select
                                        className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest text-nature-forest font-medium"
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
                                    <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Target Intake Year</label>
                                    <input
                                        type="text"
                                        placeholder="2025"
                                        className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest text-nature-forest placeholder:text-nature-forest/30 font-medium"
                                        onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                                        value={formData.targetIntake}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Annual Budget Target (USD)</label>
                                <input
                                    type="range"
                                    min="5000" max="100000" step="5000"
                                    className="w-full accent-nature-forest"
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    value={formData.budget}
                                />
                                <div className="flex justify-between text-xs font-bold text-nature-forest/40">
                                    <span>$5k</span>
                                    <span className="text-nature-forest bg-nature-sage/10 px-4 py-1 rounded-full text-sm">${Number(formData.budget).toLocaleString()}</span>
                                    <span>$100k+</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Primary Funding Source</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['Self', 'Loan', 'Scholarship'].map(source => (
                                        <button
                                            key={source}
                                            onClick={() => setFormData({ ...formData, funding: source })}
                                            className={`p-5 rounded-2xl border-2 transition-all font-bold text-sm ${formData.funding === source
                                                ? 'bg-nature-forest border-nature-forest text-white shadow-lg'
                                                : 'bg-white border-nature-sage/10 text-nature-forest/40 hover:border-nature-forest/20'
                                                }`}
                                        >
                                            {source}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">External Test Readiness (IELTS/TOEFL/GRE)</label>
                                <select
                                    className="w-full bg-white/50 border border-nature-sage/20 p-4 rounded-xl outline-none focus:border-nature-forest text-nature-forest font-medium"
                                    onChange={(e) => setFormData({ ...formData, testStatus: e.target.value })}
                                    value={formData.testStatus}
                                >
                                    <option value="">Select Status</option>
                                    <option value="not-started">Not Started (Seed Phase)</option>
                                    <option value="booked">Booked (Growth Phase)</option>
                                    <option value="completed">Completed (Vibrant Phase)</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-nature-forest/50 uppercase tracking-wider ml-1">Statement of Purpose Status</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['Not Started', 'Drafting', 'Finalized'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setFormData({ ...formData, sopStatus: status })}
                                            className={`p-5 rounded-2xl border-2 transition-all font-bold text-xs ${formData.sopStatus === status
                                                ? 'bg-nature-forest border-nature-forest text-white shadow-lg'
                                                : 'bg-white border-nature-sage/10 text-nature-forest/40 hover:border-nature-forest/20'
                                                }`}
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
                <div className="flex justify-between items-center mt-16 pt-8 border-t border-nature-sage/10">
                    <button
                        onClick={handleBack}
                        className={`px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all text-nature-forest/50 hover:text-nature-forest hover:bg-white/50 ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''
                            }`}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        className="btn-premium px-10 py-4 font-bold flex items-center gap-2 group shadow-xl"
                    >
                        {currentStep === STEPS.length - 1 ? 'Launch Profile' : 'Next Phase'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>

            {/* Footer Meta */}
            <div className="mt-8 flex items-center gap-2 text-nature-forest/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Leaf size={12} className="text-nature-sage" />
                Decisions are permanent once locked in the arboretum
            </div>
        </div>
    );
}
