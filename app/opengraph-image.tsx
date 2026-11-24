import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ISKCON Youth Forum Sylhet · IYF Sylhet · Sri Sri Radha Madhava Mandir, Jugaltila";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#fdfaf3",
          padding: "60px 70px",
          border: "16px solid #7b1113",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#7b1113",
              color: "#fdfaf3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            ॐ
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                color: "#7b1113",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              ISKCON YOUTH FORUM · SYLHET
            </span>
            <span style={{ fontSize: "16px", color: "#544a42" }}>
              Sri Sri Radha Madhava Mandir · Jugaltila, Sylhet
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              fontSize: "54px",
              color: "#1d1716",
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            ISKCON Youth Forum Sylhet
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#544a42",
              maxWidth: "950px",
              lineHeight: 1.4,
            }}
          >
            IYF Sylhet · Youth Wing at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir).
            Daily Darshan, Aarti, Gita Study, Kirtan & Youth Seminars.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid rgba(123, 17, 19, 0.2)",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#7b1113", fontWeight: 600 }}>
            iyf sylhet · sylhet iskcon mondir · iskcon sylhet
          </span>
          <span style={{ fontSize: "18px", color: "#544a42" }}>
            Jugaltila, Kajalshah · Sylhet 3140
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
