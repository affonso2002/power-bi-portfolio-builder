 import { createContext, useContext, useState, ReactNode } from "react";
 
 interface DashboardFilters {
   countries: string[];
   segments: string[];
 }
 
 interface DashboardContextType {
   filters: DashboardFilters;
   setCountries: (countries: string[]) => void;
   setSegments: (segments: string[]) => void;
   clearFilters: () => void;
   selectedCountry: string | null;
   setSelectedCountry: (country: string | null) => void;
 }
 
 const DashboardContext = createContext<DashboardContextType | null>(null);
 
 export const DashboardProvider = ({ children }: { children: ReactNode }) => {
   const [filters, setFilters] = useState<DashboardFilters>({
     countries: [],
     segments: [],
   });
   const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
 
   const setCountries = (countries: string[]) => {
     setFilters((prev) => ({ ...prev, countries }));
   };
 
   const setSegments = (segments: string[]) => {
     setFilters((prev) => ({ ...prev, segments }));
   };
 
   const clearFilters = () => {
     setFilters({ countries: [], segments: [] });
   };
 
   return (
     <DashboardContext.Provider
       value={{
         filters,
         setCountries,
         setSegments,
         clearFilters,
         selectedCountry,
         setSelectedCountry,
       }}
     >
       {children}
     </DashboardContext.Provider>
   );
 };
 
 export const useDashboard = () => {
   const context = useContext(DashboardContext);
   if (!context) {
     throw new Error("useDashboard must be used within DashboardProvider");
   }
   return context;
 };