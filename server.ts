import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let aiClient: GoogleGenAI | null = null;

  function getGeminiClient(): GoogleGenAI {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined. Please configure it in your Secrets panel.");
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // AI Diagnostic endpoint
  app.post("/api/gemini/diagnose", async (req, res) => {
    try {
      const { businessName, businessSize, industry, revenueStage, bottleneck, goals } = req.body;

      let ai;
      try {
        ai = getGeminiClient();
      } catch (e: any) {
        return res.status(400).json({
          error: "API Key Required",
          details: e.message
        });
      }

      const systemPrompt = `You are Abhijeet Suman, an elite Business Growth Consultant, Revenue Strategist, and AI Adoption Expert. You are the Founder & Director of SKARTO (skarto.cloud), based in Indore, India. You have over 10 years of experience, IIBA, PMI, and MIT certifications, and a LinkedIn following of 4,700+.
You are conducting an interactive Growth Diagnostic for a potential client. They have provided their business profile.
Analyze their inputs and generate a comprehensive, executive-level diagnostic audit and custom roadmap.
Be highly strategic, specific, authoritative, encouraging, and clear. Avoid generic business platitudes. Ground your suggestions in systems-thinking, MIT systems design standards, AI/automation leverage, and practical, scalable B2B or B2C sales architecture.`;

      const prompt = `Potential Client Business Profile:
- Business Name/Context: ${businessName || "Confidential"}
- Business Size: ${businessSize}
- Industry: ${industry}
- Revenue Stage: ${revenueStage}
- Core Bottleneck / Challenge: ${bottleneck}
- Primary Business Goals: ${goals}

Please provide your strategic audit and roadmap. Deliver the output in JSON format adhering strictly to the schema requested. Make sure to personalize the customQuoteFromAbhijeet specifically to their bottleneck and industry, expressing a genuine interest to collaborate with them on these challenges.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: {
                type: Type.STRING,
                description: "High-level summary of the business's situation and potential. Maximum 3-4 concise, powerful sentences.",
              },
              bottleneckAnalysis: {
                type: Type.OBJECT,
                properties: {
                  coreRootCause: { type: Type.STRING, description: "The deep, systemic root cause behind their stated bottleneck (from a systems-thinking perspective)." },
                  underlyingSymptom: { type: Type.STRING, description: "The immediate symptoms they are feeling and why they occur." },
                  architecturalMistake: { type: Type.STRING, description: "The common architectural or structural mistake most businesses in their stage make regarding this bottleneck." },
                },
                required: ["coreRootCause", "underlyingSymptom", "architecturalMistake"],
              },
              aiLeverageOpportunities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "Name of the AI or automation use-case." },
                    description: { type: Type.STRING, description: "How this specific leverage point operates and why it saves time/cost or grows revenue." },
                    leverageLevel: { type: Type.STRING, description: "High | Medium | Low" },
                    timeToImplement: { type: Type.STRING, description: "e.g., '1-2 weeks', '3-4 weeks'" },
                    estimatedImpact: { type: Type.STRING, description: "Expected improvement, e.g., '35% manual time savings', '2x leads pipeline density'" },
                  },
                  required: ["title", "description", "leverageLevel", "timeToImplement", "estimatedImpact"],
                },
                description: "3 highly tailored AI and automation leverage points for their specific industry and bottleneck.",
              },
              gtmQuickWins: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    tactic: { type: Type.STRING, description: "The name of the quick win tactic." },
                    action: { type: Type.STRING, description: "Immediate action step." },
                    expectedOutcome: { type: Type.STRING, description: "What result to expect in the next 14-30 days." },
                  },
                  required: ["tactic", "action", "expectedOutcome"],
                },
                description: "2-3 immediate, actionable Go-to-Market or revenue quick wins they can execute.",
              },
              roadmap: {
                type: Type.OBJECT,
                properties: {
                  day1_30: { type: Type.STRING, description: "What to focus on in the first 30 days (Focus: Foundations & Quick Wins)." },
                  day31_60: { type: Type.STRING, description: "What to focus on in Days 31-60 (Focus: Systems Implementation & AI Integration)." },
                  day61_90: { type: Type.STRING, description: "What to focus on in Days 61-90 (Focus: Optimization, Automation, and Scaling)." },
                },
                required: ["day1_30", "day31_60", "day61_90"],
              },
              customQuoteFromAbhijeet: {
                type: Type.STRING,
                description: "A highly personalized, warm, direct quote from Abhijeet Suman commenting on their specific case, encouraging them to book a strategy call.",
              },
            },
            required: ["executiveSummary", "bottleneckAnalysis", "aiLeverageOpportunities", "gtmQuickWins", "roadmap", "customQuoteFromAbhijeet"],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("No response generated from the model.");
      }

      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("AI Diagnose error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred during diagnostics." });
    }
  });

  // Contact form queue endpoint
  app.post("/api/contact", (req, res) => {
    const { name, organization, email, phone, service, context } = req.body;
    console.log("Enquiry received:", { name, organization, email, phone, service, context });
    res.json({
      success: true,
      message: "Your enquiry has been successfully transmitted directly to Abhijeet Suman's consulting queue. A response from Abhijeet or the SKARTO team is scheduled within 24 hours.",
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
