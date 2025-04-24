"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";  

const baseNavItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/about" },
];

export default function Header() {
    const [session, setSession] = useState<Session | null>(null);  
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        getSession()
            .then((sess) => setSession(sess))
            .finally(() => setIsLoading(false));
    }, []);

    const navItems = [
        ...baseNavItems,
        session
            ? { label: "Profile", href: "/profile" }
            : { label: "Login", href: "/login" },
    ];

    if (isLoading) {
        return (
            <header className="sticky top-0 z-50 bg-[#0a0e23]/95 backdrop-blur-lg border-b border-[#0a0e23]/30 shadow-lg shadow-blue-400/5">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-3 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4">
                    </Link>

                    <Button
                        variant="ghost"
                        className="md:hidden relative overflow-hidden group"
                        size="icon"
                        onClick={toggleMenu}
                        aria-label="Menu mobile"
                    >
                        <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 transition-all duration-500"></div>
                        <div className="absolute inset-0 border border-blue-300/30 rounded-md group-hover:border-blue-200/50 transition-all duration-500"></div>
                        <Menu className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-500 relative z-10" />
                    </Button>
                </div>
            </header>
        );
    }

    const formatName = (fullName: string) => {  
        const names = fullName.split(' ');
        if (names.length <= 2) return fullName;
        return `${names[0]}\n${names[names.length - 1]}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0a0e23]/95 backdrop-blur-lg border-b border-[#0a0e23]/30 shadow-lg shadow-blue-400/5">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-3 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-4">
                    <Image src="/images/logo_furia.png" alt="Logo FURIA" width={120} height={40} />
                </Link>

                <nav className="hidden md:flex gap-8">
                    {navItems.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="relative text-white hover:text-blue-300 font-barlow-condensed text-sm uppercase tracking-wider group transition-all duration-300"
                        >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500"></span>
                        </Link>
                    ))}

                    {session && (
                        <Link
                            href="/chatbot"
                            className="relative text-white hover:text-blue-300 font-barlow-condensed text-sm uppercase tracking-wider group transition-all duration-300"
                        >
                            <span className="relative z-10">Chatbot</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500"></span>
                        </Link>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {session ? (
                        <>
                            {session.user?.image && (
                                <Link href="/profile">
                                    <Image
                                        src={session.user.image}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full border-2 border-gray-700 hover:border-blue-500 transition-colors duration-300"
                                    />
                                </Link>
                            )}
                            <span className="text-sm font-medium text-white whitespace-pre-line">
                                {formatName(session.user?.name || '')}  
                            </span>
                            <Button
                                variant="ghost"
                                onClick={() => signOut()}
                                className="text-white hover:text-blue-400"
                            >
                                Sair
                            </Button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md"
                        >
                            Entrar
                        </Link>
                    )}
                </div>

                <Button
                    variant="ghost"
                    className="md:hidden relative overflow-hidden group"
                    size="icon"
                    onClick={toggleMenu}
                    aria-label="Menu mobile"
                >
                    <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 transition-all duration-500"></div>
                    <div className="absolute inset-0 border border-blue-300/30 rounded-md group-hover:border-blue-200/50 transition-all duration-500"></div>
                    {isMenuOpen ? (
                        <X className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-500 relative z-10" />
                    ) : (
                        <Menu className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-500 relative z-10" />
                    )}
                </Button>
            </div>

            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-blue-950/95 backdrop-blur-lg border-t border-blue-400/30`}>
                <nav className="flex flex-col items-center py-4 space-y-6">
                    {navItems.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="relative text-white hover:text-blue-300 font-barlow-condensed text-sm uppercase tracking-wider group transition-all duration-300"
                        >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500"></span>
                        </Link>
                    ))}
                    {session && (
                        <Link
                            href="/chatbot"
                            className="relative text-white hover:text-blue-300 font-barlow-condensed text-sm uppercase tracking-wider group transition-all duration-300"
                        >
                            <span className="relative z-10">Chatbot</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500"></span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}