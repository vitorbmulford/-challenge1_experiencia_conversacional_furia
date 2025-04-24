import { Zap, Shield, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Features() {
    const features = [
        {
            icon: <Zap className="w-16 h-16 text-blue-400" />,
            title: "Velocidade FURIA",
            description: "Respostas instantâneas, como um rush bem executado, garantindo a melhor experiência para seus usuários.",
            details: "Com nossa infraestrutura otimizada, você nunca vai perder um segundo precioso. A velocidade das respostas é nossa prioridade máxima, para que você tenha a agilidade necessária em qualquer situação.",
        },
        {
            icon: <Shield className="w-16 h-16 text-blue-400" />,
            title: "Segurança",
            description: "Protegido com criptografia de ponta a ponta, garantindo que seus dados estejam sempre seguros.",
            details: "Cada transação e interação são cuidadosamente protegidas. Nossa criptografia de ponta a ponta garante a confidencialidade dos seus dados, para que você possa navegar com total tranquilidade.",
        },
        {
            icon: <Cpu className="w-16 h-16 text-blue-400" />,
            title: "IA Adaptativa",
            description: "Aprende com você, adaptando-se de forma inteligente às suas necessidades e preferências.",
            details: "Nossa IA evolui constantemente com o seu uso. Quanto mais você interage, mais personalizada e eficiente ela se torna, oferecendo uma experiência única e sempre otimizada.",
        },
    ];

    return (
        <section id="features" className="py-20 bg-gradient-to-b from-[#0a0e23] to-blue-950/50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-barlow-condensed text-center text-white mb-16 animate-fade-in">
                    RECURSOS <span className="text-blue-400">IMBATÍVEIS</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-8 bg-[#0a0e23]/80 border border-blue-400/10 hover:border-blue-300 transition-all transform hover:scale-105 shadow-md shadow-blue-400/5 rounded-lg relative overflow-hidden"
                        >
                            <div className="flex flex-col items-center text-center space-y-6">
                                {feature.icon}
                                <h3 className="text-2xl font-barlow-condensed text-blue-100">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-blue-200/80">{feature.description}</p>
                                <p className="text-sm text-blue-300 mt-4">{feature.details}</p>
                            </div>
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent"></div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
