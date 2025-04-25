import { NextRequest, NextResponse } from "next/server";

type Commands = "/jogadores" | "/prox-partida" | "/estatisticas";

const commands: Record<Commands, string> = {
  "/jogadores":
    "Lista de jogadores da FURIA: FalleN, yuurih, KSCERATO, skullz, chelo.",
  "/prox-partida":
    "Próxima partida: FURIA vs MIBR, 28/04/2025, 19:00 (horário de Brasília).",
  "/estatisticas": "Último jogo: FURIA 2-0 Liquid, KSCERATO com 25 kills.",
};

export async function POST(req: NextRequest) {
  console.log("POST /api/chat: Iniciando requisição");

  try {
    const body: { message?: string } = await req.json();
    console.log("POST /api/chat: Corpo da requisição:", body);

    const message = body.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Erro: Mensagem inválida ou não fornecida." },
        { status: 400 }
      );
    }

    if (Object.keys(commands).includes(message)) {
      return NextResponse.json({ reply: commands[message as Commands] });
    }

    console.log(
      "POST /api/chat: Mensagem não é comando fixo. Enviando para o Ollama..."
    );

    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente oficial da FURIA, especializado em esports, e seu objetivo é fornecer informações detalhadas sobre a organização, suas equipes, conquistas e jogadores. Seja sempre amigável, empolgado e profundamente conhecedor do mundo competitivo, especialmente no CS:GO, League of Legends, VALORANT, e outras modalidades em que a FURIA está presente. Responda de maneira envolvente e com paixão pela FURIA, destacando sua história, eventos, torneios e todos os momentos memoráveis da equipe. Mostre o verdadeiro espírito da FURIA e mantenha a conversa descontraída, mas sempre precisa e focada no universo da organização.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error("POST /api/chat: Erro ao acessar o Ollama:", errorText);
      return NextResponse.json(
        { reply: `Erro ao acessar o Ollama: ${errorText}` },
        { status: ollamaResponse.status }
      );
    }

    const data = await ollamaResponse.json();

    if (!data?.message?.content) {
      console.error("POST /api/chat: Resposta inválida do Ollama", data);
      return NextResponse.json(
        { reply: "Erro: Resposta inválida do modelo local." },
        { status: 500 }
      );
    }

    const reply = data.message.content;
    console.log("POST /api/chat: Resposta do Ollama:", reply);

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("POST /api/chat: Erro interno:", error.message);
      return NextResponse.json(
        { reply: `Erro interno: ${error.message}` },
        { status: 500 }
      );
    } else {
      console.error("POST /api/chat: Erro interno desconhecido", error);
      return NextResponse.json(
        { reply: `Erro interno desconhecido` },
        { status: 500 }
      );
    }
  }
}
