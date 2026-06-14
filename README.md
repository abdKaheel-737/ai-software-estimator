# 🤖 AI Software Project Estimator

An intelligent web application that leverages Artificial Intelligence to estimate software project cost and development effort through an interactive chat experience.

Instead of manually filling estimation forms, users communicate with an AI assistant that conducts a structured interview, gathers project requirements, and generates accurate estimations using **Function Point Analysis (FPA)** and **Use Case Point (UCP)** methodologies.

---

## 🚀 Features

- 🤖 AI-powered chatbot for software project interviews.
- 💬 Conversational requirement gathering through natural language.
- 📊 Automatic calculation of Function Points (FP) and Use Case Points (UCP).
- 💰 Estimation of development effort and project cost.
- 📝 Collection of project metadata such as name and description.
- 👥 Identification of actors, inputs, outputs, use cases, and files.
- ⚙️ Consideration of technical complexity factors including security, performance, and scalability.
- ☁️ Persistent storage of project information and chat history using Firebase Firestore.
- 📈 Dashboard displaying estimation results and project details.
- 📄 Exportable report that can be printed or saved as a PDF.
- 📱 Modern responsive user interface built with React and Tailwind CSS.

---

## 🛠️ Technologies Used

- React
- Vite
- Tailwind CSS
- React Router DOM
- Firebase Firestore
- Axios
- OpenRouter AI API
- React Icons
- jsPDF
- html2canvas

---

## 🧠 How It Works

1. The user starts a conversation with the AI assistant.
2. The assistant asks a sequence of questions about the software project.
3. Information such as actors, inputs, outputs, use cases, files, security, performance, and scalability is collected progressively.
4. The gathered data is processed using academic estimation techniques including Function Point Analysis and Use Case Point Analysis.
5. The system calculates:
   - Function Points (FP)
   - Use Case Points (UCP)
   - Estimated development effort
   - Estimated project cost

6. All project data and results are stored in Firebase and displayed in a dedicated dashboard.
7. The final report can be printed or exported as a PDF.

---

## 📊 Estimation Output

The application generates:

- Function Point (FP)
- Use Case Point (UCP)
- Estimated Development Effort
- Estimated Project Cost
- Technical Complexity Factor (TCF)
- Environmental Complexity Factor (ECF)

---

## 📂 Project Structure

- **Home Page** – Introduction and entry point.
- **AI Chat Interface** – Interactive project interview.
- **Dashboard** – Displays project details and estimation results.
- **Firebase Integration** – Stores conversations and calculated estimations.
- **PDF Report** – Allows exporting the generated estimation report.

---

## 🎯 Purpose

The goal of this project is to demonstrate how Artificial Intelligence can simplify software project planning by automating requirement gathering and combining it with established software estimation models to produce fast and structured cost predictions.

---

## ⚠️ Note

API keys and sensitive credentials should be stored in environment variables (`.env`) and must not be committed to the repository.

---

## 📄 License

This project was developed for educational and portfolio purposes.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
