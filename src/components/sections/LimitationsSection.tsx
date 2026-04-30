import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Info, ArrowRight } from "lucide-react";

const limitations = [
  {
    title: "Data Quality Dependency",
    description:
      "The accuracy of predictions heavily depends on the quality and completeness of input data. Missing or inaccurate records may affect results.",
    mitigation: "Implement data validation and cleaning pipelines.",
  },
  {
    title: "Privacy Considerations",
    description:
      "Handling sensitive student data requires strict adherence to privacy regulations and institutional policies.",
    mitigation: "Ensure GDPR/FERPA compliance and data anonymization.",
  },
  {
    title: "Cultural Bias",
    description:
      "Stress indicators may vary across different cultural contexts, potentially affecting classification accuracy for diverse student populations.",
    mitigation: "Train models on diverse, representative datasets.",
  },
  {
    title: "Self-Reported Data Limitations",
    description:
      "Some portfolio data relies on student self-reporting, which may not always accurately reflect true stress levels.",
    mitigation: "Combine multiple data sources for validation.",
  },
  {
    title: "Real-Time Processing",
    description:
      "Current implementation may have latency in processing large datasets, limiting real-time stress monitoring capabilities.",
    mitigation: "Optimize algorithms and consider cloud-based solutions.",
  },
  {
    title: "Model Generalization",
    description:
      "Models trained on specific institutional data may not generalize well to other academic environments without retraining.",
    mitigation: "Develop transfer learning approaches for adaptability.",
  },
];

const LimitationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="limitations" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            Limitations
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Known Constraints
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Understanding the current limitations helps set realistic expectations
            and guides future improvements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {limitations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-md border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-stress-moderate/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-stress-moderate" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium">
                      {item.mitigation}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Scope */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/30 rounded-2xl p-8 border border-primary/20">
            <h3 className="font-display font-semibold text-xl text-foreground mb-4 text-center">
              Future Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">
                  Integration with wearable devices for physiological data
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">
                  Mobile application for real-time monitoring
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">
                  Personalized stress management recommendations
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">
                  Multi-language support for global deployment
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LimitationsSection;
