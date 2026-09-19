import {
  Activity,
  DollarSign,
  UserPlus,
  Users,
  TrendingUp,
} from "lucide-react";

const icons = {
  clients: Users,
  new: UserPlus,
  active: Activity,
  revenue: DollarSign,
};

const sparklineData = {
  clients: [42, 48, 46, 57, 54, 66, 62, 76],
  new: [25, 31, 28, 39, 36, 46, 43, 55],
  active: [45, 51, 48, 59, 56, 68, 65, 78],
  revenue: [32, 40, 37, 49, 45, 57, 53, 69],
};

function StatCard({
  title,
  value,
  change,
  description,
  type,
}) {
  const Icon = icons[type] || Users;
  const points = sparklineData[type] || sparklineData.clients;

  const max = Math.max(...points);
  const min = Math.min(...points);

  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 32 - ((point - min) / (max - min)) * 24;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <article className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_8px_25px_rgba(15,118,110,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-teal-600">
            <Icon size={20} strokeWidth={2} />
          </div>

          <p className="truncate text-sm font-semibold text-slate-600">
            {title}
          </p>
        </div>

        <TrendingUp
          size={17}
          className="shrink-0 text-emerald-500"
        />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              ↑ {change}
            </span>

            <span className="text-xs text-slate-400">
              {description}
            </span>
          </div>
        </div>

        {/* Mini sparkline */}
        <svg
          viewBox="0 0 100 40"
          className="h-12 w-24 shrink-0 overflow-visible"
          aria-hidden="true"
        >
          <path
            d={path}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="100"
            cy={32 - ((points[points.length - 1] - min) / (max - min)) * 24}
            r="2.5"
            fill="#10B981"
          />
        </svg>
      </div>
    </article>
  );
}

export default StatCard;