import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { exec } from "child_process";

// https://vitejs.dev/config/
// GITHUB PAGES : Change "/NOM-DU-REPO/" par le nom de ton repository
// Exemple : Si ton repo s'appelle "mon-portfolio", mets "/mon-portfolio/"
// Si tu utilises un domaine custom, laisse "/" 
export default defineConfig(({ mode }) => ({
  // IMPORTANT : On n'utilise "/portfolio/" que sur GitHub Pages (production).
  // En local, on reste à la racine "/" pour éviter les erreurs 404 API.
  base: mode === "production" ? "/portfolio/" : "/",

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
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },

  // Middleware pour sauvegarder le contenu en mode développement
  configureServer(server: any) {
    // URL plus standard maintenant qu'on est à la racine en dev
    const SAVE_ENDPOINT = "/api/save";

    server.middlewares.use(async (req: any, res: any, next: any) => {
      const url = req.url?.split('?')[0];

      if (req.method === "POST" && url === SAVE_ENDPOINT) {
        console.log("🔥 MIDDLEWARE VITE : Sauvegarde déclenchée !");

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        const chunks: Uint8Array[] = [];
        req.on("data", (chunk: any) => chunks.push(chunk));

        req.on("end", () => {
          const body = Buffer.concat(chunks).toString();
          const fs = require("fs");
          const filePath = path.resolve(process.cwd(), "src/data/content.json");

          try {
            console.log("📝 Écriture sur disque...");
            // Validation et formatage JSON
            const formattedJson = JSON.stringify(JSON.parse(body), null, 2);
            fs.writeFileSync(filePath, formattedJson, "utf-8");

            console.log("🤖 Git Auto-Commit activé...");
            exec(
              'git add . && git commit -m "auto: Content Update" && git pull --rebase && git push',
              (error, stdout, stderr) => {
                if (error) {
                  if (stdout && stdout.includes("nothing to commit")) {
                    console.log("ℹ️ Git: Rien à modifier.");
                  } else {
                    console.error(`❌ Git Erreur: ${error.message}`);
                  }
                } else {
                  console.log(`✅ Git Succès: ${stdout}`);
                }
              }
            );

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: "Sauvegardé" }));
          } catch (e: any) {
            console.error("❌ CRASH Sauvegarde:", e);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
        return;
      }

      next();
    });
  },
}));
