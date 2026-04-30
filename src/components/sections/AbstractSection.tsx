import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, CheckCircle } from "lucide-react";

const keyPoints = [
  "AI-based stress level detection and classification",
  "Analysis of academic data and student portfolios",
  "Natural Language Processing for text analysis",
  "Machine Learning classification algorithms",
  "Three-tier stress classification (Low, Moderate, High)",
  "Actionable insights for educators and counselors",
];

const AbstractSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="abstract" className="py-20 md:py-28">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Abstract
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Project Overview
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Abstract Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 h-full">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This project presents an innovative AI-based system designed to detect 
                  and classify student exam stress levels. By leveraging academic data, 
                  student portfolios, and advanced Natural Language Processing (NLP) 
                  techniques, the system provides accurate stress level predictions 
                  categorized as low, moderate, or high.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The proposed methodology integrates multiple data sources including 
                  academic performance records, attendance patterns, submission behaviors, 
                  and textual data from student communications. Using a combination of 
                  feature extraction techniques and machine learning classifiers such as 
                  SVM, Random Forest, and Logistic Regression, the system achieves reliable 
                  stress level predictions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The primary objective is to enable educational institutions to identify 
                  at-risk students early, facilitating timely interventions and support. 
                  This system serves as a valuable tool for educators, counselors, and 
                  academic administrators in promoting student well-being during critical 
                  examination periods.
                </p>
              </div>
            </motion.div>

            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-accent/50 rounded-2xl p-8 h-full">
                <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                  Key Highlights
                </h3>
                <ul className="space-y-4">
                  {keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AbstractSection;
