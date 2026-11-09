import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

// F11 — generated at build time (static export).
export const dynamic = "force-static";
export const alt = `${profile.name} — ${profile.headline.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0A0A0A",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(34,197,94,0.18), transparent 45%)",
        color: "#EDEDED",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#22C55E" }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#22C55E" }} />
        {`${projects.length} projects · 0 critical bugs · PASSED`}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 44, marginTop: 24, color: "#EDEDED" }}>{profile.headline.en}</div>
        <div style={{ fontSize: 28, marginTop: 20, color: "#8A8A8A", maxWidth: 900 }}>
          {profile.tagline.en}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#8A8A8A" }}>
        {["Playwright", "Katalon Studio", "Scrum", "UAT"].map((tag) => (
          <div
            key={tag}
            style={{
              display: "flex",
              padding: "6px 18px",
              borderRadius: 999,
              background: "rgba(34,197,94,0.10)",
              color: "#22C55E",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
