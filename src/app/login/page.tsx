"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { handleAuth } from "../actions/handle-auth";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#0a0e23] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#1c2a3d] p-10 rounded-2xl shadow-2xl shadow-blue-500/20">
                    <p className="text-center text-gray-400">Carregando...</p>
                </div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="min-h-screen bg-[#0a0e23] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#1c2a3d] p-10 rounded-2xl shadow-2xl shadow-blue-500/20">
                    <div className="text-center mb-10">
                        <Image
                            src="/images/logo_furia.png"
                            alt="Logo FURIA"
                            width={140}
                            height={50}
                            priority
                            className="mx-auto"
                        />
                        <h1 className="mt-6 text-4xl font-barlow-condensed font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Bem-vindo, {session.user?.name}
                        </h1>
                        <p className="mt-2 text-gray-400 text-sm">
                            Você está logado como {session.user?.email}
                        </p>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => signOut()}
                            className="px-6 py-3 w-full justify-center bg-red-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-200 hover:bg-red-500"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e23] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1c2a3d] p-10 rounded-2xl shadow-2xl shadow-blue-500/20">
                <div className="text-center mb-10">
                    <Image
                        src="/images/logo_furia.png"
                        alt="Logo FURIA"
                        width={140}
                        height={50}
                        priority
                        className="mx-auto"
                    />
                    <h1 className="mt-6 text-4xl font-barlow-condensed font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                        {session ? `Bem-vindo, ${session.user?.name}` : 'ACESSO FURIANO'}
                    </h1>
                    <p className="mt-2 text-gray-400 text-sm">
                        {session ? `Você está logado como ${session.user?.email}` : 'Domine o chatbot como um pro player.'}
                    </p>
                </div>

                <div className="flex justify-center mt-8">
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className="px-6 py-3 w-full justify-center bg-red-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition duration-200 hover:bg-red-500"
                        >
                            Sair
                        </button>
                    ) : (
                        <form action={handleAuth} className="w-full">
                            <button
                                type="submit"
                                className="flex items-center gap-3 px-6 py-3 w-full justify-center bg-white text-gray-700 font-semibold rounded-md shadow-md hover:shadow-lg transition duration-200 hover:bg-gray-100"
                            >
                                <FcGoogle className="text-2xl" />
                                Entrar com Google
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
