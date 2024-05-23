/*
Use like this:
import { create } from 'lib/openai';

const res = await create({messages: [{role: 'system', content: 'What is the capital of France?'}], model: 'gpt-3.5-turbo'}})
console.log(res.choices[0].message.content);
*/


import OpenAI from 'openai';

export const create = async ({messages, model, stream}) => {
  const openai = new OpenAI({baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID});
  return await openai.chat.completions.create({
    messages,
    model,
    stream
  });
};

// New function to handle multimodal inputs and generate code snippets
export const generateCodeSnippet = async ({messages, model}) => {
  const openai = new OpenAI({baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID});
  return await openai.completions.create({
    messages,
    model,
    max_tokens: 150, // Adjust the token limit as needed
    temperature: 0.7, // Adjust the temperature as needed
  });
};


