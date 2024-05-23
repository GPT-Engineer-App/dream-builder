import OpenAI from 'openai';

/**
 * Generates semi-synthetic data by augmenting real data with synthetic variations.
 * @param {Array} realData - The array of real data samples.
 * @param {number} numSyntheticSamples - The number of synthetic samples to generate.
 * @returns {Array} - The array containing both real and synthetic data samples.
 */
export const generateSemiSyntheticData = async (realData, numSyntheticSamples) => {
  const openai = new OpenAI({ baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID });
  const syntheticData = [];

  for (const dataSample of realData) {
    const messages = [
      { role: 'system', content: 'You are a data augmentation tool. Generate synthetic variations of the following data sample.' },
      { role: 'user', content: JSON.stringify(dataSample) }
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    });

    const syntheticSample = JSON.parse(response.choices[0].message.content);
    syntheticData.push(syntheticSample);
  }

  return [...realData, ...syntheticData];
};

/**
 * Fine-tunes the model using the provided semi-synthetic data.
 * @param {Array} semiSyntheticData - The array of semi-synthetic data samples.
 * @returns {Object} - The response from the fine-tuning process.
 */
export const fineTuneModel = async (semiSyntheticData) => {
  const openai = new OpenAI({ baseURL: process.env.baseURL, dangerouslyAllowBrowser: true, apiKey: process.env.PROJECT_ID });

  const response = await openai.fineTunes.create({
    training_file: semiSyntheticData,
    model: 'gpt-3.5-turbo',
  });

  return response;
};