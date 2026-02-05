 import { motion } from "framer-motion";
 import { Filter, X } from "lucide-react";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import { getCountries, getSegments } from "@/data/salesData";
 import { useDashboard } from "@/contexts/DashboardContext";
 
 export const FilterBar = () => {
   const { filters, setCountries, setSegments, clearFilters } = useDashboard();
   const countries = getCountries();
   const segments = getSegments();
 
   const hasFilters = filters.countries.length > 0 || filters.segments.length > 0;
 
   const toggleCountry = (country: string) => {
     if (filters.countries.includes(country)) {
       setCountries(filters.countries.filter((c) => c !== country));
     } else {
       setCountries([...filters.countries, country]);
     }
   };
 
   const toggleSegment = (segment: string) => {
     if (filters.segments.includes(segment)) {
       setSegments(filters.segments.filter((s) => s !== segment));
     } else {
       setSegments([...filters.segments, segment]);
     }
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.3 }}
       className="flex flex-wrap items-center gap-3 mb-6"
     >
       <div className="flex items-center gap-2 text-muted-foreground">
         <Filter className="h-4 w-4" />
         <span className="text-sm font-medium">Filtros:</span>
       </div>
 
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="outline" size="sm" className="h-8">
             País
             {filters.countries.length > 0 && (
               <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                 {filters.countries.length}
               </Badge>
             )}
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-48 bg-background border-border z-50">
           <DropdownMenuLabel>Selecionar Países</DropdownMenuLabel>
           <DropdownMenuSeparator />
           {countries.map((country) => (
             <DropdownMenuCheckboxItem
               key={country}
               checked={filters.countries.includes(country)}
               onCheckedChange={() => toggleCountry(country)}
             >
               {country}
             </DropdownMenuCheckboxItem>
           ))}
         </DropdownMenuContent>
       </DropdownMenu>
 
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="outline" size="sm" className="h-8">
             Segmento
             {filters.segments.length > 0 && (
               <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                 {filters.segments.length}
               </Badge>
             )}
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-48 bg-background border-border z-50">
           <DropdownMenuLabel>Selecionar Segmentos</DropdownMenuLabel>
           <DropdownMenuSeparator />
           {segments.map((segment) => (
             <DropdownMenuCheckboxItem
               key={segment}
               checked={filters.segments.includes(segment)}
               onCheckedChange={() => toggleSegment(segment)}
             >
               {segment}
             </DropdownMenuCheckboxItem>
           ))}
         </DropdownMenuContent>
       </DropdownMenu>
 
       {hasFilters && (
         <Button
           variant="ghost"
           size="sm"
           className="h-8 text-muted-foreground hover:text-foreground"
           onClick={clearFilters}
         >
           <X className="h-4 w-4 mr-1" />
           Limpar
         </Button>
       )}
 
       {/* Active filter badges */}
       <div className="flex flex-wrap gap-2">
         {filters.countries.map((country) => (
           <Badge
             key={country}
             variant="secondary"
             className="cursor-pointer hover:bg-destructive/20"
             onClick={() => toggleCountry(country)}
           >
             {country}
             <X className="h-3 w-3 ml-1" />
           </Badge>
         ))}
         {filters.segments.map((segment) => (
           <Badge
             key={segment}
             variant="outline"
             className="cursor-pointer hover:bg-destructive/20"
             onClick={() => toggleSegment(segment)}
           >
             {segment}
             <X className="h-3 w-3 ml-1" />
           </Badge>
         ))}
       </div>
     </motion.div>
   );
 };