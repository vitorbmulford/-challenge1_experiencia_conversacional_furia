import { Bot, Bolt, BrainCircuit, MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Features() {
    const features = [
        {
            icon: <Bot className="w-16 h-16 text-purple-400" />,
            title: "IA de Verdade",
            description: "Baseada no modelo Mistral 7B Instruct.",
            details: "Nossa IA não é só script ou resposta pré-programada. Com tecnologia de ponta da Mistral AI, ela gera respostas naturais, personalizadas e inteligentes em tempo real para cada interação.",
        },
        {
            icon: <Bolt className="w-16 h-16 text-yellow-400" />,
            title: "Velocidade Competitiva",
            description: "Respostas rápidas no ritmo FURIA.",
            details: "Cada pergunta é respondida no melhor estilo FURIA: rápido, certeiro e sem enrolação. É atendimento instantâneo para quem vive no ritmo do competitivo.",
        },
        {
            icon: <BrainCircuit className="w-16 h-16 text-blue-400" />,
            title: "Adaptação ao Contexto",
            description: "Expande a conversa quando precisa.",
            details: "A IA é capaz de entender a necessidade do usuário: sendo direta em perguntas simples, mas também desenvolvendo respostas mais completas quando a situação pede.",
        },
        {
            icon: <MessageSquareQuote className="w-16 h-16 text-green-400" />,
            title: "Comunicação com Personalidade",
            description: "A vibe de quem é #FURIA.",
            details: "Cada resposta traz a energia, humor e estilo que fazem a identidade da FURIA. Nada de robô travado: é papo reto, na linguagem da torcida!",
        },
    ];

    return (
        <section id="features" className="py-20 bg-gradient-to-b from-[#121212] to-[#1a2a3b] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 animate-fade-in">
                    FURIA CHAT IA <span className="text-blue-400">ALÉM DO BÁSICO</span>
                </h2>
                <p className="text-lg text-blue-200/90 mb-12 text-center">
                    Alimentado pela Mistral 7B, o FURIA Chat IA é mais que um chatbot: é um parceiro de conversa inteligente, veloz e com a alma do competitivo. Um novo jeito de se conectar com o time que respira e vive o jogo.
                </p>
                <h3 className="text-3xl text-center font-bold text-white mb-8">
                    O que torna a nossa IA única?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
