import { useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  status: "active",
  notes: "",
};

function CustomerForm({ customer, onClose, onSubmit }) {
  const [form, setForm] = useState(customer ? { ...emptyForm, ...customer } : emptyForm);
  const [errors, setErrors] = useState({});



  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.company.trim()) nextErrors.company = "Company is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      status: form.status,
      notes: form.notes.trim(),
    });
  };

  const fieldClass = (field) => `h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-teal-50 ${errors[field] ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-teal-400"}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600">Customer profile</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">{customer ? "Edit customer" : "Add customer"}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={19} /></button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="customer-name" className="mb-2 block text-xs font-bold text-slate-600">Full name *</label>
              <input id="customer-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Priya Sharma" className={fieldClass("name")} />
              {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="customer-company" className="mb-2 block text-xs font-bold text-slate-600">Company *</label>
              <input id="customer-company" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="e.g. Aster Labs" className={fieldClass("company")} />
              {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="customer-email" className="mb-2 block text-xs font-bold text-slate-600">Email *</label>
              <input id="customer-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.com" className={fieldClass("email")} />
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="customer-phone" className="mb-2 block text-xs font-bold text-slate-600">Phone</label>
              <input id="customer-phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className={fieldClass("phone")} />
            </div>
            <div>
              <label htmlFor="customer-status" className="mb-2 block text-xs font-bold text-slate-600">Status</label>
              <select id="customer-status" value={form.status} onChange={(e) => update("status", e.target.value)} className={fieldClass("status")}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="customer-notes" className="mb-2 block text-xs font-bold text-slate-600">Notes</label>
            <textarea id="customer-notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} rows="4" placeholder="Add useful context about this customer..." className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-50" />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-teal-200 hover:bg-teal-800">{customer ? "Save changes" : "Create customer"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
