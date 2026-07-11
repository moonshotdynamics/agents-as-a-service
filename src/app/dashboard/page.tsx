"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";

/* ── industry data ───────────────────────── */

type Industry = "realestate" | "legal" | "marketing" | "finance" | "healthcare" | "ecommerce";

interface IndustryConfig {
  id: Industry;
  label: string;
  icon: string;
  color: string;
  kpis: { label: string; value: string | number; change: string; up: boolean }[];
  chartData: { label: string; thisMonth: number; lastMonth: number }[];
  tasks: { id: string; description: string; status: "done" | "running" | "queued"; time: string }[];
  activity: { time: string; action: string }[];
  clients: { name: string; tasks: number; status: "active" | "setup" }[];
}

const industries: IndustryConfig[] = [
  {
    id: "realestate",
    label: "Real Estate",
    icon: "🏠",
    color: "emerald",
    kpis: [
      { label: "Tasks completed", value: "847", change: "+12%", up: true },
      { label: "Leads qualified", value: "284", change: "+24%", up: true },
      { label: "Time saved", value: "142h", change: "+8%", up: true },
      { label: "Avg response", value: "2.4m", change: "-18%", up: true },
    ],
    chartData: [
      { label: "Jul", thisMonth: 312, lastMonth: 287 },
      { label: "Jun", thisMonth: 298, lastMonth: 265 },
      { label: "May", thisMonth: 284, lastMonth: 241 },
      { label: "Apr", thisMonth: 267, lastMonth: 230 },
      { label: "Mar", thisMonth: 241, lastMonth: 218 },
      { label: "Feb", thisMonth: 230, lastMonth: 195 },
    ],
    tasks: [
      { id: "T-1042", description: "Qualify buyer lead — Sandton R3.2M", status: "done", time: "2m ago" },
      { id: "T-1041", description: "Draft Mandeville property listing", status: "done", time: "8m ago" },
      { id: "T-1040", description: "Send nurture email #3 to 47 leads", status: "running", time: "14m ago" },
      { id: "T-1039", description: "Schedule viewings for Bryanston portfolio", status: "queued", time: "pending" },
      { id: "T-1038", description: "Generate monthly market comparison report", status: "queued", time: "pending" },
    ],
    activity: [
      { time: "11:42", action: "Counter-offer drafted for Bryanston listing" },
      { time: "11:15", action: "New lead captured from Property24 inquiry" },
      { time: "10:48", action: "Automated valuation sent to 3 sellers" },
      { time: "10:20", action: "Open house registration page published" },
      { time: "09:55", action: "Morning lead digest sent to agent" },
    ],
    clients: [
      { name: "Sandton Luxury Homes", tasks: 142, status: "active" },
      { name: "Atlantic Seaboard Properties", tasks: 98, status: "active" },
      { name: "Gauteng Commercial", tasks: 56, status: "active" },
      { name: "Winelands Estates", tasks: 12, status: "setup" },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    icon: "⚖️",
    color: "amber",
    kpis: [
      { label: "Documents drafted", value: "523", change: "+9%", up: true },
      { label: "Research hours saved", value: "218h", change: "+15%", up: true },
      { label: "Cases active", value: "34", change: "+3", up: true },
      { label: "Court dates met", value: "100%", change: "—", up: true },
    ],
    chartData: [
      { label: "Jul", thisMonth: 198, lastMonth: 182 },
      { label: "Jun", thisMonth: 182, lastMonth: 170 },
      { label: "May", thisMonth: 170, lastMonth: 158 },
      { label: "Apr", thisMonth: 158, lastMonth: 145 },
      { label: "Mar", thisMonth: 145, lastMonth: 130 },
      { label: "Feb", thisMonth: 130, lastMonth: 118 },
    ],
    tasks: [
      { id: "T-2218", description: "Complete case law search for delictual liability", status: "done", time: "1m ago" },
      { id: "T-2217", description: "File discovery index — Mthembu vs City of CT", status: "done", time: "7m ago" },
      { id: "T-2216", description: "Draft heads of argument for opposed motion", status: "running", time: "15m ago" },
      { id: "T-2215", description: "Annotate lease agreement clause 14.3 risks", status: "queued", time: "pending" },
      { id: "T-2214", description: "Prepare bundle for High Court filing", status: "queued", time: "pending" },
    ],
    activity: [
      { time: "11:38", action: "Filed notice of opposition in Regional Court" },
      { time: "11:10", action: "Settled matter: Ndlovu vs InsureCo — R340k" },
      { time: "10:45", action: "Served summons on 3 defendants" },
      { time: "10:12", action: "Research memo delivered on POPIA compliance" },
      { time: "09:30", action: "Daily court roll check — 2 matters for tomorrow" },
    ],
    clients: [
      { name: "Mthembu Attorneys", tasks: 89, status: "active" },
      { name: "CT Commercial Law", tasks: 67, status: "active" },
      { name: "Nkosi & Partners", tasks: 45, status: "active" },
      { name: "Durban Legal Aid", tasks: 8, status: "setup" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "📣",
    color: "pink",
    kpis: [
      { label: "Assets created", value: "1,206", change: "+31%", up: true },
      { label: "Campaigns live", value: "18", change: "+4", up: true },
      { label: "Time saved", value: "96h", change: "+22%", up: true },
      { label: "CTR avg", value: "4.8%", change: "+0.9%", up: true },
    ],
    chartData: [
      { label: "Jul", thisMonth: 432, lastMonth: 380 },
      { label: "Jun", thisMonth: 380, lastMonth: 350 },
      { label: "May", thisMonth: 350, lastMonth: 310 },
      { label: "Apr", thisMonth: 310, lastMonth: 275 },
      { label: "Mar", thisMonth: 275, lastMonth: 240 },
      { label: "Feb", thisMonth: 240, lastMonth: 205 },
    ],
    tasks: [
      { id: "T-3306", description: "A/B test report — Variant B +23% CTR", status: "done", time: "3m ago" },
      { id: "T-3305", description: "Publish 3 LinkedIn posts to calendar", status: "done", time: "11m ago" },
      { id: "T-3304", description: "Generate 5 headline variants for Q3", status: "running", time: "19m ago" },
      { id: "T-3303", description: "Competitor ad spend analysis — 12 brands", status: "queued", time: "pending" },
      { id: "T-3302", description: "Draft monthly newsletter for 8.4k subs", status: "queued", time: "pending" },
    ],
    activity: [
      { time: "11:50", action: "Facebook campaign budget reallocated — top performer" },
      { time: "11:22", action: "5 new TikTok ad scripts generated" },
      { time: "10:55", action: "Email open rate report: 34.2% (+2.1% MoM)" },
      { time: "10:30", action: "Google Ads keyword refresh — 120 terms updated" },
      { time: "10:05", action: "Weekly content calendar approved and published" },
    ],
    clients: [
      { name: "TechVentures SaaS", tasks: 234, status: "active" },
      { name: "CapeTown Eats", tasks: 178, status: "active" },
      { name: "Joburg Fitness Co", tasks: 89, status: "active" },
      { name: "Durban Surf Shop", tasks: 15, status: "setup" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: "📊",
    color: "cyan",
    kpis: [
      { label: "Reports generated", value: "389", change: "+7%", up: true },
      { label: "Anomalies flagged", value: "98", change: "+14%", up: true },
      { label: "Portfolios managed", value: "47", change: "+5", up: true },
      { label: "Accuracy rate", value: "99.7%", change: "+0.2%", up: true },
    ],
    chartData: [
      { label: "Jul", thisMonth: 156, lastMonth: 148 },
      { label: "Jun", thisMonth: 148, lastMonth: 140 },
      { label: "May", thisMonth: 140, lastMonth: 132 },
      { label: "Apr", thisMonth: 132, lastMonth: 120 },
      { label: "Mar", thisMonth: 120, lastMonth: 112 },
      { label: "Feb", thisMonth: 112, lastMonth: 98 },
    ],
    tasks: [
      { id: "T-4512", description: "Flag portfolio overweight — Client Nkosi", status: "done", time: "4m ago" },
      { id: "T-4511", description: "Generate Q2 tax summaries — 14 portfolios", status: "done", time: "9m ago" },
      { id: "T-4510", description: "Reconcile 47 transactions — 3 custodial accounts", status: "running", time: "16m ago" },
      { id: "T-4509", description: "Rebalancing alert — S&P exposure at ceiling", status: "queued", time: "pending" },
      { id: "T-4508", description: "Monthly performance reports — 8 clients", status: "queued", time: "pending" },
    ],
    activity: [
      { time: "11:45", action: "Trade instructions prepared — R320k bond rotation" },
      { time: "11:20", action: "Client Mthembu portfolio: +2.14% vs benchmark" },
      { time: "10:55", action: "JSE Top 40 rebalance alert — 3 holdings affected" },
      { time: "10:30", action: "SARB rate decision impact analysis generated" },
      { time: "10:00", action: "Daily market open briefing sent to 12 advisors" },
    ],
    clients: [
      { name: "WealthWise Advisors", tasks: 156, status: "active" },
      { name: "Sandton Private Wealth", tasks: 112, status: "active" },
      { name: "CT Financial Planners", tasks: 78, status: "active" },
      { name: "PE Retirement Solutions", tasks: 5, status: "setup" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: "🏥",
    color: "red",
    kpis: [
      { label: "Patients triaged", value: "2,104", change: "+18%", up: true },
      { label: "Appointments booked", value: "634", change: "+11%", up: true },
      { label: "Time saved", value: "264h", change: "+27%", up: true },
      { label: "Patient satisfaction", value: "4.6/5", change: "+0.2", up: true },
    ],
    chartData: [
      { label: "Jul", thisMonth: 892, lastMonth: 810 },
      { label: "Jun", thisMonth: 810, lastMonth: 745 },
      { label: "May", thisMonth: 745, lastMonth: 690 },
      { label: "Apr", thisMonth: 690, lastMonth: 620 },
      { label: "Mar", thisMonth: 620, lastMonth: 580 },
      { label: "Feb", thisMonth: 580, lastMonth: 510 },
    ],
    tasks: [
      { id: "T-5623", description: "Triage — fever + headache, book 15:00 slot", status: "done", time: "1m ago" },
      { id: "T-5622", description: "Summarise new patient record for Dr Naidoo", status: "done", time: "5m ago" },
      { id: "T-5621", description: "Send appointment reminders — 23 patients", status: "running", time: "12m ago" },
      { id: "T-5620", description: "Flag prescription renewal — Mrs van der Merwe", status: "queued", time: "pending" },
      { id: "T-5619", description: "Respond to 6 WhatsApp patient queries", status: "queued", time: "pending" },
    ],
    activity: [
      { time: "11:48", action: "Urgent triage escalated to Dr Naidoo — chest pain" },
      { time: "11:30", action: "15 appointment confirmations received" },
      { time: "11:05", action: "Patient record update: Mr Jacobs — new allergy noted" },
      { time: "10:40", action: "Prescription refill request processed — 3 patients" },
      { time: "10:15", action: "Morning triage batch complete — 47 patients screened" },
    ],
    clients: [
      { name: "Dr Naidoo Practice", tasks: 320, status: "active" },
      { name: "Waterfront Medical Centre", tasks: 267, status: "active" },
      { name: "Sandton Family Clinic", tasks: 145, status: "active" },
      { name: "Soweto Community Health", tasks: 22, status: "setup" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "🛒",
    color: "orange",
    kpis: [
      { label: "Tickets resolved", value: "3,156", change: "+42%", up: true },
      { label: "Returns processed", value: "892", change: "+18%", up: true },
      { label: "Cart recoveries", value: "R34,200", change: "+29%", up: true },
      { label: "CSAT score", value: "94%", change: "+2%", up: true },
    ],
    chartData: [
      { label: "Jul", thisMonth: 1456, lastMonth: 1280 },
      { label: "Jun", thisMonth: 1280, lastMonth: 1150 },
      { label: "May", thisMonth: 1150, lastMonth: 1020 },
      { label: "Apr", thisMonth: 1020, lastMonth: 890 },
      { label: "Mar", thisMonth: 890, lastMonth: 780 },
      { label: "Feb", thisMonth: 780, lastMonth: 650 },
    ],
    tasks: [
      { id: "T-6714", description: "Resolve ticket #8841 — delivery address update", status: "done", time: "30s ago" },
      { id: "T-6713", description: "Process return RET-ZA-8821-01 Nike Air Max", status: "done", time: "3m ago" },
      { id: "T-6712", description: "Send abandoned cart email #2 — 14 carts", status: "running", time: "8m ago" },
      { id: "T-6711", description: "Investigate sizing trend — UK 8 returns", status: "queued", time: "pending" },
      { id: "T-6710", description: "Answer 12 product questions on PDPs", status: "queued", time: "pending" },
    ],
    activity: [
      { time: "11:52", action: "Flash sale alert sent to 4,200 subscribers" },
      { time: "11:35", action: "Inventory low alert — Nike Air Max UK 9 (3 remaining)" },
      { time: "11:10", action: "14 abandoned carts recovered — R8,200 estimated" },
      { time: "10:45", action: "Negative review flagged for priority response" },
      { time: "10:20", action: "Daily sales digest: R47,300 across 142 orders" },
    ],
    clients: [
      { name: "SneakerHub ZA", tasks: 412, status: "active" },
      { name: "Cape Town Boutique", tasks: 287, status: "active" },
      { name: "TechGear Online", tasks: 198, status: "active" },
      { name: "Durban Home & Living", tasks: 34, status: "setup" },
    ],
  },
];

/* ── colour utilities ────────────────────── */

const colourMap: Record<string, { bg: string; text: string; border: string; light: string; bar: string }> = {
  emerald:  { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", light: "bg-emerald-500/20", bar: "bg-emerald-500" },
  amber:    { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30",   light: "bg-amber-500/20",   bar: "bg-amber-500" },
  pink:     { bg: "bg-pink-500/10",    text: "text-pink-400",    border: "border-pink-500/30",    light: "bg-pink-500/20",    bar: "bg-pink-500" },
  cyan:     { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/30",    light: "bg-cyan-500/20",    bar: "bg-cyan-500" },
  red:      { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30",     light: "bg-red-500/20",     bar: "bg-red-500" },
  orange:   { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30",  light: "bg-orange-500/20",   bar: "bg-orange-500" },
};

/* ── dashboard ───────────────────────────── */

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [industry, setIndustry] = useState<Industry>("realestate");
  const current = industries.find((i) => i.id === industry)!;
  const c = colourMap[current.color];

  // Synthetic date
  const today = new Date().toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#06060b] flex">
      {/* ── Sidebar ──────────────────────── */}
      <aside className="hidden lg:flex w-56 flex-col border-r border-border/40 bg-[#08080f] shrink-0">
        <div className="px-5 py-5 border-b border-border/30">
          <span className="text-lg font-semibold tracking-tight">
            Agents<span className="text-primary">.</span>as
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: "📋", label: "Overview", active: true },
            { icon: "📝", label: "Tasks" },
            { icon: "📊", label: "Analytics" },
            { icon: "👥", label: "Clients" },
            { icon: "⚙️", label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer
                ${item.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-card/50"}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border/30 space-y-2">
          <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Industry
          </p>
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setIndustry(ind.id)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer
                ${industry === ind.id ? `${c.bg} ${c.text} font-medium` : "text-muted-foreground hover:text-foreground"}`}
            >
              <span>{ind.icon}</span>
              {ind.label}
            </button>
          ))}
        </div>

        <div className="px-3 py-4 border-t border-border/30">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-red-400 transition-colors cursor-pointer"
          >
            🚪 Sign out
          </button>
        </div>
      </aside>

      {/* ── Mobile industry bar ───────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08080f] border-t border-border/40 px-2 py-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max px-1">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setIndustry(ind.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                ${industry === ind.id
                  ? `${colourMap[ind.color].bg} ${colourMap[ind.color].text}`
                  : "text-muted-foreground"
                }`}
            >
              <span className="text-sm">{ind.icon}</span>
              <span className="hidden sm:inline">{ind.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────── */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#06060b]/80 backdrop-blur-md border-b border-border/30 px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-medium">
              {current.icon} {current.label} — Overview
            </h1>
            <p className="text-xs text-muted-foreground">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
              {user?.avatar}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI cards */}
          <motion.div
            key={`kpi-${industry}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {current.kpis.map((kpi, i) => (
              <div key={kpi.label} className="rounded-xl border border-border/40 bg-card p-4">
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-semibold ${c.text}`}>{kpi.value}</span>
                  <span className={`text-xs ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Chart + Tasks row */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Chart */}
            <motion.div
              key={`chart-${industry}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:col-span-3 rounded-xl border border-border/40 bg-card p-5"
            >
              <h3 className="text-sm font-medium mb-4">Task volume — 6 month trend</h3>
              <div className="h-52 flex items-end gap-2">
                {current.chartData.map((d, i) => {
                  const maxVal = Math.max(...current.chartData.map((x) => x.thisMonth), 1);
                  const thisH = (d.thisMonth / maxVal) * 100;
                  const lastH = (d.lastMonth / maxVal) * 100;
                  return (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">{d.thisMonth}</span>
                      <div className="w-full flex flex-col justify-end" style={{ height: 170 }}>
                        <motion.div
                          className={`w-full rounded-t-sm ${c.light}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${lastH}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05 }}
                        />
                        <motion.div
                          className={`w-full rounded-t ${c.bar}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${thisH}%` }}
                          transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{d.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className={`size-2.5 rounded-sm ${c.bar}`} /> This month</span>
                <span className="flex items-center gap-1.5"><span className={`size-2.5 rounded-sm ${c.light}`} /> Last month</span>
              </div>
            </motion.div>

            {/* Tasks */}
            <motion.div
              key={`tasks-${industry}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="lg:col-span-2 rounded-xl border border-border/40 bg-card p-5"
            >
              <h3 className="text-sm font-medium mb-3">Recent tasks</h3>
              <div className="space-y-0">
                {current.tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-2 py-2 border-b border-border/20 last:border-0">
                    <span className={`mt-0.5 size-1.5 rounded-full shrink-0 ${
                      task.status === "done" ? "bg-emerald-400" : task.status === "running" ? `${c.bar} animate-pulse` : "bg-border"
                    }`} />
                    <div className="min-w-0">
                      <p className={`text-xs ${task.status === "done" ? "text-muted-foreground line-through" : "text-foreground/80"}`}>
                        {task.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60">{task.id} · {task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Clients + Activity row */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Clients */}
            <motion.div
              key={`clients-${industry}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="lg:col-span-2 rounded-xl border border-border/40 bg-card p-5"
            >
              <h3 className="text-sm font-medium mb-3">Clients</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/20">
                    <th className="text-left py-2 font-medium">Name</th>
                    <th className="text-right py-2 font-medium">Tasks</th>
                    <th className="text-right py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {current.clients.map((client) => (
                    <tr key={client.name} className="border-b border-border/10 last:border-0">
                      <td className="py-2 text-foreground/80">{client.name}</td>
                      <td className="py-2 text-right text-muted-foreground">{client.tasks}</td>
                      <td className="py-2 text-right">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          client.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {client.status === "active" ? "Active" : "Setup"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Activity */}
            <motion.div
              key={`activity-${industry}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="lg:col-span-3 rounded-xl border border-border/40 bg-card p-5"
            >
              <h3 className="text-sm font-medium mb-3">Live activity</h3>
              <div className="space-y-0">
                {current.activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0">
                    <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap mt-0.5">{a.time}</span>
                    <span className="text-xs text-foreground/70">{a.action}</span>
                    {i === 0 && (
                      <span className="ml-auto shrink-0">
                        <span className="relative flex size-1.5">
                          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${c.bar}`} />
                          <span className={`relative inline-flex rounded-full size-1.5 ${c.bar}`} />
                        </span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
