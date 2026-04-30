 import { motion } from "framer-motion";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Sun, Sunset, Moon } from "lucide-react";
 
 interface ScheduleDay {
   morning: string;
   afternoon: string;
   evening: string;
 }
 
 interface StudyScheduleProps {
   schedule: Record<string, ScheduleDay>;
 }
 
 const StudySchedule = ({ schedule }: StudyScheduleProps) => {
   const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
   const dayLabels: Record<string, string> = {
     monday: "Mon",
     tuesday: "Tue",
     wednesday: "Wed",
     thursday: "Thu",
     friday: "Fri",
     saturday: "Sat",
     sunday: "Sun",
   };
 
   const timeSlots = [
     { key: "morning", label: "Morning", icon: Sun, color: "text-yellow-500" },
     { key: "afternoon", label: "Afternoon", icon: Sunset, color: "text-orange-500" },
     { key: "evening", label: "Evening", icon: Moon, color: "text-blue-500" },
   ];
 
   return (
     <Card>
       <CardHeader>
         <CardTitle>Personalized Study Schedule</CardTitle>
         <CardDescription>
           A balanced weekly plan designed to reduce stress and maximize productivity
         </CardDescription>
       </CardHeader>
       <CardContent>
         <div className="overflow-x-auto">
           <table className="w-full min-w-[640px]">
             <thead>
               <tr className="border-b border-border">
                 <th className="p-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                 {days.map((day) => (
                   <th key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                     {dayLabels[day]}
                   </th>
                 ))}
               </tr>
             </thead>
             <tbody>
               {timeSlots.map((slot, slotIndex) => (
                 <motion.tr
                   key={slot.key}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: slotIndex * 0.1 }}
                   className="border-b border-border last:border-0"
                 >
                   <td className="p-3">
                     <div className="flex items-center gap-2">
                       <slot.icon className={`w-4 h-4 ${slot.color}`} />
                       <span className="text-sm font-medium">{slot.label}</span>
                     </div>
                   </td>
                   {days.map((day, dayIndex) => (
                     <motion.td
                       key={`${day}-${slot.key}`}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.2 + dayIndex * 0.05 + slotIndex * 0.1 }}
                       className="p-2"
                     >
                       <div className="p-2 rounded-lg bg-accent/50 text-xs text-center min-h-[60px] flex items-center justify-center">
                         {schedule[day]?.[slot.key as keyof ScheduleDay] || "Free Time"}
                       </div>
                     </motion.td>
                   ))}
                 </motion.tr>
               ))}
             </tbody>
           </table>
         </div>
       </CardContent>
     </Card>
   );
 };
 
 export default StudySchedule;