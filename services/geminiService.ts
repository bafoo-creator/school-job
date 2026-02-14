import { GoogleGenAI, Type } from "@google/genai";

// Access the API Key injected by Vite during build
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates an optimized job description for a school.
 */
export const generateJobDescription = async (title: string, school: string, requirements: string) => {
  if (!ai) return "Configuration de l'IA manquante (Clé API non trouvée).";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère une annonce de recrutement professionnelle pour une école privée au Maroc. 
      Titre du poste: ${title}
      Nom de l'école: ${school}
      Exigences: ${requirements}
      Le ton doit être formel, encourageant et mettre en valeur l'excellence éducative. 
      Format: Markdown.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erreur lors de la génération de l'annonce.";
  }
};

/**
 * Suggests smart form fields for a job application based on the job title.
 */
export const suggestFormFields = async (jobTitle: string) => {
  if (!ai) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `En tant qu'expert en recrutement scolaire, suggère 3 questions spécifiques pertinentes pour un formulaire de candidature pour le poste de "${jobTitle}". 
      Retourne uniquement un tableau JSON d'objets avec les propriétés: label (la question), type (choisir entre 'text', 'textarea', 'checkbox'), et required (boolean).`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

/**
 * Generates career advice for a teacher based on their subject.
 */
export const getTeacherAdvice = async (subject: string) => {
  if (!ai) return "Consultez nos guides carrière pour plus d'informations.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Donne 3 conseils rapides et percutants pour un enseignant de ${subject} au Maroc qui cherche à se faire recruter par les meilleures écoles privées. 
      Réponds sous forme de liste à puces en français.`,
    });
    return response.text;
  } catch (error) {
    return "Consultez nos guides carrière pour plus d'informations.";
  }
};