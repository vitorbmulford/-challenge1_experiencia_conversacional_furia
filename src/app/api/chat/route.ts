import { NextRequest, NextResponse } from "next/server";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

type Commands = "/jogadores" | "/prox-partida" | "/estatisticas";
const commands: Record<Commands, string> = {
  "/jogadores": "Lista de jogadores da FURIA: FalleN, yuurih, KSCERATO, skullz, chelo.",
  "/prox-partida": "Próxima partida: FURIA vs MIBR, 28/04/2025, 19:00 (horário de Brasília).",
  "/estatisticas": "Último jogo: FURIA 2-0 Liquid, KSCERATO com 25 kills.",
};

const casualGreetings = ["oi", "olá", "ola", "opa", "e aí", "salve", "bom dia", "boa tarde", "boa noite"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message?.trim().toLowerCase();
    const history: Message[] = body.history || [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Erro: Mensagem inválida ou não fornecida." }, { status: 400 });
    }

    // Comando fixo
    if (Object.keys(commands).includes(message)) {
      return NextResponse.json({ reply: commands[message as Commands] });
    }

    // Saudação simples
    if (casualGreetings.includes(message)) {
      return NextResponse.json({
        reply: "Fala aí! 👋 Tudo certo? Me pergunta qualquer coisa sobre a FURIA quando quiser!",
      });
    }

    const chatHistory = [
      {
        role: "system",
        content: `
Você é o assistente oficial da FURIA, especializado em esports. Responda de forma natural e amigável, com empolgação equilibrada.
- Evite repetir saudações como 'Olá!' toda hora.
- Fale como se estivesse conversando com um fã que curte o time.
- Dê respostas breves para perguntas simples, e mais detalhadas quando o usuário pedir.
`.trim(),
      },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: chatHistory,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      return NextResponse.json({ reply: `Erro OpenAI: ${errorText}` }, { status: 500 });
    }

    const data = await openaiResponse.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ reply: "Erro: Resposta inválida da OpenAI." }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json({ reply: "Erro interno ao processar a mensagem." }, { status: 500 });
  }
}
