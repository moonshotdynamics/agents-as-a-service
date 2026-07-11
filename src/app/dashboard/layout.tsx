import type { Metadata } from "next";
import AuthGate from "./auth-gate";

// The dashboard is a client-side demo behind a fake login — keep it out of
// search indexes so the landing page carries all the ranking signal.
export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate>{children}</AuthGate>;
}
