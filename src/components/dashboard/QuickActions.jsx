import {
  ArrowRight,
  BarChart3,
  Plus,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Customer",
    description: "Create a new customer profile",
    path: "/customers/new",
    icon: Plus,
  },
  {
    title: "View Customers",
    description: "Browse and manage customers",
    path: "/customers",
    icon: Users,
  },
  {
    title: "View Analytics",
    description: "Check detailed reports",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    description: "Manage your preferences",
    path: "/settings",
    icon: Settings,
  },
];

function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
          <Zap size={19} fill="currentColor" />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="text-xs text-slate-400">
            Common tasks to help you stay productive
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition duration-200 hover:border-teal-200 hover:bg-teal-50/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition group-hover:bg-teal-100">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {action.title}
                </p>

                <p className="mt-0.5 text-xs leading-4 text-slate-400">
                  {action.description}
                </p>
              </div>

              <ArrowRight
                size={16}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-600"
              />
            </Link>
          );
        })}
      </div>

      {/* Growth message */}
      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
            <BarChart3 size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-800">
              Keep growing!
            </p>

            <p className="mt-0.5 text-xs leading-5 text-emerald-700/80">
              You're doing great. Your client base is up 12.5% this month. 🎉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuickActions;