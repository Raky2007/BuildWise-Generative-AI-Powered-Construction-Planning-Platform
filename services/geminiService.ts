
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectInfo, FeasibilityReport } from "../types";

/**
 * Utility function to handle API retries with exponential backoff.
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 2, initialDelay = 2000): Promise<T> {
  let lastError: any;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out after 25 seconds")), 25000)
      );
      
      return await Promise.race([fn(), timeoutPromise]) as T;
    } catch (error: any) {
      lastError = error;
      const errorStr = JSON.stringify(error);
      const message = error?.message || "";
      
      const isRateLimit = message.includes('429') || errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED');
      const isServerError = message.includes('500') || message.includes('503') || errorStr.includes('500');
      
      if ((isRateLimit || isServerError) && i < maxRetries) {
        const delay = initialDelay * Math.pow(2, i) + (Math.random() * 500);
        console.warn(`[Build AI] Attempt ${i + 1} failed. Retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export const generateFeasibilityReport = async (project: ProjectInfo): Promise<FeasibilityReport> => {
  return withRetry(async () => {
    // Create new GoogleGenAI instance right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Generate a feasibility study for:
      - Project: ${project.name}
      - Sector: ${project.type}
      - Specs: ${project.area}sqft, ${project.floors} floors, ${project.timeline} months.
      - Budget: ₹${project.budget}
      - Location: ${project.location}

      Return valid JSON. Be realistic about Indian construction costs and GST (18%).`;

    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex reasoning tasks
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a Senior Construction Consultant specializing in the Indian market. Generate high-precision feasibility reports in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            detailedCost: {
              type: Type.OBJECT,
              properties: {
                materials: { type: Type.NUMBER },
                labor: { type: Type.NUMBER },
                overhead: { type: Type.NUMBER },
                contingency: { type: Type.NUMBER }
              },
              required: ["materials", "labor", "overhead", "contingency"]
            },
            timelineWeeks: { type: Type.NUMBER },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  startWeek: { type: Type.NUMBER },
                  duration: { type: Type.NUMBER },
                  dependencies: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["phase", "startWeek", "duration"]
              }
            },
            risks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  level: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["category", "level"]
              }
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "summary", "detailedCost", "timelineWeeks", "phases"]
        }
      }
    });

    // Use .text property directly as per guidelines
    const text = response.text;
    if (!text) throw new Error("AI returned an empty response.");
    return JSON.parse(text);
  });
};

export const predictDynamicRisks = async (project: ProjectInfo, situation: string): Promise<string> => {
  return withRetry(async () => {
    // Create new GoogleGenAI instance right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for advanced risk impact reasoning
      model: "gemini-3-pro-preview",
      contents: `Construction Risk Audit for ${project.name} in ${project.location}. Issue: "${situation}". Analyze impact.`,
      config: {
        systemInstruction: "You are a Risk Management Expert in Construction. Provide concise, high-impact risk assessments."
      }
    });
    return response.text || "Analysis unavailable.";
  });
};
