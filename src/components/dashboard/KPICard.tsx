 import { motion } from "framer-motion";
 import { LucideIcon } from "lucide-react";
 
 interface KPICardProps {
   title: string;
   value: string;
   subtitle?: string;
   icon: LucideIcon;
   trend?: {
     value: number;
     isPositive: boolean;
   };
   delay?: number;
 }
 
 export const KPICard = ({ title, value, subtitle, icon: Icon, trend, delay = 0 }: KPICardProps) => {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay }}
       className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
     >
       <div className="flex items-start justify-between">
         <div className="space-y-2">
           <p className="text-sm text-muted-foreground font-medium">{title}</p>
           <p className="text-3xl font-bold text-foreground">{value}</p>
           {subtitle && (
             <p className="text-xs text-muted-foreground">{subtitle}</p>
           )}
           {trend && (
             <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
               <span>{trend.isPositive ? '↑' : '↓'}</span>
               <span>{Math.abs(trend.value)}%</span>
               <span className="text-muted-foreground">vs mês anterior</span>
             </div>
           )}
         </div>
         <div className="p-3 rounded-lg bg-primary/10">
           <Icon className="w-6 h-6 text-primary" />
         </div>
       </div>
     </motion.div>
   );
 };