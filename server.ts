import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Content Assistant API endpoint powered by Gemini
  app.post("/api/gemini/generate-ideas", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server.",
        });
      }

      const { topic, contentType, targetAudience, language } = req.body;

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are an expert Xiaohongshu (小红书 / RED) viral content strategist and visual director.
Generate creative note titles, key content highlights, visual cover suggestions, and relevant viral hashtags for a creator portfolio based on these inputs:

Topic / Brand Focus: ${topic || "Lifestyle & Visual Design"}
Content Type: ${contentType || "Exploration & Product Review"}
Target Audience: ${targetAudience || "Gen Z & Young Creatives"}
Language: ${language === "en" ? "English" : "Chinese (中文)"}

Return your response strictly in valid JSON format with the following keys:
{
  "titles": ["Title 1 with high CTR hooks & emojis", "Title 2", "Title 3"],
  "coverConcept": "Detailed aesthetic visual concept for Xiaohongshu cover image",
  "contentOutline": ["Bullet point 1", "Bullet point 2", "Bullet point 3", "Bullet point 4"],
  "viralHashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "collaborationTip": "A tip for brand pitching or engagement optimization"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        error: "Failed to generate AI ideas",
        message: err.message || String(err),
      });
    }
  });

  // Vite development middleware vs Static Production serving
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
