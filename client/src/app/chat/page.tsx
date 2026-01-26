"use client";

import React from "react";
import ChatBox from "@/components/counsellor/ChatBox";
import { ArrowLeft, Stars } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
    return (
        <div className="min-h-screen pt-24 px-4 pb-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Link href="/dashboard">
                        <button className="flex items-center gap-2 text-foreground/50 hover:text-white transition-colors">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </button>
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-star-blue/30 bg-star-blue/10 text-star-cyan">
                        <Stars size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Live Reasoning: Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <ChatBox />
                    </div>

                    <div className="space-y-6">
                        <div className="glass p-6 rounded-3xl">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Stars size={18} className="text-star-purple" />
                                AI Strategy
                            </h3>
                            <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                                "We are currently in the **Discovery Phase**. I recommend shortlisting at least 3 universities before we move to the application strategy."
                            </p>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span>Shortlist Completion</span>
                                    <span>0/3</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-star-purple w-0" />
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <h3 className="font-bold mb-4">Recent Notes</h3>
                            <ul className="space-y-3">
                                <li className="text-xs text-foreground/40 leading-relaxed p-2 rounded-lg border border-white/5 bg-white/5">
                                    - Wants to study CS in USA.
                                </li>
                                <li className="text-xs text-foreground/40 leading-relaxed p-2 rounded-lg border border-white/5 bg-white/5">
                                    - Budget is ~$30k/year.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
