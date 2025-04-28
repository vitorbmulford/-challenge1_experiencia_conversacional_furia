# Projeto Conversacional FURIA

Este projeto é um **assistente conversacional oficial da FURIA**, especializado em **esports**. Desenvolvido para responder perguntas sobre o time FURIA, fornecer informações sobre jogadores, estatísticas de jogos e interações gerais. O chatbot é 100% baseado em IA, utilizando o modelo **Mistral 7B Instruct**, integrado via **OpenRouter.ai**.

Além disso, o projeto utiliza autenticação via **Google**, permitindo o acesso seguro a recursos protegidos.

## Funcionalidades

- **IA Conversacional (Mistral 7B Instruct)**:
  - Respostas inteligentes e dinâmicas sobre o time FURIA.
  - Baseado em um modelo de IA robusto, conectado ao OpenRouter.ai.

- **Respostas sobre jogadores**:
  - Obtenha uma lista dos jogadores do time FURIA.

- **Próximos jogos**:
  - Informações sobre a próxima partida, incluindo data e horário.

- **Estatísticas**:
  - Dados de performances em jogos recentes.

- **Saudações**:
  - Reconhecimento de saudações casuais e respostas amigáveis.

- **Autenticação com Google**:
  - Autentique-se utilizando sua conta Google para acessar recursos protegidos.

## Tecnologias Utilizadas

- **Next.js 15**: Framework principal utilizado para o desenvolvimento do projeto.
- **TypeScript**: Linguagem principal para maior segurança de tipos.
- **Tailwind CSS**: Biblioteca para estilização e componentes modernos.
- **Auth.js**: Para autenticação via Google.
- **OpenRouter.ai**: Integração com modelos de IA, utilizando Mistral 7B Instruct.
- **JavaScript**: Suporte adicional ao TypeScript.

## Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/vitorbmulford/challenge1_experiencia_conversacional_furia.git
cd challenge1_experiencia_conversacional_furia

2. Instale as dependências

Certifique-se de ter o Node.js instalado na sua máquina.

Sempre exibir os detalhes

npm install

3. Configurar as chaves de API

Para rodar o projeto, você precisará obter algumas chaves e configurar as variáveis de ambiente. Siga os passos abaixo:

Chaves do Google (AUTH_GOOGLE_ID e AUTH_GOOGLE_SECRET):

Acesse o Google Cloud Console.

Crie um projeto e vá em APIs e serviços → Credenciais.

Crie um ID do Cliente OAuth e copie o ID do Cliente e o Segredo do Cliente.

Adicione essas chaves no seu .env:

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

Chave do NextAuth (AUTH_SECRET):

npx auth secret

Adicione no seu .env:

AUTH_SECRET=your_nextauth_secret

Chave da OpenRouter (OPENROUTER_API_KEY):

Crie uma conta na OpenRouter e obtenha sua chave de API.

Adicione no seu .env:

OPENROUTER_API_KEY=your_openrouter_api_key

Exemplo do .env:

AUTH_SECRET=your_nextauth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
OPENROUTER_API_KEY=your_openrouter_api_key

4. Inicie o servidor

Sempre exibir os detalhes

npm run dev

O projeto estará disponível em http://localhost:3000.
Exemplos de Uso para testar 

    Consultar jogadores:

        Envie a mensagem: /jogadores

        Retorno: "Lista de jogadores da FURIA: FalleN, yuurih, KSCERATO, skullz, chelo."

    Próxima partida:

        Envie a mensagem: /prox-partida

        Retorno: "Próxima partida: FURIA vs MIBR, 28/04/2025, 19:00 (horário de Brasília)."

    Estatísticas recentes:

        Envie a mensagem: /estatisticas

        Retorno: "Último jogo: FURIA 2-0 Liquid, KSCERATO com 25 kills."

    Saudações:

        Experimente dizer "oi", "olá", "e aí" e receba respostas amigáveis.

    Autenticação via Google:

        Clique no botão "Sign in with Google" na interface para autenticar-se e acessar áreas protegidas.

Estrutura do Projeto

    app/actions/handle-auth.ts: Lógica para manipulação da autenticação.

    app/api/auth/[...nextauth].ts: Configuração da autenticação utilizando Auth.js.

    app/api/chat/route.ts: Lógica principal do endpoint de chat.

    app/chatbot/components/commands/chat-ui.tsx: Componente da interface de chat.

    app/components: Componentes gerais do projeto.

    app/lib/auth.ts: Funções e lógicas relacionadas à autenticação.

    app/lib/utils.ts: Funções utilitárias gerais.

    app/login/components: Componentes relacionados à tela de login.

    profile: Diretório relacionado ao perfil do usuário.

    /components/ui: Componentes do shadcn

    /data/furia-data.json: Arquivo para alimentar a IA

