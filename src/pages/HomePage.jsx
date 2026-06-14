import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center text-white p-6">
      <div className="w-full max-w-2xl text-center">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-3">
            AI Software Estimation System
          </h1>

          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Estimate your software projects using Function Point & Use Case
            Point Analysis powered by AI. Get fast, accurate, and structured
            cost & effort predictions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-xs text-gray-300">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              ⚡ Fast Estimation
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              📊 Academic Models
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              🤖 AI Interview
            </div>
          </div>

          <button
            onClick={() => navigate("/chat")}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-sm font-semibold shadow-lg"
          >
            Start Estimation →
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-6">
          Built with React + AI + Function Point Analysis
        </p>
      </div>
    </div>
  );
}

export default HomePage;
