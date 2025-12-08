/* ==========================================
   CONFIGURATION TAILWIND CSS - Style RPG Rétro
   ==========================================
   
   Configuration pour un thème pixel art / rétro gaming.
   Polices pixelisées, couleurs néon, animations arcade.
*/

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  prefix: "",

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          glow: 'hsl(var(--primary-glow))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        tertiary: 'hsl(var(--tertiary))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'pixel': '0px'
      },
      fontFamily: {
        // Police principale - VT323 (terminal rétro)
        sans: [
          'VT323',
          'ui-monospace',
          'monospace'
        ],
        // Police display - Press Start 2P (8-bit)
        display: [
          'Press Start 2P',
          'cursive'
        ],
        // Police pixel moderne
        pixel: [
          'Silkscreen',
          'cursive'
        ],
        // Police mono
        mono: [
          'IBM Plex Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ],
        // Alias pour compatibilité
        serif: [
          'Press Start 2P',
          'cursive'
        ]
      },
      fontSize: {
        // Tailles adaptées pour les polices pixel
        'pixel-xs': ['8px', { lineHeight: '12px' }],
        'pixel-sm': ['10px', { lineHeight: '14px' }],
        'pixel-base': ['12px', { lineHeight: '18px' }],
        'pixel-lg': ['16px', { lineHeight: '24px' }],
        'pixel-xl': ['20px', { lineHeight: '28px' }],
        'pixel-2xl': ['24px', { lineHeight: '32px' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
            textShadow: '0 0 10px hsl(var(--primary) / 0.5)'
          },
          '50%': { 
            boxShadow: '0 0 25px hsl(var(--primary))',
            textShadow: '0 0 25px hsl(var(--primary))'
          }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'gradient-rotate': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'particle-rise': {
          '0%': { opacity: '0', transform: 'translateY(50px) scale(0)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-50px) scale(1)' }
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'hsl(var(--primary))' }
        },
        'arcade-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0.7' }
        },
        'coin-spin': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' }
        },
        'level-up': {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.1)', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' }
        },
        'pixel-border-pulse': {
          '0%, 100%': { 
            borderColor: 'hsl(var(--primary))',
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5)'
          },
          '50%': { 
            borderColor: 'hsl(var(--secondary))',
            boxShadow: '0 0 20px hsl(var(--secondary) / 0.5)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'gradient-rotate': 'gradient-rotate 8s ease infinite',
        shimmer: 'shimmer 2s linear infinite',
        'particle-rise': 'particle-rise 3s ease-in-out infinite',
        typing: 'typing 2s steps(30, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'arcade-blink': 'arcade-blink 1s step-end infinite',
        'coin-spin': 'coin-spin 1s linear infinite',
        'level-up': 'level-up 0.5s ease-out',
        'pixel-border': 'pixel-border-pulse 2s ease-in-out infinite'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glow: '0 0 15px hsl(var(--primary) / 0.5)',
        'glow-lg': '0 0 30px hsl(var(--primary) / 0.6)',
        'glow-secondary': '0 0 15px hsl(var(--secondary) / 0.5)',
        'glow-tertiary': '0 0 15px hsl(var(--tertiary) / 0.5)',
        'pixel': '4px 4px 0 hsl(var(--border))',
        'pixel-lg': '6px 6px 0 hsl(var(--border))',
        '2xs': 'var(--shadow-2xs)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)'
      }
    }
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
