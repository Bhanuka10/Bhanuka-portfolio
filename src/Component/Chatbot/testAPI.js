// Quick API test for debugging
import { GoogleGenerativeAI } from "@google/generative-ai";

const testAPI = async () => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("API Key loaded:", apiKey ? "✓ Yes" : "✗ No");
    
    if (!apiKey) {
      console.error("❌ No API key found in environment variables");
      return;
    }
    
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Say hello" }] }],
    });
    
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ API Test Successful:", text);
  } catch (error) {
    console.error("❌ API Test Failed:", error);
  }
};

// Uncomment the line below to test the API when this file is imported
// testAPI();

export default testAPI;