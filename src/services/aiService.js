import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

export const sendMessageToAI = async (messages, state) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-v4-flash",

      temperature: 0.3,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: `
You are a smart AI chatbot and Software Estimation Assistant.

========================
NORMAL CHAT MODE
========================

- If user asks normal questions:
  answer naturally.
- Arabic -> Arabic
- English -> English

========================
PROJECT INTERVIEW MODE
========================

If the user talks about a software project:

You MUST:
- Ask ONE question only each message
- Continue the interview step-by-step
- NEVER restart interview
- NEVER repeat old questions
- Gradually collect project data

You need to collect:

- actors
- inputs
- outputs
- use cases
- files
- complexity factors:
  - security level (0-5)
  - performance level (0-5)
  - scalability level (0-5)

IMPORTANT:

Always return JSON ONLY in this format:

{
  "reply": "...",
  "done": false,
  "projectMeta": {
    "name": "",
    "description": ""
  },
  "projectData": {
    "actors": [],
    "inputs": 0,
    "outputs": 0,
    "useCases": 0,
    "files": 0,
    "securityLevel": 0,
    "performanceLevel": 0,
    "scalabilityLevel": 0
  }
}

When user says:
- انتهيت
- هذا كل شيء
- finished

AND enough data exists:

Return:

{
  "reply": "Project interview completed",

  "done": true,

  "projectData": {
    "actors": [],
    "inputs": number,
    "outputs": number,
    "useCases": number,
    "files": number,

    "securityLevel": number,
    "performanceLevel": number,
    "scalabilityLevel": number
  }
}

IMPORTANT:
- NEVER reset old projectData
- Update existing data gradually
- Return JSON ONLY
`,
        },

        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),

        {
          role: "system",
          content: `
Current Project State:
${JSON.stringify(state || {})}
`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
