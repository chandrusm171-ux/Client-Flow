import { CalendarDays, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import ClientGrowthChart from "../components/dashboard/ClientGrowthChart";
import CustomerStatusChart from "../components/dashboard/CustomerStatusChart";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import QuickActions from "../components/dashboard/QuickActions";
import { growthData } from "../data/dashboardData";
import { useCustomers } from "../context/useCustomers";

function Dashboard() {
  const { customers, stats } = useCustomers();
  const currentDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const dashboardStats = [
    { title: "Total Clients", value: stats.total.toLocaleString(), change: "12.5%", description: "vs last month", type: "clients" },
    { title: "New Clients", value: Math.min(stats.total, 3).toLocaleString(), change: "8.2%", description: "this month", type: "new" },
    { title: "Active Clients", value: stats.active.toLocaleString(), change: "5.4%", description: "current", type: "active" },
    { title: "Total Revenue", value: "₹48.2K", change: "14.8%", description: "vs last month", type: "revenue" },
  ];

  const statusData = [
    { name: "Active", value: stats.active, percentage: stats.total ? `${((stats.active / stats.total) * 100).toFixed(1)}%` : "0%" },
    { name: "Pending", value: stats.pending, percentage: stats.total ? `${((stats.pending / stats.total) * 100).toFixed(1)}%` : "0%" },
    { name: "Inactive", value: stats.inactive, percentage: stats.total ? `${((stats.inactive / stats.total) * 100).toFixed(1)}%` : "0%" },
  ];

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">Welcome back 👋</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-[36px]">Good morning, Alex</h1>
          <p className="mt-1.5 text-sm text-slate-500 sm:text-base">Here's what's happening with your clients today.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500"><CalendarDays size={17} className="text-slate-400" /><span>{currentDate}</span></div>
          <Link to="/customers/new" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-bold text-white shadow-sm shadow-teal-200 transition hover:bg-teal-800"><Plus size={18} /> Add Customer</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {dashboardStats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
        <ClientGrowthChart data={growthData} />
        <CustomerStatusChart data={statusData} total={stats.total} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
        <RecentCustomers customers={customers.slice(0, 5)} />
        <QuickActions />
      </section>
    </div>
  );
}

export default Dashboard;
