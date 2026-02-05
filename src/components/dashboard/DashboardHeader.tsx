 import { motion } from "framer-motion";
 import { BarChart3, Calendar } from "lucide-react";
 
 export const DashboardHeader = () => {
   return (
     <motion.header
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
     >
       <div className="flex items-center gap-3">
         <div className="p-2 rounded-lg bg-primary/10">
           <BarChart3 className="w-8 h-8 text-primary" />
         </div>
         <div>
           <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
             Análise de Vendas
           </h1>
           <p className="text-muted-foreground text-sm">
             Dashboard Financeiro - Dados Globais
           </p>
         </div>
       </div>
       <div className="flex items-center gap-2 text-sm text-muted-foreground glass-card rounded-lg px-4 py-2">
         <Calendar className="w-4 h-4" />
         <span>Jan 2024 - Mai 2024</span>
       </div>
     </motion.header>
   );
 };