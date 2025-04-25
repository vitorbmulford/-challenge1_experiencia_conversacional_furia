'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, isUser: true }]);
            setInput('');

            console.log("Enviando mensagem:", input);
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            console.log("Resposta da API:", data.reply);

            setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto w-full max-w-3xl" style={{ maxHeight: '70vh' }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg max-w-[80%] ${msg.isUser
                            ? 'ml-auto bg-indigo-700/50 border border-indigo-800'
                            : 'mr-auto bg-gray-700'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 border-t border-indigo-700/30 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-[85%] md:max-w-[500px] z-50">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="bg-gray-800 border-indigo-700/50 text-white flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button
                        onClick={handleSend}
                        className="bg-indigo-600 hover:bg-indigo-700"
                        size="icon"
                    >
                        <SendHorizonal className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
