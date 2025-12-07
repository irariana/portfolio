/* ==========================================
   CONFIGURATION TAILWIND CSS
   ==========================================
   
   Ce fichier configure Tailwind CSS pour notre portfolio.
   Il définit les couleurs, animations et autres paramètres
   qui seront disponibles dans nos classes Tailwind.
   
   Pour ajouter une nouvelle couleur :
   1. Définissez-la d'abord dans index.css (variables CSS)
   2. Puis référencez-la ici avec hsl(var(--nom-variable))
*/

import type { Config } from "tailwindcss";

export default {
  // ==========================================
  // MODE SOMBRE
  // ==========================================
  // "class" signifie que le mode sombre s'active avec la classe "dark" sur <html>
  darkMode: ["class"],

  // ==========================================
  // FICHIERS À SCANNER
  // ==========================================
  // Tailwind analyse ces fichiers pour générer uniquement les classes utilisées
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  // Préfixe pour toutes les classes (vide = pas de préfixe)
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
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'Montserrat',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			display: [
  				'Orbitron',
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'IBM Plex Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			],
  			serif: [
  				'Cormorant Garamond',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px hsl(var(--primary) / 0.6)'
  				}
  			},
  			'slide-up': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'scale-in': {
  				from: {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			'gradient-rotate': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			'particle-rise': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(100px) scale(0)'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(-100px) scale(1)'
  				}
  			},
  			typing: {
  				from: {
  					width: '0'
  				},
  				to: {
  					width: '100%'
  				}
  			},
  			'blink-caret': {
  				'from, to': {
  					borderColor: 'transparent'
  				},
  				'50%': {
  					borderColor: 'hsl(var(--primary))'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			float: 'float 6s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'slide-up': 'slide-up 0.6s ease-out',
  			'scale-in': 'scale-in 0.4s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'gradient-rotate': 'gradient-rotate 8s ease infinite',
  			shimmer: 'shimmer 2s linear infinite',
  			'particle-rise': 'particle-rise 4s ease-in-out infinite',
  			typing: 'typing 3.5s steps(40, end)',
  			'blink-caret': 'blink-caret 0.75s step-end infinite'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			glow: '0 0 20px hsl(var(--primary) / 0.3)',
  			'glow-lg': '0 0 40px hsl(var(--primary) / 0.4)',
  			'glow-secondary': '0 0 20px hsl(var(--secondary) / 0.3)',
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

  // ==========================================
  // PLUGINS
  // ==========================================
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
