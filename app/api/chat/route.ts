import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { auth } from '@clerk/nextjs/server';

export const runtime = 'edge';

interface MessagePart {
  type: string;
  text?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content?: string;
  parts?: MessagePart[];
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages } = await req.json();

  // Manual sanitization to fix AI_InvalidPromptError
  // We strip out internal SDK parts like 'step-start' and just keep text
  const coreMessages = messages.map((m: ChatMessage) => {
    let content = m.content;

    // If content is empty but there are parts (e.g. from a tool use or reasoning step),
    // extract the text parts
    if (!content && m.parts) {
      content = m.parts
        .filter((p: MessagePart) => p.type === 'text')
        .map((p: MessagePart) => p.text || '')
        .join('');
    }

    return {
      role: m.role,
      content: content || '',
    };
  });

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: 'system',
        content: `You are Coach Josh's AI assistant. Provide concise, actionable boxing advice in under 150 words. Be direct like a real boxing coach.`
      },
      ...coreMessages.slice(-5),
    ],
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}

