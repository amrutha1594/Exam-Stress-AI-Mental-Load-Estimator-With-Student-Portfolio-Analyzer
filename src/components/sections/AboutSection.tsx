import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, BookOpen, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Objective",
    description:
      "To develop an AI-based system that can accurately identify and classify student stress levels during exam periods.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Combining NLP with machine learning to analyze both academic records and student portfolios for comprehensive assessment.",
  },
  {
    icon: BookOpen,
    title: "Academic Focus",
    description:
      "Tailored specifically for educational institutions to support student mental health and academic performance.",
  },
  {
    icon: TrendingUp,
    title: "Impact",
    description:
      "Enabling early intervention and personalized support for students experiencing high stress levels.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            About the Project
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Understanding Student Stress
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our project addresses the critical need for early detection of exam-related
            stress in students, enabling timely support and intervention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
            <h3 className="font-display font-semibold text-2xl text-foreground mb-4 text-center">
              Problem Statement
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              Students often experience significant stress during examination periods, 
              which can negatively impact their mental health and academic performance. 
              Traditional methods of stress detection rely on self-reporting, which may 
              not capture the true extent of a student's mental load. Our AI-based approach 
              provides an objective, data-driven method for identifying at-risk students 
              before stress levels become critical.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
