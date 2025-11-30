
import { GoogleGenAI } from "@google/genai";

// NOTE: in a real app, strict error handling would be here.
// We assume process.env.API_KEY is available.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSiteDescription = async (siteName: string, location: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Using dummy description.";
  }

  try {
    const prompt = `Write a captivating, high-end tourism description for a site in Jordan named "${siteName}" located in "${location}". The description should be in Arabic, suitable for a luxury travel website. Keep it under 50 words. Focus on history and beauty.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "لم يتم إنشاء وصف.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ أثناء توليد الوصف. يرجى المحاولة لاحقاً.";
  }
};

export const summarizeText = async (text: string): Promise<string> => {
   if (!process.env.API_KEY) return "AI Summary requires API Key.";
   
   try {
     const prompt = `Summarize the following text into 3 bullet points in the same language as the text (Arabic or English). Keep it concise and engaging for a tourist:\n\n${text}`;
     
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
     });
     
     return response.text || "No summary generated.";
   } catch (error) {
     return "Error generating summary.";
   }
}
