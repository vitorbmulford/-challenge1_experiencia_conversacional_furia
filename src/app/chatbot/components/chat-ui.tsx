'use client';

import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (input.trim()) {
            console.log('handleSend: Iniciando envio da mensagem:', input);
            setMessages([...messages, { text: input, isUser: true }]);
            setInput('');
            setIsTyping(true);
            try {
                console.log('handleSend: Enviando fetch para /api/chat');
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input }),
                });

                console.log('handleSend: Resposta recebida, status:', response.status);
                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('handleSend: Dados recebidos da API:', data);

                if (!data.reply) {
                    throw new Error('Nenhuma propriedade "reply" encontrada na resposta da API');
                }

                console.log('handleSend: Adicionando resposta ao estado:', data.reply);
                setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
                setIsTyping(false);
            } catch (error: unknown) {
                console.error('handleSend: Erro ao processar mensagem:', error);

                const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido. Tente novamente!';
                setMessages((prev) => [...prev, { text: `Erro: ${errorMessage}`, isUser: false }]);
                setIsTyping(false);
            }
        } else {
            console.log('handleSend: Input vazio, ignorando');
        }
    };

    console.log('ChatInterface: Renderizando, mensagens:', messages);

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <div className="p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                <h1 className="text-2xl font-bold text-indigo-400">Furia ChatBot</h1>
                <p className="text-sm text-gray-400">Powered by Ollama</p>
            </div>

            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800">
                <div className="space-y-4 max-w-3xl mx-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} transition-all duration-300`}
                        >
                            <div
                                className={`max-w-[70%] p-4 rounded-2xl shadow-lg ${msg.isUser
                                    ? 'bg-indigo-600 text-white border border-indigo-500'
                                    : 'bg-gray-700 text-gray-100 border border-gray-600'
                                    } transform hover:scale-[1.02] transition-transform duration-200`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="max-w-[70%] p-4 rounded-2xl bg-gray-700 text-gray-400 border border-gray-600 animate-pulse">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 z-50">
                <div className="flex gap-3 p-3 bg-gray-900/30 backdrop-blur-md border border-gray-600/50 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Fale com o chatbot da FURIA!"
                        className="flex-1 px-4 py-2 bg-transparent text-white border-none focus:outline-none focus:ring-0 placeholder-gray-400 transition-all duration-200"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <SendHorizonal className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}