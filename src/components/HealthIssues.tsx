import { motion } from "framer-motion";
import { Heart, AlertTriangle, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthIssue {
  issue: string;
  description: string;
  severity: "mild" | "moderate" | "severe";
}

interface HealthIssuesProps {
  issues: HealthIssue[];
  stressLevel: "low" | "moderate" | "high";
}

const HealthIssues = ({ issues, stressLevel }: HealthIssuesProps) => {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "mild":
        return {
          bg: "bg-yellow-500/10 border-yellow-500/20",
          icon: "text-yellow-500",
          badge: "bg-yellow-500/15 text-yellow-600",
        };
      case "moderate":
        return {
          bg: "bg-orange-500/10 border-orange-500/20",
          icon: "text-orange-500",
          badge: "bg-orange-500/15 text-orange-600",
        };
      case "severe":
        return {
          bg: "bg-red-500/10 border-red-500/20",
          icon: "text-red-500",
          badge: "bg-red-500/15 text-red-600",
        };
      default:
        return {
          bg: "bg-muted border-muted-foreground/20",
          icon: "text-muted-foreground",
          badge: "bg-muted text-muted-foreground",
        };
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "severe":
        return <ShieldAlert className="w-5 h-5" />;
      case "moderate":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Potential Health Issues
        </CardTitle>
        <CardDescription>
          Health concerns associated with your {stressLevel} stress level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {issues.map((item, index) => {
            const styles = getSeverityStyles(item.severity);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${styles.bg}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${styles.icon}`}>
                    {getSeverityIcon(item.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {item.issue}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${styles.badge}`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthIssues;
