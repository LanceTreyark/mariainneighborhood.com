"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutMariaHero2() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden pt-20 lg:items-start lg:pt-32">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/newAbout.jpeg"
                    alt="About Maria"
                    fill
                    className="object-cover object-left-top"
                    priority
                    style={{ objectPosition: 'left top' }}
                />
                {/* Pink gradient overlay from left */}
                {/*<div className="absolute inset-0 bg-gradient-to-l from-[#f5e6e3]/80 via-[#f5e6e3]/80 via-10% to-transparent" />*/}
                <div className="absolute inset-0" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-6 py-12">
                <div className="grid w-full items-center gap-12 lg:grid-cols-2">
                    {/* Left Side: empty spacer */}
                    <div className="space-y-8"></div>

                    {/* Right Side: Empty Spacer */}
                    <div className="space-y-8">

                        {/* Title with Icon */}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex items-center gap-3"
                        >
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/asterisk.png"
                                    alt=""
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h1 className="font-sans text-4xl font-bold tracking-tight text-gray-700 shadow-[0_0_16px_4px_rgba(255,255,255,0.60)] md:text-5xl">
                                About Maria
                            </h1>
                        </motion.div>


                        {/* Description */}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="space-y-4"
                        >
                            <p className="text-lg leading-relaxed text-gray-700 shadow-[0_0_16px_4px_rgba(255,255,255,0.60)] md:text-xl">
                                Born in Rio de Janeiro and now calling La Jolla home, Maria brings warmth, curiosity,
                                and a knack for discovering people's stories.
                            </p>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
}
