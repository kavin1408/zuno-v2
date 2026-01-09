export type AIModel = 'meta-llama/llama-3.1-70b-instruct' | string;

export class AIClient {
    private apiKey: string;
    private baseUrl: string = "https://openrouter.ai/api/v1/chat/completions";
    private defaultModel: AIModel = "meta-llama/llama-3.1-70b-instruct";

    constructor(apiKey?: string, model?: AIModel) {
        this.apiKey = apiKey || process.env.OPENROUTER_API_KEY || '';
        if (model) this.defaultModel = model;
    }

    async call(messages: unknown[], model?: AIModel) {
        if (!this.apiKey) {
            console.warn("AI Service: API Key is missing.");
            return null;
        }

        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://zuno.app",
                    "X-Title": "Zuno Mentor v2"
                },
                body: JSON.stringify({
                    model: model || this.defaultModel,
                    messages: messages
                })
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`AI Service Error: ${error}`);
            }

            const result = await response.json();
            const content = result.choices[0]?.message?.content;
            console.log("AI Response received");
            return content;
        } catch (error) {
            console.error("AI Service Request Failed:", error);
            return null;
        }
    }

    async generateRoadmap(params: {
        subject: string;
        level: string;
        goal: string;
        dailyTimeMin: number;
        targetDate: string;
        style: string;
    }) {
        const prompt = `
    Create a detailed, professional learning roadmap for a student.
    
    Student Profile:
    - Subject: ${params.subject}
    - Current Level: ${params.level}
    - Target Goal: ${params.goal}
    - Daily Commitment: ${params.dailyTimeMin} minutes
    - Target Date: ${params.targetDate}
    - Learning Style Preference: ${params.style}
    
    Roadmap Requirements:
    1. Structure: Phases -> Modules -> Tasks.
    2. Logic: Sequence tasks from absolute basics to advanced topics.
    3. Content: Each task must have a title, description, estimated_time, and a suggested 'output_deliverable'.
    
    RESPOND ONLY IN PURE JSON:
    {
      "title": "Your Personalized ${params.subject} Roadmap",
      "phases": [
        {
          "name": "Phase Name",
          "modules": [
            {
              "name": "Module Name",
              "tasks": [
                {
                  "title": "Task Title",
                  "description": "Specific learning objectives",
                  "estimated_time": 45,
                  "output_deliverable": "What the student should finish",
                  "resource_type": "${params.style}"
                }
              ]
            }
          ]
        }
      ]
    }
    `;

        const messages = [
            { role: "system", content: "You are Zuno, an elite AI student mentor and curriculum designer." },
            { role: "user", content: prompt }
        ];

        const response = await this.call(messages);
        return this.extractJson(response);
    }

    private extractJson(text: string | null) {
        if (!text) return null;
        try {
            // Basic JSON extraction
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}') + 1;
            if (jsonStart === -1 || jsonEnd === -1) return null;
            return JSON.parse(text.slice(jsonStart, jsonEnd));
        } catch (e) {
            console.error("JSON Parse Error:", e);
            return null;
        }
    }
}

export const ai = new AIClient();
