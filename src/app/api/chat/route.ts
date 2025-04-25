import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      console.error('Message is required');
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error('OpenAI API key is missing!');
      return NextResponse.json({ message: 'OpenAI API key is missing' }, { status: 500 });
    }

    console.log('Request received:', message);

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded: Too many requests (Error 429)');
        return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
      }
      
      console.error(`OpenAI API error: ${response.statusText} (status: ${response.status})`);
      return NextResponse.json({ message: 'Error communicating with OpenAI API' }, { status: response.status });
    }

    const data = await response.json();

    console.log('OpenAI response:', data);

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error during OpenAI request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
