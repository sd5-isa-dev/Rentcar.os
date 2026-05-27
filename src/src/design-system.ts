export const cinematicTheme = {
  colors: {
    matteBlack: "#050506",
    deepCharcoal: "#0D0F14",
    darkGraphite: "#161A22",
    softWhite: "#F5F7FA",
    silver: "#A7AFBD",
    accentPurple: "#7C5CFF",
    accentBlue: "#5C8DFF",
  },
  radii: {
    xs: "10px",
    sm: "14px",
    md: "20px",
    lg: "28px",
    pill: "999px",
  },
  motion: {
    smooth: [0.16, 1, 0.3, 1] as const,
    premium: [0.22, 1, 0.36, 1] as const,
    ambient: [0.4, 0, 0.2, 1] as const,
  },
  spacing: {
    sectionX: "clamp(1rem, 3vw, 5rem)",
    sectionY: "clamp(4rem, 8vw, 8rem)",
    contentMax: "2520px",
  },
};

export type CinematicTheme = typeof cinematicTheme;