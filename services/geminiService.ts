
import { GoogleGenAI } from "@google/genai";

export const getPlantConsultation = async (userInput: string, cartItems: string[], imageBase64?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const parts: any[] = [{ text: userInput }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.split(',')[1] // Remove the data:image/jpeg;base64, prefix
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: `You are 'AquaBot', a world-class aquatic plant expert for AquaCafe. 
        Your goal is to help users select and care for aquatic plants. 
        Current user cart: [${cartItems.join(', ')}].
        AquaCafe specializes in Anubias, Ferns, Crypts, and decorative plants.
        If an image is provided, analyze the plant species, its health, and provide specific care instructions or identify issues like algae or nutrient deficiencies.
        Use Google Search for up-to-date species data.
        Keep responses concise and professional.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      }
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "I'm having a little trouble seeing that plant or connecting to my database. Could you describe it or try again?",
      sources: []
    };
  }
};
