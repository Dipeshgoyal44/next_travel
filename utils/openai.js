const { OpenAIApi, Configuration } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const ask = async (conversation) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversation,
  });
  return completion.data.choices[0].message.content;
};

module.exports = { ask };