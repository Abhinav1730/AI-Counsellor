"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, University, Lock, CheckCircle, Info } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    actions?: { label: string; type: string; payload?: any }[];
}

const AI_AVATAR = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=counsellor&backgroundColor=05070a";

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Hello! I've analyzed your profile. Based on your GPA and budget, you have a strong chance at several mid-tier US universities. Shall we look at some 'Target' recommendations or discuss your 'Dream' schools?",
            actions: [
                { label: "Show recommendations", type: "recommend" },
                { label: "Analyze my risks", type: "risk" }
            ]
        }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "I've shortlisted 3 universities for you. Stanford (Dream), Georgia Tech (Target), and ASU (Safe). You can lock one of these to see the specific application requirements.",
                actions: [
                    { label: "Shortlist Stanford", type: "shortlist", payload: "Stanford" },
                    { label: "Shortlist Georgia Tech", type: "shortlist", payload: "Georgia Tech" }
                ]
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[80vh] glass rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex gap-4 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center p-1 border shadow-lg ${msg.role === "ai" ? "bg-star-blue/20 border-star-blue/50" : "bg-white/5 border-white/10"
                                    }`}>
                                    {msg.role === "ai" ? (
                                        <img src={AI_AVATAR} alt="AI" className="w-full h-full rounded-full" />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-star-purple/20 flex items-center justify-center text-star-purple font-bold text-xs">U</div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "ai"
                                            ? "bg-white/5 border border-white/5 rounded-tl-none"
                                            : "bg-star-blue text-white rounded-tr-none"
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {msg.actions && (
                                        <div className="flex flex-wrap gap-2">
                                            {msg.actions.map((action, i) => (
                                                <button
                                                    key={i}
                                                    className="px-4 py-2 rounded-full border border-star-blue/30 bg-star-blue/10 text-star-cyan text-xs font-semibold hover:bg-star-blue/20 transition-all flex items-center gap-2"
                                                >
                                                    {action.type === 'shortlist' && <University size={14} />}
                                                    {action.type === 'recommend' && <Sparkles size={14} />}
                                                    {action.type === 'risk' && <Info size={14} />}
                                                    {action.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white/5 border-t border-white/5">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask your counsellor about university fits, risks, or next steps..."
                        className="w-full bg-white/5 border border-glass-border p-4 pr-16 rounded-2xl outline-none focus:border-star-blue transition-all"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-3 p-2 bg-star-blue text-white rounded-xl hover:bg-star-purple transition-all"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
