import { Brain, GraduationCap, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Brain className="w-8 h-8 text-primary" />
                <GraduationCap className="w-4 h-4 text-primary absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-background">
                  Exam Stress AI
                </span>
                <span className="text-xs text-background/70">
                  Mental Load Estimator
                </span>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              An AI-powered system for detecting and classifying student exam stress 
              levels using academic data and NLP techniques.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Abstract", "Methodology", "Architecture"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-background/80 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/70 text-sm">
              © 2025 Exam Stress AI Project. All rights reserved.
            </p>
            <p className="text-background/70 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-stress-high fill-stress-high" /> for Academic Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
