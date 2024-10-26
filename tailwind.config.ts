import { type Config } from "tailwindcss"

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)'
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        slideDown: {
          from: { 
            height: '0',
            opacity: '0'
          },
          to: { 
            height: 'var(--radix-collapsible-content-height)',
            opacity: '1'
          },
        },
        slideUp: {
          from: { 
            height: 'var(--radix-collapsible-content-height)',
            opacity: '1'
          },
          to: { 
            height: '0',
            opacity: '0'
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 0.5s ease-out",
        "shimmer": "shimmer 2s infinite",
        "slideDown": "slideDown 0.3s ease-out",
        "slideUp": "slideUp 0.3s ease-out"
      },
    },
  },
  // Updated DaisyUI theme with proper color values
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2563eb",          // Blue
          "secondary": "#4b5563",        // Gray
          "accent": "#db2777",           // Pink
          "neutral": "#1f2937",          // Dark gray
          "base-100": "#ffffff",         // White
          "info": "#3b82f6",            // Light blue
          "success": "#22c55e",          // Green
          "warning": "#f59e0b",          // Amber
          "error": "#ef4444",           // Red
          
          // Optional: Adding some additional color modifications
          "base-content": "#1f2937",     // Text color
          "primary-focus": "#1d4ed8",    // Darker blue for focus states
          "secondary-focus": "#374151",   // Darker gray for focus states
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
  plugins: [
    require("tailwindcss-animate"),
    require('daisyui'),
  ],
}

export default config