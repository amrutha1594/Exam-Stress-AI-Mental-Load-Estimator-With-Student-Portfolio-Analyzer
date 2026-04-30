import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
 import AnalyzeTool from "@/components/AnalyzeTool";
import AboutSection from "@/components/sections/AboutSection";
import MethodologySection from "@/components/sections/MethodologySection";
import ToolsSection from "@/components/sections/ToolsSection";
import StressLevelsSection from "@/components/sections/StressLevelsSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
         <AnalyzeTool />
        <AboutSection />
        <MethodologySection />
        <ToolsSection />
        <StressLevelsSection />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
