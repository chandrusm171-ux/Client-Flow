import { useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye, Filter, Pencil, Plus, Search, Trash2, UsersRound, X } from "lucide-react";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerView from "../components/customers/CustomerView";
import { useCustomers } from "../context/useCustomers";

const PAGE_SIZE = 7;

function getInitials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function StatusBadge({ status }) {
  const config = {
    active: ["Active", "bg-emerald-50 text-emerald-700"],
    pending: ["Pending", "bg-amber-50 text-amber-700"],
    inactive: ["Inactive", "bg-slate-100 text-slate-600"],
  };
  const [label, classes] = config[status] || config.inactive;
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{label}</span>;
}

function Customers() {
  const { customers, stats, addCustomer, updateCustomer, deleteCustomer, resetCustomers } = useCustomers();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(location.pathname === "/customers/new");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesSearch = !query || [customer.name, customer.company, customer.email, customer.phone].some((value) => value?.toLowerCase().includes(query));
      const matchesStatus = status === "all" || customer.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visibleCustomers = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
    if (value.trim()) setSearchParams({ search: value });
    else setSearchParams({});
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const submitForm = (data) => {
    if (editing) updateCustomer(editing.id, data);
    else addCustomer(data);
    setFormOpen(false);
    setEditing(null);
  };

  const editFromView = () => {
    setFormOpen(true);
    setViewing(null);
    setEditing(viewing);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">Relationship hub</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-[36px]">Customers</h1>
          <p className="mt-1.5 text-sm text-slate-500 sm:text-base">Manage your customer relationships from one organized workspace.</p>
        </div>
        <button type="button" onClick={openAdd} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-bold text-white shadow-sm shadow-teal-200 hover:bg-teal-800"><Plus size={18} /> Add Customer</button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total customers", stats.total, UsersRound],
          ["Active", stats.active, UsersRound],
          ["Pending review", stats.pending, Filter],
        ].map(([label, value, Icon]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><Icon size={18} /></div></div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{value.toLocaleString()}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[520px]">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search name, company, email..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm outline-none focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-50" />
            {search && <button type="button" onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"><X size={16} /></button>}
          </div>
          <div className="flex items-center gap-2">
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50">
              <option value="all">All statuses</option><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option>
            </select>
            <button type="button" onClick={resetCustomers} className="hidden h-11 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 sm:block">Reset demo data</button>
          </div>
        </div>

        {visibleCustomers.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead><tr className="bg-slate-50/70 text-left">
                {['Customer','Company','Email','Status','Joined',''].map((heading) => <th key={heading} className="px-5 py-3 text-xs font-semibold text-slate-400">{heading}</th>)}
              </tr></thead>
              <tbody>
                {visibleCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">{getInitials(customer.name)}</div><div><p className="text-sm font-semibold text-slate-800">{customer.name}</p><p className="mt-0.5 text-xs text-slate-400">{customer.phone || 'No phone'}</p></div></div></td>
                    <td className="px-5 py-4 text-sm text-slate-600">{customer.company}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{customer.email}</td>
                    <td className="px-5 py-4"><StatusBadge status={customer.status} /></td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{customer.date}</td>
                    <td className="px-5 py-4 text-right"><div className="flex justify-end gap-1">
                      <button type="button" onClick={() => setViewing(customer)} aria-label={`View ${customer.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-teal-50 hover:text-teal-700"><Eye size={16} /></button>
                      <button type="button" onClick={() => { setEditing(customer); setFormOpen(true); }} aria-label={`Edit ${customer.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Pencil size={16} /></button>
                      <button type="button" onClick={() => setDeleteTarget(customer)} aria-label={`Delete ${customer.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center"><UsersRound className="mx-auto text-slate-300" size={36} /><h3 className="mt-4 text-base font-bold text-slate-800">No customers found</h3><p className="mt-1 text-sm text-slate-400">Try changing your search or filter.</p></div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">Showing {filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}-{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} customers</p>
          <div className="flex items-center gap-1">
            <button type="button" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-lg p-2 text-slate-500 disabled:opacity-30 hover:bg-slate-100"><ChevronLeft size={17} /></button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 5).map((number) => <button type="button" key={number} onClick={() => setPage(number)} className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold ${number === safePage ? 'bg-teal-700 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{number}</button>)}
            <button type="button" disabled={safePage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-lg p-2 text-slate-500 disabled:opacity-30 hover:bg-slate-100"><ChevronRight size={17} /></button>
          </div>
        </div>
      </section>

      {formOpen && <CustomerForm key={editing?.id || "new"} customer={editing} onClose={() => { setFormOpen(false); setEditing(null); }} onSubmit={submitForm} />}
      {viewing && <CustomerView customer={viewing} onClose={() => setViewing(null)} onEdit={editFromView} />}
      {deleteTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600"><Trash2 size={19} /></div>
            <h2 className="mt-5 text-xl font-bold text-slate-950">Delete customer?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">This will remove <strong className="text-slate-700">{deleteTarget.name}</strong> from your customer list. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button type="button" onClick={() => { deleteCustomer(deleteTarget.id); setDeleteTarget(null); }} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700">Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
