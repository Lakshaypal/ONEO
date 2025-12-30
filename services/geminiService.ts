
import { GoogleGenAI } from "@google/genai";

export async function analyzePolicyScenario(prompt: string) {
  try {
    // Re-initialize the client inside the function to ensure up-to-date environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex text tasks such as legal and policy analysis
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior public policy expert specialized in Indian constitutional law and administrative reforms. Analyze the provided election scenario objectively, citing potential benefits and risks of One Nation One Election (ONOE). Be concise and provide actionable insights for a GoI dashboard.",
        temperature: 0.7,
      },
    });
    // Extract generated text from the response using the .text property
    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating AI analysis. Please check your connectivity or API configuration.";
  }
}
