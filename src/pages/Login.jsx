import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

function ClientFlowMark() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 shadow-lg shadow-teal-200">
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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

        <circle
          cx="29.5"
          cy="25.5"
          r="2.5"
          fill="#6EE7B7"
        />
      </svg>
    </div>
  );
}

function Login() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      setSubmitting(false);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left branding section */}
        <section className="relative hidden overflow-hidden bg-teal-700 lg:flex lg:flex-col lg:justify-between lg:p-12">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                <ClientFlowMark />
              </div>

              <div>
                <div className="text-xl font-bold text-white">
                  ClientFlow
                </div>

                <p className="text-xs text-teal-100">
                  Manage. Track. Grow.
                </p>
              </div>

            </div>
          </div>

          <div className="relative max-w-lg">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Client management made simple
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Build stronger
              <br />
              client relationships.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-teal-50/80">
              Keep your customer information organized, understand
              your business growth, and manage everything from one
              simple workspace.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xl font-bold text-white">
                  1.2K+
                </p>

                <p className="mt-1 text-xs text-teal-100">
                  Clients
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xl font-bold text-white">
                  98%
                </p>

                <p className="mt-1 text-xs text-teal-100">
                  Satisfaction
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xl font-bold text-white">
                  24/7
                </p>

                <p className="mt-1 text-xs text-teal-100">
                  Access
                </p>
              </div>

            </div>

          </div>

          <p className="relative text-xs text-teal-100/70">
            © 2026 ClientFlow. All rights reserved.
          </p>

        </section>

        {/* Login section */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <ClientFlowMark />

              <div>
                <div className="text-xl font-bold text-slate-950">
                  ClientFlow
                </div>

                <p className="text-xs text-slate-400">
                  Manage. Track. Grow.
                </p>
              </div>

            </div>

            <div className="mb-8">

              <p className="text-sm font-bold text-teal-600">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Sign in to ClientFlow
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access your workspace.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 text-sm font-bold text-white shadow-sm shadow-teal-200 transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </form>

            {/* Demo credentials */}
            <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">

              <p className="text-xs font-bold text-teal-800">
                Demo credentials
              </p>

              <div className="mt-2 space-y-1 text-xs text-teal-700">

                <p>
                  <span className="font-semibold">
                    Email:
                  </span>{" "}
                  alex@example.com
                </p>

                <p>
                  <span className="font-semibold">
                    Password:
                  </span>{" "}
                  admin123
                </p>

              </div>

            </div>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to the ClientFlow terms
              and privacy policy.
            </p>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Login;