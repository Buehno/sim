
import { GoogleGenAI } from "@google/genai";

export const generateTaxResponse = async (prompt: string, history: any[] = []) => {
  // Verificação segura da chave de API para evitar ReferenceError em navegadores
  let apiKey = "";
  try {
    apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : "";
  } catch (e) {
    console.warn("Ambiente process.env não detectado.");
  }

  if (!apiKey) {
    console.error("API_KEY não encontrada no ambiente.");
    return "Erro de configuração: A chave de API não foi detectada no ambiente. Verifique as variáveis de sistema.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    Você é um Assistente Tributário Brasileiro especialista. 
    Seu objetivo é analisar tributos nacionais (ICMS, ISS, PIS, COFINS, IPI, CSLL, IRPJ, Reforma Tributária).
    Sempre cite fontes legais (leis, decretos, instruções normativas).
    Use Markdown para formatação. 
    Destaque códigos de leis em blocos de código.
    Categorize sua resposta com tags no final (ex: [ICMS], [Reforma Tributária]).
    Seja formal, mas acessível.
    Baseie-se na legislação vigente e na Reforma Tributária (EC 132/2023, LC 207/2024).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;
    return text || "O assistente não conseguiu gerar uma resposta no momento.";
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua consulta tributária. Por favor, tente novamente em alguns instantes.";
  }
};

export const analyzeDocument = async (fileName: string, content: string) => {
  const prompt = `Analise o seguinte documento tributário/fiscal "${fileName}":\n\n${content}\n\nForneça um resumo dos impostos identificados, possíveis inconsistências e sugestões de otimização fiscal.`;
  return await generateTaxResponse(prompt);
};
