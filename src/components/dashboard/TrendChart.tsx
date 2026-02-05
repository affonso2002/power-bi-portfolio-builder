 import { motion } from "framer-motion";
 import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   ResponsiveContainer,
   Tooltip,
   CartesianGrid,
   Legend,
 } from "recharts";
 import { getMonthlyTrend } from "@/data/salesData";
 import { useDashboard } from "@/contexts/DashboardContext";
 
 export const TrendChart = () => {
   const { filters } = useDashboard();
   const data = getMonthlyTrend(filters.countries, filters.segments);
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat("pt-BR", {
       style: "currency",
       currency: "USD",
       notation: "compact",
       maximumFractionDigits: 1,
     }).format(value);
   };
 
   const formatMonth = (month: string) => {
     const [year, m] = month.split("-");
     const months = [
       "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
       "Jul", "Ago", "Set", "Out", "Nov", "Dez",
     ];
     return `${months[parseInt(m) - 1]}/${year.slice(-2)}`;
   };
 
   const CustomTooltip = ({
     active,
     payload,
     label,
   }: {
     active?: boolean;
     payload?: Array<{ name: string; value: number; color: string }>;
     label?: string;
   }) => {
     if (active && payload && payload.length) {
       return (
         <div className="glass-card rounded-lg p-3 border border-border">
           <p className="text-sm font-medium text-foreground mb-2">
             {label && formatMonth(label)}
           </p>
           {payload.map((entry) => (
             <p
               key={entry.name}
               className="text-sm"
               style={{ color: entry.color }}
             >
               {entry.name === "sales" ? "Vendas" : "Lucro"}:{" "}
               <span className="font-bold">{formatCurrency(entry.value)}</span>
             </p>
           ))}
         </div>
       );
     }
     return null;
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.4 }}
       className="glass-card rounded-xl p-6"
     >
       <h3 className="text-lg font-semibold text-foreground mb-4">
         Tendência Mensal
       </h3>
       <div className="h-[300px]">
         <ResponsiveContainer width="100%" height="100%">
           <LineChart data={data} margin={{ left: 10, right: 10 }}>
             <CartesianGrid
               strokeDasharray="3 3"
               stroke="hsl(217 33% 25%)"
               opacity={0.5}
             />
             <XAxis
               dataKey="month"
               tickFormatter={formatMonth}
               tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }}
               axisLine={{ stroke: "hsl(217 33% 25%)" }}
               tickLine={{ stroke: "hsl(217 33% 25%)" }}
             />
             <YAxis
               tickFormatter={(value) => formatCurrency(value)}
               tick={{ fill: "hsl(215 20% 65%)", fontSize: 12 }}
               axisLine={{ stroke: "hsl(217 33% 25%)" }}
               tickLine={{ stroke: "hsl(217 33% 25%)" }}
               width={70}
             />
             <Tooltip content={<CustomTooltip />} />
             <Legend
               formatter={(value) => (
                 <span className="text-muted-foreground text-sm">
                   {value === "sales" ? "Vendas" : "Lucro"}
                 </span>
               )}
             />
             <Line
               type="monotone"
               dataKey="sales"
               stroke="hsl(199 89% 48%)"
               strokeWidth={3}
               dot={{ fill: "hsl(199 89% 48%)", strokeWidth: 2, r: 4 }}
               activeDot={{ r: 6, strokeWidth: 0 }}
             />
             <Line
               type="monotone"
               dataKey="profit"
               stroke="hsl(160 84% 39%)"
               strokeWidth={3}
               dot={{ fill: "hsl(160 84% 39%)", strokeWidth: 2, r: 4 }}
               activeDot={{ r: 6, strokeWidth: 0 }}
             />
           </LineChart>
         </ResponsiveContainer>
       </div>
     </motion.div>
   );
 };