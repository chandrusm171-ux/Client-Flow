import { BarChart3, TrendingUp, Users, UserCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useCustomers } from "../context/useCustomers";

const monthlyData = [
  { month: "Apr", clients: 20, revenue: 31 }, { month: "May", clients: 40, revenue: 36 },
  { month: "Jun", clients: 35, revenue: 42 }, { month: "Jul", clients: 56, revenue: 48 },
  { month: "Aug", clients: 54, revenue: 55 }, { month: "Sep", clients: 86, revenue: 64 },
];

function Analytics() {
  const { stats } = useCustomers();
  const cards = [
    ["Conversion-ready", `${stats.pending}`, "pending customers", UserCheck],
    ["Active rate", `${stats.total ? ((stats.active / stats.total) * 100).toFixed(1) : 0}%`, "of customer base", TrendingUp],
    ["Customer base", stats.total.toLocaleString(), "profiles managed", Users],
  ];

  return (
    <div className="space-y-6">
      <section><p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">Business intelligence</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-[36px]">Analytics</h1><p className="mt-1.5 text-sm text-slate-500 sm:text-base">Understand customer growth, activity, and business performance.</p></section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map(([label, value, description, Icon]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><Icon size={18} /></div></div><p className="mt-4 text-3xl font-bold text-slate-950">{value}</p><p className="mt-1 text-xs text-slate-400">{description}</p></div>)}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600"><BarChart3 size={18} /></div><div><h2 className="text-base font-bold text-slate-900">Acquisition trend</h2><p className="text-xs text-slate-400">New clients by month</p></div></div><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyData}><CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} /><Tooltip /><Bar dataKey="clients" fill="#0F766E" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-base font-bold text-slate-900">Revenue trend</h2><p className="text-xs text-slate-400">Indexed monthly revenue performance</p><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={monthlyData}><CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#0F766E" strokeWidth={3} dot={{ r: 4, fill: "#fff", stroke: "#0F766E", strokeWidth: 2 }} /></LineChart></ResponsiveContainer></div></div>
      </section>

      <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5"><p className="text-sm font-bold text-teal-900">Insight</p><p className="mt-1 text-sm leading-6 text-teal-800/80">Use the Customers page to keep statuses current. Accurate status data makes this analytics view more useful when the Flask API and database are connected later.</p></div>
    </div>
  );
}

export default Analytics;
