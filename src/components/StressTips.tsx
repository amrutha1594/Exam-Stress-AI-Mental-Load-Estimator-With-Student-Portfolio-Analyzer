 import { motion } from "framer-motion";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Lightbulb, Heart, Clock, Brain, Coffee, Book, Dumbbell } from "lucide-react";
 
 interface StressTipsProps {
   tips: string[];
   stressLevel: "low" | "moderate" | "high";
 }
 
 const StressTips = ({ tips, stressLevel }: StressTipsProps) => {
   const getIcon = (index: number) => {
     const icons = [Lightbulb, Heart, Clock, Brain, Coffee, Book, Dumbbell];
     const Icon = icons[index % icons.length];
     return <Icon className="w-5 h-5" />;
   };
 
   const getHeaderMessage = () => {
     switch (stressLevel) {
       case "low":
         return {
           title: "Keep Up the Great Work!",
           description: "Your stress levels are manageable. Here are tips to maintain your well-being.",
           color: "text-green-500",
           bgColor: "bg-green-500/10",
         };
       case "moderate":
         return {
           title: "Time to Take Action",
           description: "Your stress levels need attention. Follow these recommendations to improve your situation.",
           color: "text-yellow-500",
           bgColor: "bg-yellow-500/10",
         };
       case "high":
         return {
           title: "Immediate Attention Needed",
           description: "Your stress levels are concerning. Please prioritize these stress-reduction strategies.",
           color: "text-red-500",
           bgColor: "bg-red-500/10",
         };
       default:
         return {
           title: "Stress Reduction Tips",
           description: "Personalized recommendations based on your analysis.",
           color: "text-primary",
           bgColor: "bg-primary/10",
         };
     }
   };
 
   const header = getHeaderMessage();
 
   return (
     <Card>
       <CardHeader>
         <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${header.bgColor} w-fit mb-2`}>
           <Lightbulb className={`w-4 h-4 ${header.color}`} />
           <span className={`text-sm font-medium ${header.color}`}>{header.title}</span>
         </div>
         <CardTitle>Personalized Stress-Reduction Tips</CardTitle>
         <CardDescription>{header.description}</CardDescription>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {tips.map((tip, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="flex items-start gap-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors"
             >
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                 {getIcon(index)}
               </div>
               <div>
                 <p className="text-sm text-foreground leading-relaxed">{tip}</p>
               </div>
             </motion.div>
           ))}
         </div>
 
         {stressLevel !== "low" && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20"
           >
             <div className="flex items-start gap-3">
               <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
               <div>
                 <p className="font-medium text-foreground mb-1">Remember</p>
                 <p className="text-sm text-muted-foreground">
                   It's okay to ask for help. Consider reaching out to your academic advisor, 
                   counselor, or student wellness services if you're feeling overwhelmed.
                 </p>
               </div>
             </div>
           </motion.div>
         )}
       </CardContent>
     </Card>
   );
 };
 
 export default StressTips;