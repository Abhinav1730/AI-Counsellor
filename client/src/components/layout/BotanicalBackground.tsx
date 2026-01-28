"use client";

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const BotanicalBackground = () => {
    const pathname = usePathname();
    const isInternalPage = pathname?.includes('/onboarding') || pathname?.includes('/dashboard') || pathname?.includes('/universities');

    return (
        <div className="arboretum-layers">
            {/* Background Image Overlay */}
            <div className={cn(
                "absolute inset-0 grayscale pointer-events-none transition-opacity duration-1000",
                isInternalPage ? "opacity-[0.08]" : "opacity-[0.03]"
            )}>
                <Image
                    src="/hero_bg.png"
                    alt="background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Soft Floating Orbs */}
            <div
                className={cn(
                    "botanical-orb w-[800px] h-[800px] top-[-20%] left-[-10%] transition-colors duration-1000",
                    isInternalPage ? "bg-nature-leaf/20" : "bg-nature-sage/20"
                )}
            />
            <div
                className={cn(
                    "botanical-orb w-[600px] h-[600px] bottom-[-10%] right-[-10%] animation-delay-2000 transition-colors duration-1000",
                    isInternalPage ? "bg-nature-gold/15" : "bg-nature-gold/10"
                )}
            />

            {/* Additional "Inner Growth" Orb for internal pages */}
            {isInternalPage && (
                <div
                    className="botanical-orb w-[400px] h-[400px] bg-nature-forest/5 top-[40%] left-[30%] blur-[120px]"
                />
            )}

            {/* Subtle Grid / Texture overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fine-linen.png')] opacity-[0.05] pointer-events-none" />
        </div>
    );
};

export default BotanicalBackground;
