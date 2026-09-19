import { useState } from "react";
import { Bell, Database, LockKeyhole, Save, UserRound } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useCustomers } from "../context/useCustomers";

function Settings() {
  const { user } = useAuth();
  const { resetCustomers } = useCustomers();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [weekly, setWeekly] = useState(true);

  const save = () => {
    localStorage.setItem("clientflow_preferences", JSON.stringify({ notifications, weekly }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6">
      <section><p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">Workspace preferences</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-[36px]">Settings</h1><p className="mt-1.5 text-sm text-slate-500 sm:text-base">Manage your account, notifications, and workspace preferences.</p></section>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><UserRound size={19} /></div><div><h2 className="text-base font-bold text-slate-900">Profile</h2><p className="text-xs text-slate-400">Your current account details</p></div></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div><label className="mb-2 block text-xs font-bold text-slate-500">Full name</label><input value={user?.name || ""} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none" /></div>
            <div><label className="mb-2 block text-xs font-bold text-slate-500">Email</label><input value={user?.email || ""} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none" /></div>
            <div><label className="mb-2 block text-xs font-bold text-slate-500">Role</label><input value={user?.role || ""} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none" /></div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><Bell size={19} /></div><div><h2 className="text-base font-bold text-slate-900">Notifications</h2><p className="text-xs text-slate-400">Control workspace alerts</p></div></div>
          <div className="mt-5 space-y-4">
            <Toggle label="Product notifications" description="Receive important activity updates." value={notifications} onChange={setNotifications} />
            <Toggle label="Weekly summary" description="Get a weekly performance summary." value={weekly} onChange={setWeekly} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><LockKeyhole size={19} /></div><div><h2 className="text-base font-bold text-slate-900">Security</h2><p className="text-xs text-slate-400">Authentication controls</p></div></div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-800">Demo authentication enabled</p><p className="mt-1 text-xs leading-5 text-slate-500">The current login is local-only. A Flask/JWT API can replace it without changing the dashboard layout.</p></div>
          <button type="button" disabled className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-400">Change password</button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><Database size={19} /></div><div><h2 className="text-base font-bold text-slate-900">Demo data</h2><p className="text-xs text-slate-400">Local development controls</p></div></div>
          <p className="mt-5 text-sm leading-6 text-slate-500">Customer changes are stored in your browser for now. Resetting restores the original demo records.</p>
          <button type="button" onClick={resetCustomers} className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Reset customer data</button>
        </section>
      </div>

      <div className="flex items-center justify-end gap-3"><span className={`text-xs font-semibold text-emerald-600 transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>Saved successfully</span><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-teal-200 hover:bg-teal-800"><Save size={17} /> Save preferences</button></div>
    </div>
  );
}

function Toggle({ label, description, value, onChange }) {
  return <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-slate-800">{label}</p><p className="mt-1 text-xs text-slate-400">{description}</p></div><button type="button" role="switch" aria-checked={value} onClick={() => onChange(!value)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${value ? "bg-teal-600" : "bg-slate-200"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${value ? "left-6" : "left-1"}`} /></button></div>;
}

export default Settings;
