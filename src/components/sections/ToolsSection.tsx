import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Database,
  Brain,
  BarChart,
  FileCode,
  Layers,
} from "lucide-react";

const tools = [
  {
    category: "Programming",
    items: [
      { name: "Python", description: "Core development language" },
      { name: "Jupyter Notebooks", description: "Interactive development" },
    ],
    icon: Code,
    color: "from-blue-500 to-blue-600",
  },
  {
    category: "NLP Libraries",
    items: [
      { name: "NLTK", description: "Natural Language Toolkit" },
      { name: "spaCy", description: "Industrial NLP" },
      { name: "TextBlob", description: "Sentiment Analysis" },
    ],
    icon: FileCode,
    color: "from-green-500 to-emerald-600",
  },
  {
    category: "Machine Learning",
    items: [
      { name: "Scikit-learn", description: "ML algorithms" },
      { name: "SVM", description: "Support Vector Machines" },
      { name: "Random Forest", description: "Ensemble learning" },
      { name: "Logistic Regression", description: "Classification" },
    ],
    icon: Brain,
    color: "from-purple-500 to-purple-600",
  },
  {
    category: "Data Processing",
    items: [
      { name: "Pandas", description: "Data manipulation" },
      { name: "NumPy", description: "Numerical computing" },
    ],
    icon: Database,
    color: "from-orange-500 to-orange-600",
  },
  {
    category: "Visualization",
    items: [
      { name: "Matplotlib", description: "Static plotting" },
      { name: "Seaborn", description: "Statistical graphics" },
      { name: "Plotly", description: "Interactive charts" },
    ],
    icon: BarChart,
    color: "from-pink-500 to-rose-600",
  },
  {
    category: "Deep Learning",
    items: [
      { name: "TensorFlow", description: "Neural networks" },
      { name: "Keras", description: "High-level API" },
    ],
    icon: Layers,
    color: "from-teal-500 to-cyan-600",
  },
];

const ToolsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tools" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Tools & Technologies
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The powerful combination of tools and technologies that power our
            stress detection system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {tool.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {tool.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground text-sm">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        – {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
