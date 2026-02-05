import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesByCountryChart } from "@/components/dashboard/SalesByCountryChart";
import { ProfitBySegmentChart } from "@/components/dashboard/ProfitBySegmentChart";
import { WorldMapChart } from "@/components/dashboard/WorldMapChart";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { CountryDetailSheet } from "@/components/dashboard/CountryDetailSheet";
import { DashboardProvider, useDashboard } from "@/contexts/DashboardContext";
import { getFilteredTotals } from "@/data/salesData";
import { DollarSign, TrendingUp, Package, ShoppingCart } from "lucide-react";

const DashboardContent = () => {
  const { filters } = useDashboard();
  const totals = getFilteredTotals(filters.countries, filters.segments);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  const profitMargin = ((totals.totalProfit / totals.totalSales) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        {/* Filters */}
        <FilterBar />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total de Vendas"
            value={formatCurrency(totals.totalSales)}
            subtitle="Receita bruta acumulada"
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
            delay={0}
          />
          <KPICard
            title="Lucro Total"
            value={formatCurrency(totals.totalProfit)}
            subtitle="Margem de lucro"
            icon={TrendingUp}
            trend={{ value: 8.3, isPositive: true }}
            delay={0.05}
          />
          <KPICard
            title="Unidades Vendidas"
            value={formatNumber(totals.totalUnits)}
            subtitle="Total de produtos"
            icon={Package}
            trend={{ value: 5.2, isPositive: true }}
            delay={0.1}
          />
          <KPICard
            title="Margem de Lucro"
            value={`${profitMargin}%`}
            subtitle="Lucro / Vendas"
            icon={ShoppingCart}
            delay={0.15}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SalesByCountryChart type="sales" />
          <SalesByCountryChart type="profit" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProfitBySegmentChart />
          <TrendChart />
        </div>

        {/* World Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorldMapChart />
        </div>

        {/* Country Detail Sheet */}
        <CountryDetailSheet />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Index;
