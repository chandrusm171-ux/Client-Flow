import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0F766E", "#F59E0B", "#94A3B8"];

function CustomerStatusChart({ data, total }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-teal-600"><span className="text-lg font-bold">◔</span></div>
        <div><h2 className="text-base font-bold text-slate-900">Client Status</h2><p className="text-xs text-slate-400">Current distribution of your clients</p></div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-52 w-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={62} outerRadius={86} paddingAngle={2} stroke="#FFFFFF" strokeWidth={3}>
                {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value} clients`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><p className="text-2xl font-bold text-slate-900">{total.toLocaleString()}</p><p className="text-xs text-slate-400">Clients</p></div>
        </div>
        <div className="w-full space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} /><span className="text-sm font-medium text-slate-600">{item.name}</span></div>
              <div className="flex items-center gap-3"><span className="text-sm font-semibold text-slate-800">{item.value}</span><span className="w-12 text-right text-xs text-slate-400">{item.percentage}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerStatusChart;
