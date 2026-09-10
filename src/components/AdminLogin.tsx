import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate("/admin");
      } else {
        const { data: allowed, error: checkErr } = await supabase
          .from("staff_members")
          .select("id")
          .eq("email", email.toLowerCase())
          .maybeSingle();

        if (checkErr) throw checkErr;
        if (!allowed) {
          throw new Error("This email is not authorized to create a staff account. Please contact an administrator.");
        }

        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        navigate("/admin");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-950 px-4">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-200 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </a>

        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
              <Lock className="h-7 w-7 text-primary-600" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-slate-900">
              {mode === "signin" ? "Staff Sign In" : "Create Staff Account"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {mode === "signin"
                ? "Sign in to manage contact messages"
                : "Create an account to access the admin dashboard"}
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-base text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="admin@g2pharmacy.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-base text-slate-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-primary-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
