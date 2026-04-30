import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smile, Meh, Frown, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const stressLevels = [
  {
    level: "Low",
    emoji: Smile,
    statusIcon: CheckCircle,
    color: "bg-stress-low",
    borderColor: "border-stress-low",
    textColor: "text-stress-low",
    range: "0-33%",
    description:
      "Student is managing academic workload well. Normal stress levels observed with healthy coping mechanisms.",
    indicators: [
      "Regular attendance and participation",
      "On-time assignment submissions",
      "Positive communication patterns",
      "Balanced academic performance",
    ],
    recommendation:
      "Continue current support and encourage maintaining healthy habits.",
  },
  {
    level: "Moderate",
    emoji: Meh,
    statusIcon: AlertCircle,
    color: "bg-stress-moderate",
    borderColor: "border-stress-moderate",
    textColor: "text-stress-moderate",
    range: "34-66%",
    description:
      "Student shows signs of increased stress. Early intervention may help prevent escalation.",
    indicators: [
      "Slight decline in attendance",
      "Occasional late submissions",
      "Changes in communication tone",
      "Fluctuating academic performance",
    ],
    recommendation:
      "Consider proactive outreach and offer additional academic support resources.",
  },
  {
    level: "High",
    emoji: Frown,
    statusIcon: XCircle,
    color: "bg-stress-high",
    borderColor: "border-stress-high",
    textColor: "text-stress-high",
    range: "67-100%",
    description:
      "Student exhibits significant stress indicators. Immediate attention and support recommended.",
    indicators: [
      "Frequent absences or disengagement",
      "Multiple missed deadlines",
      "Negative or distressed communication",
      "Declining academic performance",
    ],
    recommendation:
      "Urgent intervention needed. Connect student with counseling and academic support services.",
  },
];

const StressLevelsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stress-levels" className="py-20 md:py-28">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Stress Classification
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Understanding Stress Levels
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our system classifies student stress into three distinct levels, each
            with specific indicators and recommended actions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stressLevels.map((stress, index) => (
            <motion.div
              key={stress.level}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`bg-card rounded-2xl overflow-hidden shadow-lg border-2 ${stress.borderColor} group hover:shadow-xl transition-all duration-300`}
            >
              {/* Header */}
              <div className={`${stress.color} p-6 text-center`}>
                <stress.emoji className="w-16 h-16 text-white mx-auto mb-3" />
                <h3 className="font-display font-bold text-2xl text-white mb-1">
                  {stress.level} Stress
                </h3>
                <span className="text-white/80 text-sm font-medium">
                  Score Range: {stress.range}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {stress.description}
                </p>

                <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <stress.statusIcon className={`w-4 h-4 ${stress.textColor}`} />
                  Key Indicators
                </h4>
                <ul className="space-y-2 mb-5">
                  {stress.indicators.map((indicator, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${stress.color} mt-1.5 flex-shrink-0`}
                      />
                      <span className="text-muted-foreground">{indicator}</span>
                    </li>
                  ))}
                </ul>

                <div className={`p-4 rounded-xl bg-muted/50 border-l-4 ${stress.borderColor}`}>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    Recommendation
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {stress.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StressLevelsSection;
