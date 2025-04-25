export async function askOllama(message: string) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral", // ou outro modelo que você baixou
      prompt: message,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao acessar o Ollama: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}
