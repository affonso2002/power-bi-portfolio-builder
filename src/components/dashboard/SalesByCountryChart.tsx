 import { motion } from "framer-motion";
 import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
 import { getCountryAggregates } from "@/data/salesData";
 
 interface SalesByCountryChartProps {
   type: "sales" | "profit";
 }
 
 const COLORS = [
   "hsl(199 89% 48%)",
   "hsl(160 84% 39%)",
   "hsl(38 92% 50%)",
   "hsl(280 65% 60%)",
   "hsl(340 75% 55%)",
 ];
 
 export const SalesByCountryChart = ({ type }: SalesByCountryChartProps) => {
   const rawData = getCountryAggregates();
   const data = rawData
     .map((item) => ({
       country: item.country,
       value: type === "sales" ? item.totalSales : item.totalProfit,
       units: item.totalUnits,
     }))
     .sort((a, b) => b.value - a.value);
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat("pt-BR", {
       style: "currency",
       currency: "USD",
       notation: "compact",
       maximumFractionDigits: 1,
     }).format(value);
   };
 
   const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { country: string; value: number; units: number } }> }) => {
     if (active && payload && payload.length) {
       const data = payload[0].payload;
       return (
         <div className="glass-card rounded-lg p-3 border border-border">
           <p className="text-sm font-medium text-foreground">{data.country}</p>
           <p className="text-lg font-bold text-primary">
             {formatCurrency(data.value)}
           </p>
           <p className="text-xs text-muted-foreground">
             {data.units.toLocaleString("pt-BR")} unidades
           </p>
         </div>
       );
     }
     return null;
   };
 
   const title = type === "sales" ? "Vendas por País" : "Lucro por País";
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: type === "sales" ? 0.2 : 0.25 }}
       className="glass-card rounded-xl p-6"
     >
       <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
       <div className="h-[280px]">
         <ResponsiveContainer width="100%" height="100%">
           <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
             <XAxis
               type="number"
               tickFormatter={(value) => formatCurrency(value)}
               tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }}
               axisLine={{ stroke: "hsl(217 33% 25%)" }}
               tickLine={{ stroke: "hsl(217 33% 25%)" }}
             />
             <YAxis
               type="category"
               dataKey="country"
               tick={{ fill: "hsl(210 40% 98%)", fontSize: 12 }}
               axisLine={false}
               tickLine={false}
               width={90}
             />
             <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(217 33% 22% / 0.5)" }} />
             <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={35}>
               {data.map((_, index) => (
                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
       </div>
     </motion.div>
   );
 };