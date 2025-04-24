
export async function POST(req) {
  const body = await req.json();
  console.log("Corpo recebido:", body);

  const message = body.message?.toLowerCase();
  console.log("Mensagem normalizada:", message);

  let responseMessage = "";

  if (!message || message.trim() === "") {
    responseMessage =
      "Digite algo para começar. Você pode perguntar: 'Quando é a próxima partida?', 'Quem são os jogadores?'";
  } else if (message.includes("jogador")) {
    responseMessage =
      "Aqui estão os jogadores da FURIA: KSCERATO, yuurih, chelo, FalleN e arT.";
  } else if (message.includes("partida") || message.includes("jogo")) {
    responseMessage =
      "A próxima partida da FURIA é contra a Team Liquid, neste sábado às 18h.";
  } else if (
    message.includes("estatística") ||
    message.includes("estatisticas")
  ) {
    responseMessage =
      "No último jogo, KSCERATO teve 25 abates, yuurih 20, e a FURIA venceu por 2 a 1.";
  } else if (
    message.includes("oi") ||
    message.includes("olá") ||
    message.includes("ola")
  ) {
    responseMessage = `Oi! 👋 Eu sou o bot da FURIA 🐺🔥
  Você pode me perguntar sobre:
  - Jogadores
  - Próxima partida
  - Estatísticas do último jogo
  
  É só digitar uma dessas opções!`;
  } else {
    responseMessage = `Desculpe, não entendi sua mensagem 😅
  Você pode perguntar por:
  - Jogadores
  - Próxima partida
  - Estatísticas
  
  Tenta algo como: "Quem são os jogadores da FURIA?"`;
  }

  return new Response(JSON.stringify({ reply: responseMessage }), {
    headers: { "Content-Type": "application/json" },
  });
}
