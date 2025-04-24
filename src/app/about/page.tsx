import Historia from './components/historia';
import ChatbotSection from './components/chatbot';

export default function SobrePage() {
    return (
        <div className="bg-blue-900 text-white min-h-screen">
            <section className="relative py-32 overflow-hidden border-b border-blue-700/50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="mt-8 text-5xl md:text-7xl font-barlow-condensed font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                        SOBRE A FÚRIA
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                        Mais que um time. Uma revolução no esporte eletrônico brasileiro.
                    </p>
                </div>
            </section>

            <Historia />
            <ChatbotSection />
        </div>
    );
}
