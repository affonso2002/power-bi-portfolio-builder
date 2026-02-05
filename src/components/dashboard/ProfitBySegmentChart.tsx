 import { motion } from "framer-motion";
 import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getFilteredSegmentAggregates } from "@/data/salesData";
import { useDashboard } from "@/contexts/DashboardContext";
 
 const COLORS = [
   "hsl(199 89% 48%)",    // chart-1 (cyan)
   "hsl(160 84% 39%)",    // chart-2 (green)
   "hsl(38 92% 50%)",     // chart-3 (orange)
   "hsl(280 65% 60%)",    // chart-4 (purple)
   "hsl(340 75% 55%)",    // chart-5 (pink)
 ];
 
 export const ProfitBySegmentChart = () => {
  const { filters } = useDashboard();
  const data = getFilteredSegmentAggregates(filters.countries, filters.segments).map((item) => ({
     name: item.segment,
     value: item.totalProfit,
   }));
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat("pt-BR", {
       style: "currency",
       currency: "USD",
       notation: "compact",
       maximumFractionDigits: 1,
     }).format(value);
   };
 
   const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
     if (active && payload && payload.length) {
       return (
         <div className="glass-card rounded-lg p-3 border border-border">
           <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
           <p className="text-lg font-bold text-primary">
             {formatCurrency(payload[0].value)}
           </p>
         </div>
       );
     }
     return null;
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.3 }}
       className="glass-card rounded-xl p-6"
     >
       <h3 className="text-lg font-semibold text-foreground mb-4">
         Lucro por Segmento
       </h3>
       <div className="h-[300px]">
         <ResponsiveContainer width="100%" height="100%">
           <PieChart>
             <Pie
               data={data}
               cx="50%"
               cy="50%"
               innerRadius={60}
               outerRadius={100}
               paddingAngle={4}
               dataKey="value"
             >
               {data.map((_, index) => (
                 <Cell
                   key={`cell-${index}`}
                   fill={COLORS[index % COLORS.length]}
                   stroke="transparent"
                 />
               ))}
             </Pie>
             <Tooltip content={<CustomTooltip />} />
             <Legend
               verticalAlign="bottom"
               height={36}
               formatter={(value) => (
                 <span className="text-muted-foreground text-sm">{value}</span>
               )}
             />
           </PieChart>
         </ResponsiveContainer>
       </div>
     </motion.div>
   );
 };