 import { motion } from "framer-motion";
 
 interface StressGaugeProps {
   score: number;
   level: "low" | "moderate" | "high";
 }
 
 const StressGauge = ({ score, level }: StressGaugeProps) => {
   const getGaugeColor = () => {
     if (score <= 33) return "#22c55e"; // green
     if (score <= 66) return "#eab308"; // yellow
     return "#ef4444"; // red
   };
 
   const getGradient = () => {
     return "url(#gaugeGradient)";
   };
 
   // Calculate the angle for the gauge needle (-90 to 90 degrees)
   const needleAngle = -90 + (score / 100) * 180;
 
   return (
     <div className="flex flex-col items-center">
       <div className="relative w-48 h-28 mb-4">
         <svg viewBox="0 0 200 120" className="w-full h-full">
           <defs>
             <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#22c55e" />
               <stop offset="50%" stopColor="#eab308" />
               <stop offset="100%" stopColor="#ef4444" />
             </linearGradient>
           </defs>
           
           {/* Background arc */}
           <path
             d="M 20 100 A 80 80 0 0 1 180 100"
             fill="none"
             stroke="hsl(var(--muted))"
             strokeWidth="16"
             strokeLinecap="round"
           />
           
           {/* Colored arc */}
           <motion.path
             d="M 20 100 A 80 80 0 0 1 180 100"
             fill="none"
             stroke={getGradient()}
             strokeWidth="16"
             strokeLinecap="round"
             strokeDasharray="251.2"
             initial={{ strokeDashoffset: 251.2 }}
             animate={{ strokeDashoffset: 251.2 - (score / 100) * 251.2 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
           />
           
           {/* Needle */}
           <motion.g
             initial={{ rotate: -90 }}
             animate={{ rotate: needleAngle }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             style={{ transformOrigin: "100px 100px" }}
           >
             <line
               x1="100"
               y1="100"
               x2="100"
               y2="35"
               stroke={getGaugeColor()}
               strokeWidth="3"
               strokeLinecap="round"
             />
           </motion.g>
           
           {/* Center circle */}
           <circle cx="100" cy="100" r="8" fill={getGaugeColor()} />
           
           {/* Labels */}
           <text x="15" y="115" className="text-[10px] fill-muted-foreground">Low</text>
           <text x="88" y="30" className="text-[10px] fill-muted-foreground">Med</text>
           <text x="170" y="115" className="text-[10px] fill-muted-foreground">High</text>
         </svg>
       </div>
       
       <motion.div
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="text-center"
       >
         <div className="font-display text-4xl font-bold" style={{ color: getGaugeColor() }}>
           {score}
         </div>
         <div className="text-sm text-muted-foreground capitalize">
           {level} Stress
         </div>
       </motion.div>
     </div>
   );
 };
 
 export default StressGauge;