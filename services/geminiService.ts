
import { GoogleGenAI } from "@google/genai";

export async function analyzePolicyScenario(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior public administration consultant. Your task is to explain complex election synchronization impacts in extremely simple, plain language for government officials (Clerks, Section Officers). DO NOT use technical jargon. Use clear headings. Explain 'What this means' and 'Why it matters' for daily office work. Focus on workload reduction and administrative ease.",
        temperature: 0.7,
      },
    });
    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating analysis. Please ensure you have an active network connection.";
  }
}
