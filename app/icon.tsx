import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fdf2ef",
        }}
      >
        <svg width="24" height="18" viewBox="0 0 24 18">
          {/* Body */}
          <rect x="0" y="0" width="24" height="18" rx="2" fill="#e8a8a7" />
          {/* Closed flap (V) */}
          <path d="M0 0 L12 10 L24 0 Z" fill="#d99897" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
