 import { motion } from "framer-motion";
 import { 
   Brain, AlertTriangle, CheckCircle, XCircle, 
   Calendar, Lightbulb, TrendingUp, TrendingDown, 
   Minus, ArrowLeft, Clock, BookOpen, Heart, Target
 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Progress } from "@/components/ui/progress";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import StressGauge from "./charts/StressGauge";
 import EmotionalToneChart from "./charts/EmotionalToneChart";
 import StudySchedule from "./StudySchedule";
import StressTips from "./StressTips";
import HealthIssues from "./HealthIssues";
 
 interface AnalysisResult {
   id: string;
   student_name: string | null;
   file_name: string;
   stress_level: "low" | "moderate" | "high";
   stress_score: number;
   emotional_tone: {
     confidence: number;
     anxiety: number;
     motivation: number;
     overwhelm: number;
     primary_emotion: string;
   };
   workload_indicators: {
     course_count: number;
     assignment_density: string;
     deadline_clustering: boolean;
     extracurricular_load: string;
   };
   performance_trends: {
     overall_trend: string;
     strengths: string[];
     areas_for_improvement: string[];
   };
   engagement_patterns: {
     participation_level: string;
     study_consistency: string;
     time_management: string;
   };
   stress_causes: string[];
    study_schedule: Record<string, { morning: string; afternoon: string; evening: string }>;
    stress_tips: string[];
    health_issues: { issue: string; description: string; severity: "mild" | "moderate" | "severe" }[];
    analysis_summary: string;
   created_at: string;
 }
 
 interface AnalysisDashboardProps {
   analysis: AnalysisResult;
   onReset: () => void;
 }
 
 const AnalysisDashboard = ({ analysis, onReset }: AnalysisDashboardProps) => {
   const getStressColor = (level: string) => {
     switch (level) {
       case "low": return "text-green-500";
       case "moderate": return "text-yellow-500";
       case "high": return "text-red-500";
       default: return "text-muted-foreground";
     }
   };
 
   const getStressBgColor = (level: string) => {
     switch (level) {
       case "low": return "bg-green-500/10 border-green-500/20";
       case "moderate": return "bg-yellow-500/10 border-yellow-500/20";
       case "high": return "bg-red-500/10 border-red-500/20";
       default: return "bg-muted";
     }
   };
 
   const getStressIcon = (level: string) => {
     switch (level) {
       case "low": return <CheckCircle className="w-8 h-8 text-green-500" />;
       case "moderate": return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
       case "high": return <XCircle className="w-8 h-8 text-red-500" />;
       default: return <Brain className="w-8 h-8" />;
     }
   };
 
   const getTrendIcon = (trend: string) => {
     switch (trend) {
       case "improving": return <TrendingUp className="w-4 h-4 text-green-500" />;
       case "declining": return <TrendingDown className="w-4 h-4 text-red-500" />;
       default: return <Minus className="w-4 h-4 text-yellow-500" />;
     }
   };
 
   return (
     <section id="analyze" className="py-20 bg-accent/30">
       <div className="container mx-auto px-4">
         {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
         >
           <Button variant="ghost" onClick={onReset} className="mb-4">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Analyze Another Portfolio
           </Button>
           
           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
             <div>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                 Analysis <span className="text-gradient">Results</span>
               </h2>
               <p className="text-muted-foreground mt-1">
                 {analysis.student_name ? `For ${analysis.student_name}` : "Student Portfolio Analysis"} • {analysis.file_name}
               </p>
             </div>
             <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border ${getStressBgColor(analysis.stress_level)}`}>
               {getStressIcon(analysis.stress_level)}
               <div>
                 <p className="text-sm text-muted-foreground">Stress Level</p>
                 <p className={`font-display font-bold text-xl capitalize ${getStressColor(analysis.stress_level)}`}>
                   {analysis.stress_level}
                 </p>
               </div>
             </div>
           </div>
         </motion.div>
 
         {/* Summary Card */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="mb-8"
         >
           <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
             <CardContent className="pt-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                   <Brain className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground mb-2">Analysis Summary</h3>
                   <p className="text-muted-foreground leading-relaxed">{analysis.analysis_summary}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
         </motion.div>
 
         {/* Main Dashboard Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           {/* Stress Gauge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             <Card className="h-full">
               <CardHeader>
                 <CardTitle className="text-lg">Stress Score</CardTitle>
                 <CardDescription>Overall stress assessment</CardDescription>
               </CardHeader>
               <CardContent>
                 <StressGauge score={analysis.stress_score} level={analysis.stress_level} />
               </CardContent>
             </Card>
           </motion.div>
 
           {/* Emotional Tone Chart */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
           >
             <Card className="h-full">
               <CardHeader>
                 <CardTitle className="text-lg">Emotional Profile</CardTitle>
                 <CardDescription>Primary: {analysis.emotional_tone.primary_emotion}</CardDescription>
               </CardHeader>
               <CardContent>
                 <EmotionalToneChart data={analysis.emotional_tone} />
               </CardContent>
             </Card>
           </motion.div>
 
           {/* Quick Stats */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
           >
             <Card className="h-full">
               <CardHeader>
                 <CardTitle className="text-lg">Quick Overview</CardTitle>
                 <CardDescription>Key indicators at a glance</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <BookOpen className="w-4 h-4 text-primary" />
                     <span className="text-sm">Courses</span>
                   </div>
                   <span className="font-semibold">{analysis.workload_indicators.course_count}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Target className="w-4 h-4 text-primary" />
                     <span className="text-sm">Assignment Load</span>
                   </div>
                   <span className="font-semibold capitalize">{analysis.workload_indicators.assignment_density}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-primary" />
                     <span className="text-sm">Time Management</span>
                   </div>
                   <span className="font-semibold capitalize">{analysis.engagement_patterns.time_management}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     {getTrendIcon(analysis.performance_trends.overall_trend)}
                     <span className="text-sm">Performance Trend</span>
                   </div>
                   <span className="font-semibold capitalize">{analysis.performance_trends.overall_trend}</span>
                 </div>
               </CardContent>
             </Card>
           </motion.div>
         </div>
 
         {/* Stress Causes */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="mb-8"
         >
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <AlertTriangle className="w-5 h-5 text-yellow-500" />
                 Key Stress Causes Identified
               </CardTitle>
               <CardDescription>
                 These factors are contributing to your current stress levels
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {analysis.stress_causes.map((cause, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.6 + index * 0.1 }}
                     className="flex items-start gap-3 p-3 rounded-lg bg-accent/50"
                   >
                     <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                       <span className="text-xs font-semibold text-yellow-500">{index + 1}</span>
                     </div>
                     <p className="text-sm text-foreground">{cause}</p>
                   </motion.div>
                 ))}
               </div>
             </CardContent>
           </Card>
          </motion.div>

          {/* Health Issues */}
          {analysis.health_issues && analysis.health_issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mb-8"
            >
              <HealthIssues issues={analysis.health_issues} stressLevel={analysis.stress_level} />
            </motion.div>
          )}

          {/* Tabs for Schedule and Tips */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.7 }}
         >
           <Tabs defaultValue="schedule" className="w-full">
             <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex">
               <TabsTrigger value="schedule" className="flex items-center gap-2">
                 <Calendar className="w-4 h-4" />
                 Study Schedule
               </TabsTrigger>
               <TabsTrigger value="tips" className="flex items-center gap-2">
                 <Lightbulb className="w-4 h-4" />
                 Stress Tips
               </TabsTrigger>
             </TabsList>
             <TabsContent value="schedule" className="mt-6">
               <StudySchedule schedule={analysis.study_schedule} />
             </TabsContent>
             <TabsContent value="tips" className="mt-6">
               <StressTips tips={analysis.stress_tips} stressLevel={analysis.stress_level} />
             </TabsContent>
           </Tabs>
         </motion.div>
 
         {/* Performance Details */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
         >
           {/* Strengths */}
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-lg">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 Your Strengths
               </CardTitle>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2">
                 {analysis.performance_trends.strengths.map((strength, index) => (
                   <li key={index} className="flex items-start gap-2 text-sm">
                     <span className="text-green-500">•</span>
                     <span>{strength}</span>
                   </li>
                 ))}
               </ul>
             </CardContent>
           </Card>
 
           {/* Areas for Improvement */}
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-lg">
                 <Target className="w-5 h-5 text-primary" />
                 Areas for Improvement
               </CardTitle>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2">
                 {analysis.performance_trends.areas_for_improvement.map((area, index) => (
                   <li key={index} className="flex items-start gap-2 text-sm">
                     <span className="text-primary">•</span>
                     <span>{area}</span>
                   </li>
                 ))}
               </ul>
             </CardContent>
           </Card>
         </motion.div>
       </div>
     </section>
   );
 };
 
 export default AnalysisDashboard;