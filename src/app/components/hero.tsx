"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"; 

const images = [
    "/images/furia_hero4.png",
    "/images/furia_hero5.png",
    "/images/furia_hero6.png",
    "/images/furia_hero7.png",
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { data: session } = useSession(); 

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImage();
        }, SLIDE_INTERVAL);

        return () => clearInterval(intervalId);
    }, [currentImageIndex]);

    const handleButtonClick = () => {
        if (session) {
            window.location.href = "/chatbot";
        } else {
            window.location.href = "/login";
        }
    };

    return (
        <section className="relative h-screen overflow-hidden bg-[#0a0e23]">
            <div className="absolute inset-0 z-0">
                <Image
                    src={images[currentImageIndex]}
                    alt="Hero Image"
                    layout="fill"
                    objectFit="cover"
                    className="object-cover transition-opacity duration-1000 brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center text-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 animate-fade-in">
                    <span className="text-4xl md:text-5xl font-barlow-condensed font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 tracking-wider">
                        FURIA CHATBOT
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-barlow-condensed tracking-tighter text-white mb-6">
                    <span className="block">DOMINE</span>
                    <span className="block mt-2 text-4xl md:text-6xl lg:text-7xl">O JOGO</span>
                </h1>

                <p className="mt-8 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed font-medium px-4">
                    O chatbot definitivo para elevar sua performance ao nível FURIA
                </p>

                <div className="mt-16 flex gap-4 justify-center">
                    <Button
                        onClick={handleButtonClick}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 px-8 py-5 text-xl font-barlow-condensed font-bold text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                    >
                        <Rocket className="mr-2 w-5 h-5" /> Começar Agora
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-30">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-blue-500 scale-125' : 'bg-gray-400'}`}
                        aria-label={`Ir para slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,197,253,0.02)_0%,transparent_70%)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
            </div>
        </section>
    );
}
