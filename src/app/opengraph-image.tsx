import { ImageResponse } from "next/og";

export const alt =
  "Agents.as — Hire an AI agent for your business. Live in 48 hours, priced in rands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0e0d17",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: 120,
            width: 640,
            height: 480,
            borderRadius: 9999,
            background: "#5b3df0",
            opacity: 0.28,
            filter: "blur(140px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: 80,
            width: 560,
            height: 460,
            borderRadius: 9999,
            background: "#1f7ea8",
            opacity: 0.22,
            filter: "blur(140px)",
          }}
        />

        {/* wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#8b7cf8",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#f2f1f7" }}>
            Agents.as
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#f2f1f7",
            fontSize: 92,
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: -3,
            textAlign: "center",
          }}
        >
          <div>Don&apos;t hire more people.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>Hire</span>
            <span
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(90deg, #a78bfa 0%, #7dd3fc 50%, #c084fc 100%)",
                backgroundClip: "text",
                color: "transparent",
                paddingRight: 8,
              }}
            >
              the agent.
            </span>
          </div>
        </div>

        {/* meta strip */}
        <div
          style={{
            display: "flex",
            gap: 36,
            marginTop: 56,
            fontSize: 24,
            color: "#9b98ad",
          }}
        >
          <span>Live in 48 hours</span>
          <span style={{ color: "#5b5870" }}>·</span>
          <span>From R499/month</span>
          <span style={{ color: "#5b5870" }}>·</span>
          <span>14-day free trial</span>
        </div>
      </div>
    ),
    size
  );
}
