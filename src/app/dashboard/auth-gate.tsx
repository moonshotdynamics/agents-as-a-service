"use client";

import { useAuth, AuthProvider } from "@/lib/auth";
import LoginPage from "./login/page";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <LoginPage />;
  return <>{children}</>;
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
