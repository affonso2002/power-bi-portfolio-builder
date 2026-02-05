 // Sample Financial Data based on Power BI challenge
 export interface SalesData {
   country: string;
   countryCode: string;
   segment: string;
   product: string;
   sales: number;
   profit: number;
   unitsSold: number;
   discountBand: string;
   manufacturingPrice: number;
   salePrice: number;
   date: string;
 }
 
 export const salesData: SalesData[] = [
   // United States
   { country: "United States", countryCode: "USA", segment: "Government", product: "Paseo", sales: 125000, profit: 42500, unitsSold: 1250, discountBand: "None", manufacturingPrice: 50, salePrice: 100, date: "2024-01-15" },
   { country: "United States", countryCode: "USA", segment: "Small Business", product: "VTT", sales: 89000, profit: 31150, unitsSold: 890, discountBand: "Low", manufacturingPrice: 45, salePrice: 100, date: "2024-02-20" },
   { country: "United States", countryCode: "USA", segment: "Enterprise", product: "Amarilla", sales: 156000, profit: 54600, unitsSold: 1300, discountBand: "Medium", manufacturingPrice: 60, salePrice: 120, date: "2024-03-10" },
   { country: "United States", countryCode: "USA", segment: "Channel Partners", product: "Velo", sales: 78000, profit: 23400, unitsSold: 650, discountBand: "High", manufacturingPrice: 55, salePrice: 120, date: "2024-04-05" },
   { country: "United States", countryCode: "USA", segment: "Midmarket", product: "Montana", sales: 112000, profit: 39200, unitsSold: 1120, discountBand: "Low", manufacturingPrice: 48, salePrice: 100, date: "2024-05-18" },
   
   // Canada
   { country: "Canada", countryCode: "CAN", segment: "Government", product: "Carretera", sales: 95000, profit: 33250, unitsSold: 950, discountBand: "None", manufacturingPrice: 52, salePrice: 100, date: "2024-01-22" },
   { country: "Canada", countryCode: "CAN", segment: "Small Business", product: "Paseo", sales: 67000, profit: 20100, unitsSold: 670, discountBand: "Medium", manufacturingPrice: 50, salePrice: 100, date: "2024-02-14" },
   { country: "Canada", countryCode: "CAN", segment: "Enterprise", product: "VTT", sales: 134000, profit: 46900, unitsSold: 1340, discountBand: "Low", manufacturingPrice: 45, salePrice: 100, date: "2024-03-28" },
   { country: "Canada", countryCode: "CAN", segment: "Midmarket", product: "Amarilla", sales: 89000, profit: 31150, unitsSold: 742, discountBand: "None", manufacturingPrice: 60, salePrice: 120, date: "2024-04-12" },
   
   // France
   { country: "France", countryCode: "FRA", segment: "Government", product: "Montana", sales: 145000, profit: 50750, unitsSold: 1450, discountBand: "Low", manufacturingPrice: 48, salePrice: 100, date: "2024-01-08" },
   { country: "France", countryCode: "FRA", segment: "Enterprise", product: "Velo", sales: 178000, profit: 62300, unitsSold: 1483, discountBand: "None", manufacturingPrice: 55, salePrice: 120, date: "2024-02-25" },
   { country: "France", countryCode: "FRA", segment: "Small Business", product: "Carretera", sales: 56000, profit: 16800, unitsSold: 560, discountBand: "High", manufacturingPrice: 52, salePrice: 100, date: "2024-03-15" },
   { country: "France", countryCode: "FRA", segment: "Channel Partners", product: "Paseo", sales: 92000, profit: 27600, unitsSold: 920, discountBand: "Medium", manufacturingPrice: 50, salePrice: 100, date: "2024-04-20" },
   
   // Germany
   { country: "Germany", countryCode: "DEU", segment: "Enterprise", product: "Amarilla", sales: 234000, profit: 81900, unitsSold: 1950, discountBand: "None", manufacturingPrice: 60, salePrice: 120, date: "2024-01-30" },
   { country: "Germany", countryCode: "DEU", segment: "Government", product: "VTT", sales: 167000, profit: 58450, unitsSold: 1670, discountBand: "Low", manufacturingPrice: 45, salePrice: 100, date: "2024-02-18" },
   { country: "Germany", countryCode: "DEU", segment: "Midmarket", product: "Montana", sales: 123000, profit: 43050, unitsSold: 1230, discountBand: "Medium", manufacturingPrice: 48, salePrice: 100, date: "2024-03-22" },
   { country: "Germany", countryCode: "DEU", segment: "Small Business", product: "Velo", sales: 78000, profit: 23400, unitsSold: 650, discountBand: "Low", manufacturingPrice: 55, salePrice: 120, date: "2024-04-08" },
   
   // Mexico
   { country: "Mexico", countryCode: "MEX", segment: "Channel Partners", product: "Carretera", sales: 87000, profit: 26100, unitsSold: 870, discountBand: "High", manufacturingPrice: 52, salePrice: 100, date: "2024-01-12" },
   { country: "Mexico", countryCode: "MEX", segment: "Small Business", product: "Paseo", sales: 54000, profit: 18900, unitsSold: 540, discountBand: "None", manufacturingPrice: 50, salePrice: 100, date: "2024-02-28" },
   { country: "Mexico", countryCode: "MEX", segment: "Government", product: "Amarilla", sales: 98000, profit: 34300, unitsSold: 817, discountBand: "Low", manufacturingPrice: 60, salePrice: 120, date: "2024-03-05" },
   { country: "Mexico", countryCode: "MEX", segment: "Enterprise", product: "VTT", sales: 145000, profit: 50750, unitsSold: 1450, discountBand: "Medium", manufacturingPrice: 45, salePrice: 100, date: "2024-04-15" },
 ];
 
 // Aggregated data by country
 export const getCountryAggregates = () => {
   const aggregates = salesData.reduce((acc, item) => {
     if (!acc[item.country]) {
       acc[item.country] = {
         country: item.country,
         countryCode: item.countryCode,
         totalSales: 0,
         totalProfit: 0,
         totalUnits: 0,
       };
     }
     acc[item.country].totalSales += item.sales;
     acc[item.country].totalProfit += item.profit;
     acc[item.country].totalUnits += item.unitsSold;
     return acc;
   }, {} as Record<string, { country: string; countryCode: string; totalSales: number; totalProfit: number; totalUnits: number }>);
   
   return Object.values(aggregates);
 };
 
 // Aggregated data by segment
 export const getSegmentAggregates = () => {
   const aggregates = salesData.reduce((acc, item) => {
     if (!acc[item.segment]) {
       acc[item.segment] = {
         segment: item.segment,
         totalSales: 0,
         totalProfit: 0,
         totalUnits: 0,
       };
     }
     acc[item.segment].totalSales += item.sales;
     acc[item.segment].totalProfit += item.profit;
     acc[item.segment].totalUnits += item.unitsSold;
     return acc;
   }, {} as Record<string, { segment: string; totalSales: number; totalProfit: number; totalUnits: number }>);
   
   return Object.values(aggregates);
 };
 
 // Get totals
 export const getTotals = () => {
   return salesData.reduce(
     (acc, item) => ({
       totalSales: acc.totalSales + item.sales,
       totalProfit: acc.totalProfit + item.profit,
       totalUnits: acc.totalUnits + item.unitsSold,
       totalTransactions: acc.totalTransactions + 1,
     }),
     { totalSales: 0, totalProfit: 0, totalUnits: 0, totalTransactions: 0 }
   );
 };
 
 // Get unique segments
 export const getSegments = () => [...new Set(salesData.map((d) => d.segment))];
 
 // Get unique countries
 export const getCountries = () => [...new Set(salesData.map((d) => d.country))];