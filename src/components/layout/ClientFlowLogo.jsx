function ClientFlowLogo({ compact = false, light = false }) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <div
        className={`relative flex shrink-0 items-center justify-center rounded-[14px] bg-teal-700 shadow-sm shadow-teal-200 ${compact ? "h-9 w-9" : "h-10 w-10"}`}
      >
        <svg
          viewBox="0 0 40 40"
          className={compact ? "h-6 w-6" : "h-7 w-7"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M28.5 12.5C26.3 10.3 23.4 9 20 9C13.9 9 9 13.9 9 20C9 26.1 13.9 31 20 31C23.4 31 26.3 29.7 28.5 27.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M24.5 14.5H30.5V20.5"
            stroke="#6EE7B7"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="29.5" cy="25.5" r="2.5" fill="#6EE7B7" />
        </svg>
      </div>

      {!compact && (
        <div className="min-w-0">
          <div className={`text-[19px] font-bold leading-none tracking-tight ${light ? "text-white" : "text-slate-950"}`}>
            <span>Client</span>
            <span className={light ? "text-emerald-200" : "text-teal-600"}>Flow</span>
          </div>
          <p className={`mt-1 text-[11px] font-medium ${light ? "text-teal-100" : "text-slate-400"}`}>
            Manage. Track. Grow.
          </p>
        </div>
      )}
    </div>
  );
}

export default ClientFlowLogo;
