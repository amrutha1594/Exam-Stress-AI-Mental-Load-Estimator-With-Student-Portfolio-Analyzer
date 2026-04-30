import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalysisDashboard from "@/components/AnalysisDashboard";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  useEffect(() => {
    if (!analysis) {
      navigate("/", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [analysis, navigate]);

  if (!analysis) return null;

  const handleReset = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AnalysisDashboard analysis={analysis} onReset={handleReset} />
      </main>
      <Footer />
    </div>
  );
};

export default Results;
