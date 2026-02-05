 import { motion } from "framer-motion";
 import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
 import { getCountryAggregates } from "@/data/salesData";
 import { useState } from "react";
 
 const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
 
 interface CountryCoordinates {
   [key: string]: [number, number];
 }
 
 const countryCoordinates: CountryCoordinates = {
   "United States": [-95.7129, 37.0902],
   Canada: [-106.3468, 56.1304],
   France: [2.2137, 46.6034],
   Germany: [10.4515, 51.1657],
   Mexico: [-102.5528, 23.6345],
 };
 
 export const WorldMapChart = () => {
   const data = getCountryAggregates();
   const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
 
   const maxSales = Math.max(...data.map((d) => d.totalSales));
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat("pt-BR", {
       style: "currency",
       currency: "USD",
       notation: "compact",
       maximumFractionDigits: 1,
     }).format(value);
   };
 
   const getMarkerSize = (sales: number) => {
     const minSize = 8;
     const maxSize = 25;
     return minSize + (sales / maxSales) * (maxSize - minSize);
   };
 
   const hoveredData = data.find((d) => d.country === hoveredCountry);
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.35 }}
       className="glass-card rounded-xl p-6 col-span-2"
     >
       <div className="flex items-center justify-between mb-4">
         <h3 className="text-lg font-semibold text-foreground">
           Vendas e Unidades por País
         </h3>
         {hoveredData && (
           <div className="text-sm text-muted-foreground">
             <span className="text-foreground font-medium">{hoveredData.country}</span>
             {" · "}
             <span className="text-primary">{formatCurrency(hoveredData.totalSales)}</span>
             {" · "}
             <span>{hoveredData.totalUnits.toLocaleString("pt-BR")} unidades</span>
           </div>
         )}
       </div>
       <div className="h-[350px] relative">
         <ComposableMap
           projection="geoMercator"
           projectionConfig={{
             scale: 120,
             center: [-20, 35],
           }}
           className="w-full h-full"
         >
           <Geographies geography={geoUrl}>
             {({ geographies }) =>
               geographies.map((geo) => (
                 <Geography
                   key={geo.rsmKey}
                   geography={geo}
                   fill="hsl(217 33% 22%)"
                   stroke="hsl(217 33% 30%)"
                   strokeWidth={0.5}
                   style={{
                     default: { outline: "none" },
                     hover: { outline: "none", fill: "hsl(217 33% 28%)" },
                     pressed: { outline: "none" },
                   }}
                 />
               ))
             }
           </Geographies>
           {data.map((country) => {
             const coords = countryCoordinates[country.country];
             if (!coords) return null;
             const size = getMarkerSize(country.totalSales);
             return (
               <Marker
                 key={country.country}
                 coordinates={coords}
                 onMouseEnter={() => setHoveredCountry(country.country)}
                 onMouseLeave={() => setHoveredCountry(null)}
               >
                 <circle
                   r={size}
                   fill="hsl(199 89% 48% / 0.7)"
                   stroke="hsl(199 89% 48%)"
                   strokeWidth={2}
                   className="cursor-pointer transition-all duration-200 hover:fill-[hsl(199_89%_48%_/_0.9)]"
                 />
                 <text
                   textAnchor="middle"
                   y={size + 15}
                   className="fill-muted-foreground text-[10px] font-medium"
                 >
                   {country.country}
                 </text>
               </Marker>
             );
           })}
         </ComposableMap>
       </div>
     </motion.div>
   );
 };