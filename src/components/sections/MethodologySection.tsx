import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  Filter,
  Cpu,
  Layers,
  Brain,
  FileBarChart,
} from "lucide-react";

const methodologySteps = [
  {
    icon: Database,
    title: "Data Collection",
    description:
      "Gathering academic records, attendance data, assignment submissions, and student portfolio information from institutional databases.",
    color: "bg-stress-low",
  },
  {
    icon: Filter,
    title: "Data Preprocessing",
    description:
      "Cleaning, normalizing, and transforming raw data. Handling missing values, outliers, and ensuring data consistency across sources.",
    color: "bg-primary",
  },
  {
    icon: Cpu,
    title: "Feature Extraction",
    description:
      "Extracting relevant features using NLP techniques for text data and statistical methods for numerical data. TF-IDF, word embeddings, and sentiment analysis.",
    color: "bg-stress-moderate",
  },
  {
    icon: Layers,
    title: "Feature Fusion",
    description:
      "Combining extracted features from multiple sources into a unified feature vector. Dimensionality reduction using PCA where necessary.",
    color: "bg-accent-foreground",
  },
  {
    icon: Brain,
    title: "Stress Prediction",
    description:
      "Applying machine learning classifiers (SVM, Random Forest, Logistic Regression) to predict stress levels: Low, Moderate, or High.",
    color: "bg-primary",
  },
  {
    icon: FileBarChart,
    title: "Reporting",
    description:
      "Generating comprehensive reports with stress predictions, confidence scores, and recommendations for intervention strategies.",
    color: "bg-stress-high",
  },
];

const MethodologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="methodology" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Proposed Methodology
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our systematic approach combines data science, NLP, and machine learning
            to accurately predict student stress levels.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 h-full group">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  <div className="pt-2">
                    <div
                      className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
