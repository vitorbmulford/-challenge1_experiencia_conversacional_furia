export type Command = {
  name: string;
  description: string;
  usage: string;
  category: "jogadores" | "partidas" | "estatísticas";
};

export const COMMANDS: Command[] = [
  {
    name: "/jogadores",
    description: "Lista todos os jogadores da FURIA",
    usage: "/jogadores [posição?]",
    category: "jogadores",
  },
  {
    name: "/prox-partida",
    description: "Mostra a próxima partida agendada",
    usage: "/prox-partida",
    category: "partidas",
  },
  {
    name: "/estatisticas",
    description: "Estatísticas do último jogo",
    usage: "/estatisticas [jogador?]",
    category: "estatísticas",
  },
  // Adicione mais comandos...
];
