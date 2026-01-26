"use client";

import React from 'react';
import Image from 'next/image';

const BotanicalBackground = () => {
    return (
        <div className="arboretum-layers">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none">
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
                className="botanical-orb w-[800px] h-[800px] bg-nature-sage/20 top-[-20%] left-[-10%]"
            />
            <div
                className="botanical-orb w-[600px] h-[600px] bg-nature-gold/10 bottom-[-10%] right-[-10%] animation-delay-2000"
            />

            {/* Subtle Grid / Texture overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fine-linen.png')] opacity-[0.05] pointer-events-none" />
        </div>
    );
};

export default BotanicalBackground;
