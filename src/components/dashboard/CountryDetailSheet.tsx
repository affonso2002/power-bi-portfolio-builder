 import { motion, AnimatePresence } from "framer-motion";
 import { X, TrendingUp, Package, DollarSign, PieChart } from "lucide-react";
 import { useDashboard } from "@/contexts/DashboardContext";
 import { getCountryDetails } from "@/data/salesData";
 import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
 
 const COLORS = [
   "hsl(199 89% 48%)",
   "hsl(160 84% 39%)",
   "hsl(38 92% 50%)",
   "hsl(280 65% 60%)",
   "hsl(340 75% 55%)",
 ];
 
 export const CountryDetailSheet = () => {
   const { selectedCountry, setSelectedCountry } = useDashboard();
 
   if (!selectedCountry) return null;
 
   const details = getCountryDetails(selectedCountry);
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat("pt-BR", {
       style: "currency",
       currency: "USD",
       notation: "compact",
       maximumFractionDigits: 1,
     }).format(value);
   };
 
   const segmentChartData = details.bySegment.map((s) => ({
     name: s.segment,
     value: s.sales,
   }));
 
   const productChartData = details.byProduct.map((p) => ({
     name: p.product,
     value: p.sales,
   }));
 
   return (
     <AnimatePresence>
       {selectedCountry && (
         <>
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-40"
             onClick={() => setSelectedCountry(null)}
           />
 
           {/* Sheet */}
           <motion.div
             initial={{ x: "100%" }}
             animate={{ x: 0 }}
             exit={{ x: "100%" }}
             transition={{ type: "spring", damping: 25, stiffness: 200 }}
             className="fixed right-0 top-0 h-full w-full max-w-md glass-card border-l border-border z-50 overflow-y-auto"
           >
             <div className="p-6">
               {/* Header */}
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-foreground">
                   {selectedCountry}
                 </h2>
                 <button
                   onClick={() => setSelectedCountry(null)}
                   className="p-2 rounded-lg hover:bg-muted transition-colors"
                 >
                   <X className="h-5 w-5 text-muted-foreground" />
                 </button>
               </div>
 
               {/* KPIs */}
               <div className="grid grid-cols-3 gap-4 mb-8">
                 <div className="text-center">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                     <DollarSign className="h-5 w-5 text-primary" />
                   </div>
                   <p className="text-lg font-bold text-foreground">
                     {formatCurrency(details.totals.sales)}
                   </p>
                   <p className="text-xs text-muted-foreground">Vendas</p>
                 </div>
                 <div className="text-center">
                   <div className="w-10 h-10 rounded-full bg-chart-2/20 flex items-center justify-center mx-auto mb-2">
                     <TrendingUp className="h-5 w-5 text-chart-2" />
                   </div>
                   <p className="text-lg font-bold text-foreground">
                     {formatCurrency(details.totals.profit)}
                   </p>
                   <p className="text-xs text-muted-foreground">Lucro</p>
                 </div>
                 <div className="text-center">
                   <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center mx-auto mb-2">
                     <Package className="h-5 w-5 text-chart-3" />
                   </div>
                   <p className="text-lg font-bold text-foreground">
                     {details.totals.units.toLocaleString("pt-BR")}
                   </p>
                   <p className="text-xs text-muted-foreground">Unidades</p>
                 </div>
               </div>
 
               {/* By Segment */}
               <div className="mb-8">
                 <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                   <PieChart className="h-4 w-4" />
                   Por Segmento
                 </h3>
                 <div className="h-[180px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <RechartsPie>
                       <Pie
                         data={segmentChartData}
                         cx="50%"
                         cy="50%"
                         innerRadius={40}
                         outerRadius={70}
                         paddingAngle={3}
                         dataKey="value"
                       >
                         {segmentChartData.map((_, index) => (
                           <Cell
                             key={`cell-${index}`}
                             fill={COLORS[index % COLORS.length]}
                           />
                         ))}
                       </Pie>
                       <Tooltip
                         formatter={(value: number) => formatCurrency(value)}
                         contentStyle={{
                           backgroundColor: "hsl(222 47% 11%)",
                           border: "1px solid hsl(217 33% 25%)",
                           borderRadius: "8px",
                         }}
                       />
                     </RechartsPie>
                   </ResponsiveContainer>
                 </div>
                 <div className="grid grid-cols-2 gap-2 mt-2">
                   {details.bySegment.map((segment, index) => (
                     <div
                       key={segment.segment}
                       className="flex items-center gap-2 text-sm"
                     >
                       <div
                         className="w-3 h-3 rounded-full"
                         style={{ backgroundColor: COLORS[index % COLORS.length] }}
                       />
                       <span className="text-muted-foreground truncate">
                         {segment.segment}
                       </span>
                     </div>
                   ))}
                 </div>
               </div>
 
               {/* By Product */}
               <div>
                 <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                   <Package className="h-4 w-4" />
                   Por Produto
                 </h3>
                 <div className="space-y-3">
                   {details.byProduct.map((product, index) => {
                     const maxSales = Math.max(
                       ...details.byProduct.map((p) => p.sales)
                     );
                     const percentage = (product.sales / maxSales) * 100;
                     return (
                       <div key={product.product}>
                         <div className="flex items-center justify-between mb-1">
                           <span className="text-sm text-foreground">
                             {product.product}
                           </span>
                           <span className="text-sm text-muted-foreground">
                             {formatCurrency(product.sales)}
                           </span>
                         </div>
                         <div className="h-2 bg-muted rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             animate={{ width: `${percentage}%` }}
                             transition={{ duration: 0.5, delay: index * 0.1 }}
                             className="h-full rounded-full"
                             style={{
                               backgroundColor: COLORS[index % COLORS.length],
                             }}
                           />
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
             </div>
           </motion.div>
         </>
       )}
     </AnimatePresence>
   );
 };