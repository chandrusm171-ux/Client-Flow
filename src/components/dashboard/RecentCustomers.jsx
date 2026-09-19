import { ArrowRight, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";


function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    inactive: "bg-slate-100 text-slate-600",
  };

  const labels = {
    active: "Active",
    pending: "Pending",
    inactive: "Inactive",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status]
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />

      {labels[status]}
    </span>
  );
}

function RecentCustomers({ customers = [] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Recent Customers
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Your latest customer registrations
          </p>
        </div>

        <Link
          to="/customers"
          className="group flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
        >
          View all

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/70 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                Customer
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                Company
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                Email
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-semibold text-slate-400">
                Joined
              </th>

              <th className="px-5 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-slate-100 transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                      {getInitials(customer.name)}
                    </div>

                    <span className="whitespace-nowrap text-sm font-semibold text-slate-800">
                      {customer.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3.5 text-sm text-slate-500">
                  {customer.company}
                </td>

                <td className="px-5 py-3.5 text-sm text-slate-500">
                  {customer.email}
                </td>

                <td className="px-5 py-3.5">
                  <StatusBadge status={customer.status} />
                </td>

                <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-500">
                  {customer.date}
                </td>

                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    aria-label={`More actions for ${customer.name}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center gap-3 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
              {getInitials(customer.name)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {customer.name}
                </p>

                <StatusBadge status={customer.status} />
              </div>

              <p className="mt-0.5 truncate text-xs text-slate-400">
                {customer.company}
              </p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {customer.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentCustomers;