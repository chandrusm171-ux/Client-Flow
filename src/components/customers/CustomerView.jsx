import { Mail, Phone, X } from "lucide-react";

function getInitials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function CustomerView({ customer, onClose, onEdit }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 font-bold text-teal-700">{getInitials(customer.name)}</div>
            <div>
              <h2 className="text-xl font-bold text-slate-950">{customer.name}</h2>
              <p className="text-sm text-slate-400">{customer.company}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={19} /></button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={`mailto:${customer.email}`} className="rounded-2xl border border-slate-200 p-4 hover:border-teal-200 hover:bg-teal-50/30">
              <Mail size={17} className="text-teal-600" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Email</p>
              <p className="mt-1 break-all text-sm font-semibold text-slate-700">{customer.email}</p>
            </a>
            <a href={`tel:${customer.phone || ""}`} className="rounded-2xl border border-slate-200 p-4 hover:border-teal-200 hover:bg-teal-50/30">
              <Phone size={17} className="text-teal-600" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{customer.phone || "Not provided"}</p>
            </a>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-500">Status</p>
            <p className="mt-1 text-sm font-semibold capitalize text-slate-800">{customer.status}</p>
            <p className="mt-4 text-xs font-bold text-slate-500">Joined</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{customer.date}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Notes</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{customer.notes || "No notes added for this customer."}</p>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Close</button>
            <button type="button" onClick={onEdit} className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800">Edit customer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;
