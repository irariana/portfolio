import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// GITHUB PAGES : Change "/NOM-DU-REPO/" par le nom de ton repository
// Exemple : Si ton repo s'appelle "mon-portfolio", mets "/mon-portfolio/"
// Si tu utilises un domaine custom, laisse "/" 
export default defineConfig(({ mode }) => ({
  // Base path pour GitHub Pages - à modifier avec le nom de ton repo
  base: "https://github.com/irariana/portfolio-intern",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    // Génère un fichier 404.html identique à index.html pour le routing SPA
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
