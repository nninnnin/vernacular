export type DesignTokens = {
  color: {
    primary: string;
    neutral: string;
    success: string;
    warning: string;
    error: string;
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

export const defaultTokens: DesignTokens = {
  color: {
    primary: "#0066FF",
    neutral: "#71717A",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
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
