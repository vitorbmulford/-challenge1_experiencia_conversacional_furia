import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function ChatbotSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-900/50 to-blue-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className=" font-barlow-condensed font-bold text-4xl font-barlow-condensed text-blue-500 mb-6">
                            FURIA CHATBOT
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                O <span className="text-blue-400">primeiro chatbot feito para FURIANOS</span>, combinando:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Respostas instantâneas sobre jogos e jogadores</li>
                                <li>Integração com APIs de esports em tempo real</li>
                                <li>Design que reflete a identidade visual da FURIA</li>
                                <li>Tecnologia Next.js 15 + IA generativa</li>
                            </ul>
                            <div className="mt-8">
                                <Link href="/" className="flex items-center gap-4">
                                    <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg font-barlow-condensed">
                                        <Rocket className="mr-2" /> EXPERIMENTE AGORA
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 relative h-96 rounded-xl overflow-hidden border border-blue-900/30 bg-[url('/chatbot-preview.png')] bg-cover">
                        {/* Preview do Chatbot */}
                    </div>
                </div>
            </div>
        </section>
    );
}