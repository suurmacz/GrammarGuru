
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API Key is automatically provided via process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async translateToPolish(text: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following English grammar analysis into clear, professional Polish. Keep the structure identical and preserve English examples in their original form. Text to translate: "${text}"`,
    });
    return response.text || "Translation failed.";
  }

  async analyzeTranslation(originalPl: string, correctEn: string, userEn: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert English teacher. 
      Polish sentence: "${originalPl}"
      Correct pattern: "${correctEn}"
      User's translation: "${userEn}"
      
      Task:
      1. Analyze the user's translation.
      2. Point out grammatical, spelling, or word order mistakes.
      3. Explain the relevant grammar rules.
      4. Provide 2-3 natural alternative ways to say this.
      
      IMPORTANT: Response MUST be entirely in English. Do not use Markdown characters like # or *.`,
    });
    return response.text || "Analysis failed.";
  }

  async generateChatResponse(message: string, history: {role: string, text: string}[]): Promise<string> {
    const chat = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })).concat([{ role: 'user', parts: [{ text: message }] }]),
      config: {
        systemInstruction: `Jesteś ekspertem gramatyki angielskiej dla poziomu B1/B2/C1. Twoim celem jest pomoc polskim uczniom. 
        1. Zawsze odpowiadaj po angielsku, ale dodaj tłumaczenie na polski najważniejszych części (szczególnie reguł).
        2. Analizuj błędy gramatyczne użytkownika.
        3. Podawaj krótkie, konkretne reguły z przykładami.
        4. Na końcu zaproponuj 3 zdania do samodzielnego przećwiczenia.
        5. Bądź motywujący i precyzyjny.`,
      }
    });
    return chat.text || "I'm sorry, I couldn't process that.";
  }

  async generateSentence(): Promise<{ pl: string; en: string }> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate one challenging Polish sentence for English grammar practice (B1-B2 level). Focus on tenses, conditionals, passives, or complex structures. Provide both the Polish sentence and its correct English translation. Response format: JSON {"pl": "polish sentence", "en": "english translation"}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pl: { type: Type.STRING },
            en: { type: Type.STRING }
          },
          required: ["pl", "en"]
        }
      }
    });
    try {
      return JSON.parse(response.text || '{"pl": "Nie udało się wygenerować zdania.", "en": "Failed to generate sentence."}');
    } catch {
      return { pl: "Nie udało się wygenerować zdania.", en: "Failed to generate sentence." };
    }
  }
}
