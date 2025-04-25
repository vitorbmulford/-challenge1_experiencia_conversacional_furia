import { Zap, Shield, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Features() {
    const features = [
        {
            icon: <Zap className="w-16 h-16 text-yellow-500" />,
            title: "Resposta Instantânea",
            description: "Como um jogo de ritmo acelerado, respondendo em tempo real para a melhor experiência.",
            details: "Nosso chatbot FURIA oferece respostas ultra rápidas, como um jogo de FPS de altíssima velocidade. Cada comando é respondido sem delay, garantindo uma experiência fluida e sem interrupções. É uma comunicação direta e sem barreiras com a FURIA, para que você se sinta parte da equipe a qualquer momento.",
        },
        {
            icon: <Shield className="w-16 h-16 text-green-500" />,
            title: "Segurança Total",
            description: "Privacidade e proteção com criptografia de ponta a ponta em cada interação.",
            details: "As interações com o chatbot FURIA são 100% seguras, com criptografia de última geração. Protegemos seus dados como se estivessem em uma fortaleza digital, permitindo que você tenha uma experiência segura e sem preocupações enquanto interage com a equipe.",
        },
        {
            icon: <Cpu className="w-16 h-16 text-blue-500" />,
            title: "IA Adaptativa",
            description: "O chatbot aprende com você, adaptando-se às suas preferências e proporcionando uma experiência personalizada.",
            details: "Cada conversa com o chatbot FURIA o torna mais inteligente. À medida que você interage, ele aprende suas preferências, ajustando suas respostas e se tornando mais preciso e eficiente, exatamente como um jogador que evolui em cada partida.",
        },
    ];

    return (
        <section id="features" className="py-20 bg-gradient-to-b from-[#121212] to-[#1a2a3b] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 animate-fade-in">
                    O CHATBOT FURIA <span className="text-blue-400">QUE VAI ALÉM</span>
                </h2>
                <p className="text-lg text-blue-200/90 mb-12 text-center">
                    O chatbot da FURIA não é apenas uma ferramenta de respostas automáticas. Ele é um canal direto entre você e a equipe, criando uma experiência única de interação para os fãs e jogadores. Imagine conversar com o próprio time, tirar dúvidas, receber notícias em tempo real e até mesmo sentir o ritmo de uma partida de eSports — tudo isso com uma agilidade impressionante, como se estivesse no meio de uma jogada de velocidade. Com a IA Ollama por trás, garantimos respostas rápidas e personalizadas, tornando a experiência ainda mais envolvente e realista.
                    A FURIA tem o compromisso de aproximar sua comunidade de forma inovadora, e nosso chatbot é a prova disso. Ele vai além do simples atendimento ao fã, oferecendo uma experiência imersiva que traz a verdadeira essência da equipe para a sua tela.
                </p>
                <h3 className="text-3xl text-center font-bold text-white mb-8">Por que o chatbot FURIA é único?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-8 bg-[#121212]/80 border border-blue-300/20 hover:border-blue-300 transition-all transform hover:scale-105 shadow-md shadow-blue-500/10 rounded-lg relative overflow-hidden"
                        >
                            <div className="flex flex-col items-center text-center space-y-6">
                                {feature.icon}
                                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                                <p className="text-lg text-white">{feature.description}</p>
                                <p className="text-sm text-white mt-4">{feature.details}</p>
                            </div>
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-[#1a2a3b]"></div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
