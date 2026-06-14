import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const labels = {
    fp: "نقاط الوظيفة (FP)",
    ucp: "نقاط حالات الاستخدام (UCP)",
    effortHours: "الجهد التقريبي (بالساعات)",
    cost: "التكلفة التقديرية ($)",
    tcf: "عامل التعقيد التقني (TCF)",
    ecf: "عامل البيئة (ECF)",
  };

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "projects", "project_1");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setData(snap.data());
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-slate-950">
        Loading dashboard...
      </div>
    );
  }

  const { projectData, result, projectMeta } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto print-area">
        <div className="flex justify-between items-center mb-6 no-print">
          <h1 className="text-2xl font-bold">لوحة تحليل المشروع</h1>

          <button
            onClick={() => navigate("/chat")}
            className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-500"
          >
            العودة إلى المحادثة
          </button>
        </div>

        <div className="hidden print:block mb-6">
          <h1 className="text-3xl font-bold">📊 تقرير تقدير مشروع برمجي</h1>
          <p className="text-sm">
            يتم توليد هذا التقرير تلقائياً بواسطة نظام الذكاء الاصطناعي
          </p>
          <hr className="mt-3" />
        </div>

        {/* PROJECT INFO */}
        <div className="mb-6 p-4 border rounded-xl bg-white/5 print:bg-transparent">
          <h2 className="text-xl font-bold mb-2">📌 معلومات المشروع</h2>

          <p>
            <b>اسم المشروع:</b> {projectMeta?.name || "غير محدد"}
          </p>

          <p className="mt-2">
            <b>وصف المشروع:</b>{" "}
            {projectMeta?.description || "لا يوجد وصف تم إدخاله أثناء المقابلة"}
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-xl bg-white/5">
            <p className="text-gray-400">{labels.fp}</p>
            <p className="text-2xl font-bold">{result.fp}</p>
          </div>

          <div className="p-4 border rounded-xl bg-white/5">
            <p className="text-gray-400">{labels.ucp}</p>
            <p className="text-2xl font-bold">{result.ucp}</p>
          </div>

          <div className="p-4 border rounded-xl bg-white/5">
            <p className="text-gray-400">{labels.effortHours}</p>
            <p className="text-2xl font-bold">{result.effortHours}</p>
          </div>

          <div className="p-4 border rounded-xl bg-white/5">
            <p className="text-gray-400">{labels.cost}</p>
            <p className="text-2xl font-bold">{result.cost}</p>
          </div>

          <div className="p-4 border rounded-xl bg-white/5">
            <p className="text-gray-400">{labels.tcf}</p>
            <p className="text-xl font-semibold">{result.tcf}</p>
          </div>

          <div className="p-4 border rounded-xl bg-white/5">
            <p className="text-gray-400">{labels.ecf}</p>
            <p className="text-xl font-semibold">{result.ecf}</p>
          </div>
        </div>

        <div className="mt-6 p-5 border rounded-xl bg-white/5">
          <h2 className="text-lg font-semibold mb-3">تفاصيل المشروع</h2>

          <p>👥 الممثلون: {projectData.actors.join(", ")}</p>
          <p>📥 المدخلات: {projectData.inputs}</p>
          <p>📤 المخرجات: {projectData.outputs}</p>
          <p>⚙️ حالات الاستخدام: {projectData.useCases}</p>
          <p>📁 الملفات: {projectData.files}</p>
        </div>

        <div className="mt-6 flex justify-center no-print">
          <button
            onClick={() => window.print()}
            className="px-10 py-4 bg-green-600 rounded-xl hover:bg-green-500 transition"
          >
            📄 تحميل PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
