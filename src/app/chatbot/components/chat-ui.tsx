'use client';

import { useEffect, useState } from 'react';
import { SendHorizonal } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('furia-chat-history');
        if (saved) {
            setMessages(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('furia-chat-history', JSON.stringify(messages));
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isUser: true };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        try {
            const historyForAPI = updatedMessages.map((msg) => ({
                role: msg.isUser ? 'user' : 'assistant',
                content: msg.text,
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    history: historyForAPI,
                }),
            });

            const data = await response.json();
            setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
        } catch {
            setMessages((prev) => [...prev, { text: 'Erro ao obter resposta do servidor.', isUser: false }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <div className="p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                <h1 className="text-2xl font-bold text-indigo-400">Furia ChatBot</h1>
                <p className="text-sm text-gray-400">Powered by Ollama</p>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800">
                    <div className="space-y-4 max-w-3xl mx-auto pb-24">
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

                <div className="w-full max-w-3xl mx-auto px-4 py-20">
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
        </div>
    );
}
