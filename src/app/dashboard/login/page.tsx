"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Wordmark } from "@/components/landing/nav";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("agent@demo.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError("Invalid credentials. Try agent@demo.com / demo123");
  };

  const inputCls =
    "w-full rounded-xl border border-border/70 bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:shadow-[0_0_24px_oklch(0.62_0.23_290/0.15)]";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora-1 absolute -top-[15%] left-[10%] h-[50vh] w-[50vw] rounded-full bg-[oklch(0.45_0.20_290)] opacity-20 blur-[130px]" />
        <div className="aurora-2 absolute bottom-[0%] right-[10%] h-[40vh] w-[40vw] rounded-full bg-[oklch(0.50_0.13_220)] opacity-15 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.75 0.10 285) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 45%, black 25%, transparent 70%)",
          }}
        />
        <div className="noise absolute inset-0 opacity-[0.02]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Wordmark className="mb-6" />
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            Welcome{" "}
            <span className="serif-accent bg-gradient-to-r from-[oklch(0.75_0.19_290)] to-[oklch(0.78_0.13_210)] bg-clip-text text-transparent">
              back.
            </span>
          </h1>
          <p className="mt-2.5 text-sm text-muted-foreground">
            Your agent kept working. See what it got done.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_24px_80px_oklch(0_0_0/0.4)] backdrop-blur-md"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-shine relative w-full cursor-pointer rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_24px_oklch(0.62_0.23_290/0.35)] transition-all duration-300 hover:bg-[oklch(0.70_0.21_287)] hover:shadow-[0_0_40px_oklch(0.62_0.23_290/0.5)] disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="size-3 animate-spin rounded-full border-[1.5px] border-primary-foreground/40 border-t-primary-foreground" />
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground/60">
          Demo credentials pre-filled · any email + 3+ char password works
        </p>
      </motion.div>
    </div>
  );
}
