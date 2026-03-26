export type Scale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type ColorSeed = {
  neutral: string;
  accent: string;
  mode: "light" | "dark";
};

export type ColorPalette = {
  neutral: Scale;
  accent: Scale;
};

export type ColorSemantic = {
  background: string;
  foreground: string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  "destructive-foreground": string;
};

export type DesignTokens = {
  color: {
    seed: ColorSeed;
    palette: ColorPalette;
    semantic: ColorSemantic;
  };
  typography: {
    fontFamily: string;
    baseFontSize: string;
  };
  spacing: {
    base: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
};

// --- Palette generation ---

const neutralPalettes: Record<string, Scale> = {
  zinc: {
    50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8",
    400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46",
    800: "#27272a", 900: "#18181b", 950: "#09090b",
  },
  slate: {
    50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
    400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
    800: "#1e293b", 900: "#0f172a", 950: "#020617",
  },
  gray: {
    50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db",
    400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151",
    800: "#1f2937", 900: "#111827", 950: "#030712",
  },
  stone: {
    50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1",
    400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c",
    800: "#292524", 900: "#1c1917", 950: "#0c0a09",
  },
};

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hN = h / 360, sN = s / 100, lN = l / 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = lN;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = lN < 0.5 ? lN * (1 + sN) : lN + sN - lN * sN;
    const p = 2 * lN - q;
    r = hue2rgb(p, q, hN + 1 / 3);
    g = hue2rgb(p, q, hN);
    b = hue2rgb(p, q, hN - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateAccentScale(hex: string): Scale {
  const [h, s] = hexToHsl(hex);
  const steps: [keyof Scale, number, number][] = [
    [50,  97, Math.min(s, 30)],
    [100, 94, Math.min(s, 50)],
    [200, 87, Math.min(s, 70)],
    [300, 76, s],
    [400, 63, s],
    [500, 52, s],
    [600, 43, s],
    [700, 35, s],
    [800, 27, Math.round(s * 0.9)],
    [900, 20, Math.round(s * 0.8)],
    [950, 14, Math.round(s * 0.7)],
  ];
  return Object.fromEntries(
    steps.map(([step, l, sat]) => [step, hslToHex(h, sat, l)])
  ) as Scale;
}

export function generatePalette(seed: ColorSeed): ColorPalette {
  return {
    neutral: neutralPalettes[seed.neutral] ?? neutralPalettes.zinc,
    accent: generateAccentScale(seed.accent),
  };
}

export function generateSemantic(
  palette: ColorPalette,
  mode: "light" | "dark"
): ColorSemantic {
  const { neutral, accent } = palette;
  if (mode === "light") {
    return {
      background: neutral[50],
      foreground: neutral[950],
      primary: accent[600],
      "primary-foreground": accent[50],
      secondary: neutral[100],
      "secondary-foreground": neutral[900],
      muted: neutral[100],
      "muted-foreground": neutral[500],
      border: neutral[200],
      input: neutral[200],
      ring: accent[600],
      destructive: "#ef4444",
      "destructive-foreground": "#fafafa",
    };
  } else {
    return {
      background: neutral[950],
      foreground: neutral[50],
      primary: accent[400],
      "primary-foreground": accent[950],
      secondary: neutral[800],
      "secondary-foreground": neutral[50],
      muted: neutral[800],
      "muted-foreground": neutral[400],
      border: neutral[800],
      input: neutral[800],
      ring: accent[400],
      destructive: "#ef4444",
      "destructive-foreground": "#fafafa",
    };
  }
}

// --- Defaults ---

const defaultSeed: ColorSeed = {
  neutral: "zinc",
  accent: "#0066FF",
  mode: "light",
};

const defaultPalette = generatePalette(defaultSeed);

export const defaultTokens: DesignTokens = {
  color: {
    seed: defaultSeed,
    palette: defaultPalette,
    semantic: generateSemantic(defaultPalette, defaultSeed.mode),
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    baseFontSize: "16px",
  },
  spacing: {
    base: "4px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.07)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
  },
};

export const neutralOptions = Object.keys(neutralPalettes);
