import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from '../config/config.js';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const extractJsonFromResponse = (response) => {
  const jsonString = response.replace(/```json/g, "").replace(/```/g, "").trim();
  return jsonString;
};

export const identifyTaskDetails = async (message) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  const prompt = `
  Extraia os detalhes da tarefa desta mensagem. Forneça uma resposta em JSON com:
  - title: Um título conciso e descritivo (máximo de 20 caracteres)
  - description: Uma descrição breve e acionável, sucinto mas passando a ideia da task, seguindo boas práticas de criação de tarefas em boards, incluindo:
    - O que deve ser feito
    - Objetivo esperado
    - Passos principais, se aplicável
  - project: Nome do projeto que mais se aproxima (se identificável)
  
  Exemplo de entrada: "Criar uma nova página inicial com design moderno"
  
  Exemplo de saída: {
    "title":"Design Página Inicial",
    "description":"Desenvolver um design moderno para a página inicial do site. Deve incluir melhorias na experiência do usuário e layout responsivo. Entregar o protótipo final no Figma.",
    "project":"Website"
  }
`;

  try {
    const result = await model.generateContent(prompt + message);
    const response = await result.response;
    const text = response.text();
    const jsonString = extractJsonFromResponse(text);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Gemini AI processing error:', error);
    return null;
  }
};
