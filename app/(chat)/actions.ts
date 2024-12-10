'use server';

import { type CoreUserMessage, generateText } from 'ai';
import { cookies } from 'next/headers';
import { auth } from '@/app/(auth)/auth';

import { customModel } from '@/lib/ai';
import { saveChat, saveMessages } from '@/lib/db/queries';
import { generateUUID } from '@/lib/utils';
import { welcomePrompt } from '@/lib/ai/prompts';

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('model-id', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: CoreUserMessage;
}) {
  const { text: title } = await generateText({
    model: customModel('gpt-4o-mini'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 160 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function createFirstTimeChat({ userId }: { userId: string }) {
  const id = generateUUID();
  const title = "Welcome to Sammie!";
  
  await saveChat({ id, userId, title });
  
  // Strict adherence to welcomePrompt for first-time users
  const { text: welcomeMessage } = await generateText({
    model: customModel('gpt-4o-mini'),
    system: welcomePrompt,
    prompt: welcomePrompt,
  });
  
  await saveMessages({
    messages: [{
      id: generateUUID(),
      chatId: id,
      role: 'assistant',
      content: welcomeMessage,
      createdAt: new Date()
    }]
  });

  return id;
}

export async function createNewChat() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const id = generateUUID();
  const title = "New Chat";

  await saveChat({ 
    id, 
    userId: session.user.id, 
    title 
  });

  // Simple, consistent greeting for regular new chats
  await saveMessages({
    messages: [{
      id: generateUUID(),
      chatId: id,
      role: 'assistant',
      content: "Hi! How can I help you today!?",
      createdAt: new Date()
    }]
  });

  return id;
}

export async function useTool() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const id = generateUUID();
  const title = "New Tool Usage";

  await saveChat({ 
    id, 
    userId: session.user.id, 
    title 
  });

  // Simple, consistent greeting for regular new chats
  await saveMessages({
    messages: [{
      id: generateUUID(),
      chatId: id,
      role: 'assistant',
      content: "test use tool!?",
      createdAt: new Date()
    }]
  });

  return id;
}

export async function handleUserNameSubmission(name: string, chatId: string) {
  const { text: responseMessage } = await generateText({
    model: customModel('gpt-4o-mini'),
    system: welcomePrompt,
    prompt: welcomePrompt,
  });

  await saveMessages({
    messages: [{
      id: generateUUID(),
      chatId,
      role: 'assistant',
      content: responseMessage,
      createdAt: new Date()
    }]
  });
}