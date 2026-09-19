import { BarChart3, HelpCircle, LayoutDashboard, LogOut, Settings, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import ClientFlowLogo from "./ClientFlowLogo";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

function MobileSidebar({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Close navigation" onClick={onClose} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
      <aside className="relative flex h-full w-[300px] max-w-[86vw] flex-col bg-white shadow-2xl">
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <ClientFlowLogo />
          <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-7">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Workspace</p>
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.path} to={item.path} onClick={onClose} className={({ isActive }) => ["flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition", isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"].join(" ")}>
                  <Icon size={19} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
          <div className="my-7 h-px bg-slate-100" />
          <button type="button" onClick={onClose} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <HelpCircle size={19} className="text-slate-400" /> Help & Support
          </button>
        </nav>
        <div className="border-t border-slate-100 p-4">
          <button type="button" onClick={onLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600">
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>
    </div>
  );
}

export default MobileSidebar;
