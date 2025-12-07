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
    // ==========================================
    // CONTAINER
    // ==========================================
    // Configuration du conteneur centré
    container: {
      center: true,           // Centre automatiquement le conteneur
      padding: "2rem",        // Padding interne de 2rem (32px)
      screens: {
        "2xl": "1400px",      // Largeur max sur grands écrans
      },
    },

    // ==========================================
    // EXTENSIONS DU THÈME
    // ==========================================
    // extend = ajoute sans remplacer les valeurs par défaut de Tailwind
    extend: {
      // ------------------------------------------
      // COULEURS PERSONNALISÉES
      // ------------------------------------------
      // Ces couleurs utilisent les variables CSS définies dans index.css
      colors: {
        // Couleurs de base
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Couleur primaire (cyan néon)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },

        // Couleur secondaire (magenta)
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Couleur tertiaire (rose/pink)
        tertiary: "hsl(var(--tertiary))",

        // Couleur destructive (rouge pour erreurs/suppressions)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Couleur de succès (vert)
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },

        // Éléments atténués
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // Accents
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Popover/menus
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Cartes
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Sidebar
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      // ------------------------------------------
      // BORDER RADIUS (Rayons de bordure)
      // ------------------------------------------
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ------------------------------------------
      // POLICES DE CARACTÈRES
      // ------------------------------------------
      fontFamily: {
        // Police principale - Moderne et lisible
        sans: ["Inter", "system-ui", "sans-serif"],
        // Police pour les titres - Style gaming
        display: ["Orbitron", "Inter", "sans-serif"],
        // Police monospace pour le code
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      // ------------------------------------------
      // KEYFRAMES D'ANIMATION
      // ------------------------------------------
      keyframes: {
        // Animation accordion (déjà présente dans shadcn)
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // Animation de flottement
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },

        // Animation de pulsation lumineuse
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(var(--primary) / 0.6)",
          },
        },

        // Animation d'apparition depuis le bas
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },

        // Animation d'apparition avec scale
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },

        // Animation de fondu
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },

        // Animation de rotation dégradé
        "gradient-rotate": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },

        // Animation de shimmer (effet de brillance)
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        // Animation des particules
        "particle-rise": {
          "0%": {
            opacity: "0",
            transform: "translateY(100px) scale(0)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-100px) scale(1)",
          },
        },

        // Animation de typing (machine à écrire)
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },

        // Animation du curseur clignotant
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "hsl(var(--primary))" },
        },
      },

      // ------------------------------------------
      // ANIMATIONS (utilisent les keyframes ci-dessus)
      // ------------------------------------------
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "gradient-rotate": "gradient-rotate 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "particle-rise": "particle-rise 4s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
        "blink-caret": "blink-caret 0.75s step-end infinite",
      },

      // ------------------------------------------
      // BACKDROP BLUR
      // ------------------------------------------
      backdropBlur: {
        xs: "2px",
      },

      // ------------------------------------------
      // BOX SHADOW PERSONNALISÉES
      // ------------------------------------------
      boxShadow: {
        glow: "0 0 20px hsl(var(--primary) / 0.3)",
        "glow-lg": "0 0 40px hsl(var(--primary) / 0.4)",
        "glow-secondary": "0 0 20px hsl(var(--secondary) / 0.3)",
      },
    },
  },

  // ==========================================
  // PLUGINS
  // ==========================================
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
