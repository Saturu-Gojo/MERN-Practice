const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();

async function generateCaption(base64ImageFile){
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config:{
      systemInstruction : `
      Your caption should be short and concise.
      use hastag and emojis in the caption.
      Generate caption in tapori language.
      Create aesthetic caption.
      The caption should be in dark humor.
      `
    }
  });
  return response.text;
}

module.exports = generateCaption;
