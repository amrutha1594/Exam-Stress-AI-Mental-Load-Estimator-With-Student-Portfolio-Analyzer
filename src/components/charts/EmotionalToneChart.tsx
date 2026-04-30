 import { motion } from "framer-motion";
 import { Progress } from "@/components/ui/progress";
 
 interface EmotionalToneData {
   confidence: number;
   anxiety: number;
   motivation: number;
   overwhelm: number;
   primary_emotion: string;
 }
 
 interface EmotionalToneChartProps {
   data: EmotionalToneData;
 }
 
 const EmotionalToneChart = ({ data }: EmotionalToneChartProps) => {
   const emotions = [
     { key: "confidence", label: "Confidence", value: data.confidence, color: "bg-green-500" },
     { key: "motivation", label: "Motivation", value: data.motivation, color: "bg-blue-500" },
     { key: "anxiety", label: "Anxiety", value: data.anxiety, color: "bg-yellow-500" },
     { key: "overwhelm", label: "Overwhelm", value: data.overwhelm, color: "bg-red-500" },
   ];
 
   return (
     <div className="space-y-4">
       {emotions.map((emotion, index) => (
         <motion.div
           key={emotion.key}
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: index * 0.1 }}
           className="space-y-1"
         >
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">{emotion.label}</span>
             <span className="font-medium">{emotion.value}%</span>
           </div>
           <div className="h-2 rounded-full bg-muted overflow-hidden">
             <motion.div
               className={`h-full rounded-full ${emotion.color}`}
               initial={{ width: 0 }}
               animate={{ width: `${emotion.value}%` }}
               transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
             />
           </div>
         </motion.div>
       ))}
     </div>
   );
 };
 
 export default EmotionalToneChart;