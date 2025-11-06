import { GoogleGenAI, Modality } from "@google/genai";
import { Customization, DesignType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateImagePreview(customization: Customization): Promise<string> {
  const { fabric, clothingType, color, designType, designValue, designColor } = customization;

  if (!fabric || !clothingType) {
    throw new Error("Fabric and clothing type must be selected.");
  }
  
  try {
    if (designType === DesignType.Upload && designValue) {
      // The designValue is a pre-composited image of the design on a realistic clothing photo.
      // The AI's job is to blend the design into the fabric.
      const base64Data = designValue.split(',')[1];
      if (!base64Data) throw new Error("Invalid image data provided.");
      const mimeType = designValue.match(/data:(.*);/)?.[1] || 'image/png';

      const imagePart = { inlineData: { data: base64Data, mimeType } };
      const textPart = {
        text: `Generate a realistic, high-resolution photo by seamlessly blending the printed design into the fabric of the clothing in this image. The design should follow the natural folds, shadows, and texture of the material. Do not change the clothing, background, or the design itself; only adjust the design's appearance to make it look like it was professionally printed on the garment. Preserve the original image quality and details.`
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [imagePart, textPart] },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part && part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      } else {
        throw new Error("AI could not generate an image from the provided design.");
      }
    } else {
      // Use Imagen for text, AI, library, or no design
      let designDescription = "a plain, unprinted clothing item";
      const printColor = designColor || 'black';
      if (designType === DesignType.Text && designValue) {
          designDescription = `the text "${designValue}" in ${printColor} printed on the chest`;
      } else if ((designType === DesignType.AI || designType === DesignType.Library) && designValue) {
          designDescription = `a design of "${designValue}" in ${printColor} printed on the chest`;
      }

      const fullPrompt = `Generate a realistic, high-resolution photo of a customized clothing product based on these details:
Product type: ${clothingType}.
Fabric type: ${fabric}.
Color: ${color}.
Custom design: ${designDescription}.

Make the final image look like a real product photo taken in a professional studio.
The design should appear printed naturally on the product surface, matching the material texture and lighting.
Include realistic folds, shadows, and reflections according to the fabric and lighting.
Use a clean neutral background (white or light gray) suitable for an online store.
Style: realistic product photography, commercial lighting, fashion catalog, 4K resolution, DSLR photo quality.`;
      
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
      } else {
        throw new Error("No image was generated.");
      }
    }
  } catch (error) {
    console.error("Error generating image preview:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to generate preview. ${message}`);
  }
}