// ... imports remain the same
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, University, Lock, CheckCircle, Info, Loader2, Sprout } from "lucide-react";
import axios from "axios";
import { supabase } from "@/lib/supabase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    actions?: { label: string; type: string; payload?: any }[];
}

const AI_AVATAR = "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=arboretum&backgroundColor=1e332a";

export default function ChatBox({ lockedUni }: { lockedUni?: any }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: lockedUni
                ? `Excellent choice committing to ${lockedUni.name}. I have analyzed its specific requirements against your profile. Shall we discuss your admission strategy for this habitat?`
                : "Welcome to the Arboretum. I am your growth architect. How can I assist with your academic cultivation today?",
            actions: lockedUni
                ? [
                    { label: `Draft SOP for ${lockedUni.name}`, type: "action" },
                    { label: "Analyze Acceptance Odds", type: "risk" }
                ]
                : [
                    { label: "Analyze my soil", type: "recommend" },
                    { label: "Project risks", type: "risk" }
                ]
        }
    ]);

    // Update messages when lockedUni changes to ensure context is fresh
    useEffect(() => {
        if (lockedUni) {
            setMessages(prev => {
                // Avoid adding duplicate welcome messages if already present
                if (prev.length === 1 && prev[0].role === 'ai') {
                    return [{
                        id: "1-updated",
                        role: "ai",
                        content: `Excellent choice committing to ${lockedUni.name}. I have analyzed its specific requirements against your profile. Shall we discuss your admission strategy for this habitat?`,
                        actions: [
                            { label: `Draft SOP for ${lockedUni.name}`, type: "action" },
                            { label: "Analyze Acceptance Odds", type: "risk" }
                        ]
                    }];
                }
                return prev;
            });
        }
    }, [lockedUni]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (msg?: string) => {
        const content = msg || input;
        if (!content.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: content };
        setMessages(prev => [...prev, userMsg]);
        if (!msg) setInput(""); // Only clear input if typed
        setIsLoading(true);

        try {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            let profile = {};

            if (supabaseUser) {
                const profileRes = await axios.get(`${API_BASE_URL}/profile/${supabaseUser.id}`);
                profile = profileRes.data;
            }

            const response = await axios.post(`${API_BASE_URL}/ai/chat`, {
                message: content,
                profile: profile,
                stage: "Discovery",
                lockedUniversity: lockedUni
            });

            const aiData = response.data;
            const aiMsg: Message = {
                id: Date.now().toString(),
                role: "ai",
                content: aiData.content,
                actions: aiData.suggestedActions
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = {
                id: Date.now().toString(),
                role: "ai",
                content: "My roots are momentarily tangled. Please allow me a moment to reconnect with the soil."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white/50 backdrop-blur-md border border-nature-forest/5 rounded-3xl overflow-hidden shadow-2xl relative">

            {/* Header */}
            <div className="p-6 bg-nature-forest/5 border-b border-nature-forest/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-nature-forest flex items-center justify-center shadow-lg shadow-nature-forest/20">
                        <Sprout className="text-white w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-nature-forest uppercase tracking-widest leading-none">AI Oracle</h3>
                        <span className="text-[9px] font-bold text-nature-sage uppercase tracking-[0.2em] mt-0.5 block">Online • Trinity Model</span>
                    </div>
                </div>
            </div>


            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md ${msg.role === "ai" ? "bg-nature-forest text-white" : "bg-nature-cream border border-nature-forest/10 text-nature-forest"
                                    }`}>
                                    {msg.role === "ai" ? (
                                        <Sparkles size={14} />
                                    ) : (
                                        <span className="font-black text-[10px]">YOU</span>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div className={`p-5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${msg.role === "ai"
                                        ? "bg-white border border-nature-forest/5 text-nature-forest rounded-tl-none"
                                        : "bg-nature-forest text-white rounded-tr-none"
                                        }`}>
                                        {msg.content}
                                    </div>

                                    {msg.actions && (
                                        <>
                                            <div className="h-2" />
                                            <div className="flex flex-wrap gap-3">
                                                {msg.actions.map((action, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSend(action.label)}
                                                        className="px-5 py-2.5 rounded-xl border border-nature-forest/10 bg-nature-forest/5 text-nature-forest text-[10px] font-black uppercase tracking-widest hover:bg-nature-forest hover:text-white transition-all flex items-center gap-2"
                                                    >
                                                        {action.type === 'shortlist' && <University size={12} />}
                                                        {action.type === 'recommend' && <Sparkles size={12} />}
                                                        {action.type === 'risk' && <Info size={12} />}
                                                        {action.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-8 h-8 rounded-xl bg-nature-forest/10 flex items-center justify-center">
                                    <Loader2 className="w-4 h-4 text-nature-forest animate-spin" />
                                </div>
                                <div className="text-[10px] font-black text-nature-forest/30 uppercase tracking-widest animate-pulse">
                                    Consulting the archives...
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-white/50 border-t border-nature-forest/5 backdrop-blur-sm">
                <div className="relative flex items-center group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Inquire about your growth path..."
                        className="w-full bg-white border border-nature-forest/5 py-8 px-8 pr-24 rounded-2xl outline-none focus:border-nature-leaf/30 focus:shadow-lg focus:shadow-nature-forest/5 transition-all text-base font-bold text-nature-forest placeholder:text-nature-forest/30"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-6 p-4 bg-nature-forest text-white rounded-xl hover:bg-nature-leaf disabled:opacity-50 disabled:hover:bg-nature-forest transition-all shadow-lg shadow-nature-forest/20 active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
}
