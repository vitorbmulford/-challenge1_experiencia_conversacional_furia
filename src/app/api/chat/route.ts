import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      console.error('OpenAI API key is missing!');
      return res.status(500).json({ message: 'OpenAI API key is missing' });
    }

    console.log('Request received:', message);

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Ou outro modelo conforme necessário
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.statusText}`);
      return res.status(response.status).json({ message: 'Error communicating with OpenAI API' });
    }

    const data = await response.json();
    
    console.log('OpenAI response:', data);

    return res.status(200).json(data);

  } catch (error) {
    console.error('Error during OpenAI request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
