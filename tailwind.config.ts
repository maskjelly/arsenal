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
  // Keeping DaisyUI but updating the theme colors to better match shadcn/ui
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "hsl(var(--primary))",
          "secondary": "hsl(var(--secondary))",
          "accent": "hsl(var(--accent))",
          "neutral": "hsl(var(--muted))",
          "base-100": "hsl(var(--background))",
          "info": "hsl(var(--info))",
          "success": "hsl(var(--success))",
          "warning": "hsl(var(--warning))",
          "error": "hsl(var(--destructive))",
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