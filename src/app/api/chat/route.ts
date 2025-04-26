import { NextRequest, NextResponse } from "next/server";

type Role = "user" | "assistant" | "system";

type Message = { role: Role; content: string };
type Commands = "/jogadores" | "/prox-partida" | "/estatisticas";

const commands: Record<Commands, string> = {
  "/jogadores":
    "Lista de jogadores da FURIA: FalleN, yuurih, KSCERATO, skullz, chelo.",
  "/prox-partida":
    "Próxima partida: FURIA vs MIBR, 28/04/2025, 19:00 (horário de Brasília).",
  "/estatisticas": "Último jogo: FURIA 2-0 Liquid, KSCERATO com 25 kills.",
};

const casualGreetings = [
  "oi",
  "olá",
  "ola",
  "opa",
  "e aí",
  "salve",
  "bom dia",
  "boa tarde",
  "boa noite",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message;
    const history: Message[] = body.history || [];

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Erro: Mensagem inválida ou não fornecida." },
        { status: 400 }
      );
    }

    if (commands[message as Commands]) {
      return NextResponse.json({
        reply: commands[message as Commands],
      });
    }

    if (casualGreetings.includes(message.toLowerCase())) {
      return NextResponse.json({
        reply:
          "Fala aí! 👋 Tudo certo? Me pergunta qualquer coisa sobre a FURIA quando quiser!",
      });
    }

    const systemPrompt: Message = {
      role: "system",
      content: `
Você é o assistente oficial da FURIA, especializado em esports.
Responda de forma descontraída, como se estivesse trocando ideia com um fã do time.

- Evite repetir saudações como 'Olá!' toda hora.
- Fale como alguém que vive o CS e acompanha o competitivo.
- Dê respostas breves para perguntas simples.
- Se o usuário pedir mais detalhes, aí sim pode desenvolver mais.
- Seja sempre bem-humorado e direto ao ponto.`,
    };

    const chatHistory = [
      systemPrompt,
      ...history,
      { role: "user", content: message },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: chatHistory,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { reply: `Erro ao acessar o OpenRouter: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { reply: "Erro: Resposta inválida do modelo OpenRouter." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json(
      { reply: "Erro interno ao processar a mensagem." },
      { status: 500 }
    );
  }
}
