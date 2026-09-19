import { Link } from "react-router-dom";

function NotFound() {
  return <div className="flex min-h-[70vh] items-center justify-center px-6"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">404</p><h1 className="mt-3 text-4xl font-bold text-slate-900">Page not found</h1><p className="mt-3 text-slate-500">The page you're looking for doesn't exist.</p><Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800">Back to Dashboard</Link></div></div>;
}
export default NotFound;
