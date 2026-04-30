import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  ArrowRight,
  Cog,
  Brain,
  BarChart3,
  FileText,
  Users,
  BookOpen,
} from "lucide-react";

const ArchitectureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const inputSources = [
    { icon: Users, label: "Student Portfolio" },
    { icon: BookOpen, label: "Academic Records" },
    { icon: FileText, label: "Text Data" },
  ];

  const processingSteps = [
    { icon: Cog, label: "Feature Extraction" },
    { icon: Brain, label: "ML Classification" },
  ];

  const outputs = [
    { label: "Low", color: "bg-stress-low" },
    { label: "Moderate", color: "bg-stress-moderate" },
    { label: "High", color: "bg-stress-high" },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            System Architecture
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            System Design
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A clear visualization of data flow from input sources through processing
            to stress level output.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Input Sources */}
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center mb-2">
                  Data Input
                </h4>
                <div className="flex flex-col gap-3">
                  {inputSources.map((source, index) => (
                    <motion.div
                      key={source.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 bg-accent/50 rounded-xl px-4 py-3"
                    >
                      <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                        <source.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-medium text-foreground text-sm">
                        {source.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="hidden lg:flex items-center"
              >
                <ArrowRight className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="lg:hidden rotate-90"
              >
                <ArrowRight className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Processing */}
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center mb-2">
                  Processing
                </h4>
                <div className="flex flex-col gap-3">
                  {processingSteps.map((step, index) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 bg-primary/10 rounded-xl px-5 py-4 border-2 border-primary/30"
                    >
                      <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center shadow-glow">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="font-semibold text-foreground">
                        {step.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="hidden lg:flex items-center"
              >
                <ArrowRight className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="lg:hidden rotate-90"
              >
                <ArrowRight className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Output */}
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center mb-2">
                  Stress Output
                </h4>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="bg-muted/50 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    <div className="flex flex-col gap-2">
                      {outputs.map((output) => (
                        <div key={output.label} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${output.color}`} />
                          <span className="text-sm font-medium text-foreground">
                            {output.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Flow Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <p className="text-center text-muted-foreground text-sm max-w-3xl mx-auto">
                <strong className="text-foreground">Data Flow:</strong> Student data from 
                multiple sources is collected, preprocessed, and fed into feature extraction 
                modules. The extracted features are then classified using ML algorithms to 
                produce a stress level prediction with confidence scores.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
