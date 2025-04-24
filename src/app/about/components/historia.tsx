import Image from "next/image";

export default function Historia() {
    return (
        <section className="py-20 bg-gradient-to-b from-blue-900 to-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className=" font-barlow-condensed font-bold text-4xl font-barlow-condensed text-blue-500 mb-6">
                            A LENDA DA FURIA
                        </h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                Fundada em 2017, a FURIA surgiu para <span className="text-blue-400">desafiar o status quo</span> do CS:GO mundial.
                                Com um estilo agressivo e inovador, rapidamente se tornou o time brasileiro mais temido do cenário.
                            </p>
                            <p>
                                Em 2022, a organização expandiu para VALORANT, LoL e outros jogos, sempre mantendo sua
                                <span className="text-blue-400"> identidade ousada</span>.
                            </p>
                            <ul className="list-disc pl-6 mt-6 space-y-2">
                                <li>Top 4 no Major de CS:GO de 2022</li>
                                <li>Campeã da ESL Pro League Season 13</li>
                                <li>1ª organização brasileira com sede nos EUA</li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative h-96 rounded-xl overflow-hidden border border-blue-900/30">
                        <Image
                            src="/images/major22.jpg"
                            alt="major 222"
                            layout="fill"
                            objectFit="cover"
                        />

                        <div className="absolute inset-0 bg-[url('/furia-team.jpg')] bg-cover opacity-80" />
                    </div>

                </div>
            </div>
        </section>
    );
}