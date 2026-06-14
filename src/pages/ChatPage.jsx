import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendMessageToAI } from "../services/aiService";
import { calculateProjectEstimation } from "../services/estimationService";
import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";

function ChatPage() {
  const projectId = "project_1";

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const [projectState, setProjectState] = useState({
    active: false,
    done: false,
    data: {
      actors: [],
      inputs: 0,
      outputs: 0,
      useCases: 0,
      files: 0,
    },
  });

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I am your Software Estimation Assistant.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveMessageToFirebase = async (sender, text) => {
    try {
      await addDoc(collection(db, "projects", projectId, "messages"), {
        sender,
        text,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isProjectIntent = (text) => {
    const keywords = [
      "project",
      "system",
      "platform",
      "app",
      "website",
      "مشروع",
      "منصة",
      "تطبيق",
      "نظام",
      "موقع",
    ];

    return keywords.some((k) => text.toLowerCase().includes(k.toLowerCase()));
  };
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    const userMessage = {
      sender: "user",
      text: userText,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const isProject = isProjectIntent(userText);

    if (isProject && !projectState.active) {
      setProjectState((prev) => ({ ...prev, active: true }));
    }

    try {
      const aiResponse = await sendMessageToAI(updatedMessages, projectState);
      const aiText = aiResponse.choices[0].message.content;

      let parsed = null;

      try {
        parsed = JSON.parse(aiText);
      } catch {
        parsed = null;
      }

      if (!parsed) {
        setMessages((prev) => [...prev, { sender: "bot", text: aiText }]);
        setLoading(false);
        return;
      }

      if (parsed.projectData) {
        setProjectState((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            ...parsed.projectData,
          },
        }));
      }

      if (parsed.done) {
        const result = calculateProjectEstimation(parsed.projectData);

        const projectName = parsed.projectMeta?.name || "Software Project";

        const projectDescription =
          parsed.projectMeta?.description || "No description provided.";

        const finalMessage = `
📊 FINAL ESTIMATION

📌 Project: ${projectName}

📝 Description: ${projectDescription}

📌 FP: ${result.fp}
📌 UCP: ${result.ucp}

⏱ Effort: ${result.effortHours} Hours
💰 Cost: $${result.cost}
`;

        await setDoc(doc(db, "projects", projectId), {
          projectData: parsed.projectData,
          projectMeta: parsed.projectMeta || {
            name: "Software Project",
            description: "No description provided",
          },
          result,
          createdAt: new Date(),
        });

        await saveMessageToFirebase("bot", finalMessage);

        setMessages((prev) => [...prev, { sender: "bot", text: finalMessage }]);

        setProjectState((prev) => ({
          ...prev,
          active: false,
          done: true,
        }));

        setLoading(false);
        return;
      }

      const botReply = parsed.reply;

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);

      await saveMessageToFirebase("user", userText);
      await saveMessageToFirebase("bot", botReply);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error connecting to AI",
        },
      ]);

      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4">
      <div className="w-full max-w-3xl h-[92vh] flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">AI Estimation Assistant</h1>
            <p className="text-xs text-gray-400">
              Fast Software Project Analyzer
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-3 py-1.5 text-xs rounded-lg bg-green-600 hover:bg-green-500 transition"
            >
              Dashboard
            </button>

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">online</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-md transition-all duration-200 hover:scale-[1.01] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white/10 text-gray-100 border border-white/10 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-sm text-gray-300 flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-sm font-medium disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
