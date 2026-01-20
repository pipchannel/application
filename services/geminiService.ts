
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, FoodType } from "../types";

export const getRecipeSuggestions = async (
  ingredients: string[],
  timeLimit: number,
  foodType: FoodType,
  servings: number
): Promise<Recipe[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const typeContext = foodType === 'main_course' ? 'غذاهای اصلی و خوراک‌ها' : 'کیک، شیرینی و دسرها';

  const prompt = `من در دسته‌بندی "${typeContext}" به دنبال دستور پخت هستم.
  مواد اولیه موجود: ${ingredients.join(", ")}. 
  زمان در دسترس: حداکثر ${timeLimit} دقیقه.
  تعداد نفرات مصرف‌کننده: ${servings} نفر.
  لطفاً ۳ پیشنهاد دقیق و حرفه‌ای به زبان فارسی ارائه بده.
  بسیار مهم: مقدار دقیق هر ماده اولیه (مثلاً گرم، پیمانه یا عدد) را دقیقاً متناسب با ${servings} نفر در لیست مواد اولیه ذکر کن.
  فقط از مواد لیست شده استفاده کن (ادویه، نمک و آب فرض می‌شوند موجود هستند).
  خروجی حتماً باید یک آرایه JSON با فیلدهای مشخص شده باشد.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              cookingTime: { type: Type.NUMBER },
              difficulty: { type: Type.STRING, enum: ["آسان", "متوسط", "سخت"] },
            },
            required: ["title", "description", "ingredients", "steps", "cookingTime", "difficulty"],
          },
        },
      },
    });

    return JSON.parse(response.text.trim()) as Recipe[];
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
