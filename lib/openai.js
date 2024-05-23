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

// New function to detect errors in code snippets
export const detectErrors = async (codeSnippet) => {
  const openai = new OpenAI({baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID});
  const messages = [
    { role: 'system', content: 'You are a code analysis tool. Identify any errors in the following code snippet.' },
    { role: 'user', content: codeSnippet }
  ];
  return await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo'
  });
};

// New function to correct errors in code snippets
export const correctErrors = async (codeSnippet) => {
  const openai = new OpenAI({baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID});
  const messages = [
    { role: 'system', content: 'You are a code correction tool. Correct any errors in the following code snippet.' },
    { role: 'user', content: codeSnippet }
  ];
  return await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo'
  });
};