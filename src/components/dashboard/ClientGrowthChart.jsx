import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { growthData } from "../../data/dashboardData";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl"><p className="text-xs font-medium text-slate-400">{label} 2026</p><p className="mt-1 text-sm font-bold text-slate-900"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-teal-600" />{payload[0].value} new clients</p></div>;
}

function ClientGrowthChart({ data = growthData }) {
  const [period, setPeriod] = useState("6");
  const chartData = period === "12" ? [...data, { month: "Oct", clients: 91 }, { month: "Nov", clients: 96 }, { month: "Dec", clients: 102 }] : data;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-teal-600"><span className="text-lg font-bold">↗</span></div><div><h2 className="text-base font-bold text-slate-900">Client Growth</h2><p className="text-xs text-slate-400">New clients acquired over time</p></div></div>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" aria-label="Growth period"><option value="6">Last 6 months</option><option value="12">Last 12 months</option></select>
      </div>
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs><linearGradient id="clientGrowthGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity={0.22} /><stop offset="100%" stopColor="#10B981" stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} domain={[0, 120]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#CBD5E1", strokeDasharray: "4 4" }} />
            <Area type="monotone" dataKey="clients" stroke="#0F766E" strokeWidth={3} fill="url(#clientGrowthGradient)" dot={{ r: 4, fill: "#FFFFFF", stroke: "#0F766E", strokeWidth: 2 }} activeDot={{ r: 6, fill: "#0F766E", stroke: "#FFFFFF", strokeWidth: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ClientGrowthChart;
