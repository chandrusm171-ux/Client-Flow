import {
  BarChart3,
  ChevronRight,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ClientFlowLogo from "./ClientFlowLogo";
import { useAuth } from "../../context/useAuth";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "AS";

  return (
    <aside className="sticky top-0 hidden h-screen w-[292px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-[76px] shrink-0 items-center border-b border-slate-100 px-5">
        <button type="button" aria-label="Sidebar menu" className="mr-3 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100">
          <Menu size={20} />
        </button>
        <ClientFlowLogo />
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-7">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Workspace</p>
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => [
                  "group flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold transition-all duration-200",
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                ].join(" ")}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={19} strokeWidth={isActive ? 2.4 : 2} className={isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="my-7 h-px bg-slate-100" />
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Support</p>

        <button type="button" onClick={() => navigate("/settings")} className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">
          <HelpCircle size={19} className="text-slate-400 group-hover:text-slate-600" />
          <span>Help & Support</span>
        </button>

        <div className="mt-8 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50/40 p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg shadow-sm">✦</div>
          <h3 className="text-sm font-bold text-slate-900">Upgrade to Pro</h3>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">Unlock advanced analytics and more features.</p>
          <button type="button" onClick={() => navigate("/settings")} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-400 bg-white px-3 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50">
            Upgrade Now <ChevronRight size={15} />
          </button>
        </div>
      </nav>

      <div className="shrink-0 border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl px-1 py-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">{initials}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-800">{user?.name || "Alex Smith"}</p>
            <p className="truncate text-xs text-slate-400">{user?.email || "alex@example.com"}</p>
          </div>
          <button type="button" onClick={onLogout} aria-label="Log out" className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
