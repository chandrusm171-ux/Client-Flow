import { useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AS";

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    navigate(`/customers?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-40 flex h-[76px] shrink-0 items-center border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="mr-2 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
      >
        <Menu size={21} />
      </button>

      <form onSubmit={submitSearch} className="flex min-w-0 flex-1">
        <div className="relative w-full max-w-[680px]">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customers, companies, or anything..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-20 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-50"
            aria-label="Search customers"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-400 shadow-sm sm:block">
            Ctrl K
          </kbd>
        </div>
      </form>

      <div className="ml-3 flex items-center gap-1 sm:ml-5 sm:gap-2">
        <button
          type="button"
          aria-label="Help and support"
          onClick={() => navigate("/settings")}
          className="hidden rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
        >
          <CircleHelp size={20} />
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications((current) => !current);
              setShowProfile(false);
            }}
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-bold text-slate-900">Notifications</p>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="p-3">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-sm font-semibold text-emerald-900">Client growth is up</p>
                  <p className="mt-1 text-xs leading-5 text-emerald-700">Your client base increased 12.5% this month.</p>
                </div>
                <div className="mt-2 rounded-xl p-3 hover:bg-slate-50">
                  <p className="text-sm font-semibold text-slate-800">2 customers need attention</p>
                  <p className="mt-1 text-xs text-slate-400">Review pending customer profiles.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mx-2 hidden h-8 w-px bg-slate-200 sm:block" />

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfile((current) => !current);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
              {initials}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-bold text-slate-800">{user?.name || "Alex Smith"}</p>
              <p className="text-xs text-slate-400">{user?.role || "Administrator"}</p>
            </div>
            <ChevronDown size={17} className="hidden text-slate-400 md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
              <button
                type="button"
                onClick={() => {
                  navigate("/settings");
                  setShowProfile(false);
                }}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Account settings
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/customers");
                  setShowProfile(false);
                }}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                My customers
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
