import { motion } from "framer-motion";
import { ArrowDown, Brain, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleScrollToAbout = () => {
     document.querySelector("#analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
              <Brain className="w-4 h-4" />
              AI-Powered Student Wellness
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Exam Stress AI
            <span className="block text-gradient mt-2">
              Mental Load Estimator
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            An intelligent system that detects and classifies student exam stress levels
            using academic data, student portfolios, and advanced NLP techniques.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto mb-10"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-accent mb-2">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display font-bold text-2xl text-foreground">3</div>
              <div className="text-xs text-muted-foreground">Stress Levels</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-accent mb-2">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display font-bold text-2xl text-foreground">ML</div>
              <div className="text-xs text-muted-foreground">Algorithms</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl bg-accent mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display font-bold text-2xl text-foreground">NLP</div>
              <div className="text-xs text-muted-foreground">Powered</div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={handleScrollToAbout}
              className="gradient-hero text-primary-foreground px-8 py-6 text-lg font-semibold shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
             Analyze Your Portfolio
              <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-2.5 rounded-full bg-primary"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
