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
  // Base path pour GitHub Pages - à modifier avec le nom de ton repo
  base: "/portfolio/",
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
  // Middleware pour sauvegarder le contenu en mode développement
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      // On capture n'importe quelle requête qui finit par /api/save-content
      if (req.method === "POST" && req.url?.includes("/api/save-content")) {
        console.log(`📡 Requête de sauvegarde reçue sur : ${req.url}`);

        const chunks: Uint8Array[] = [];
        req.on("data", (chunk: any) => chunks.push(chunk));

        req.on("end", () => {
          const body = Buffer.concat(chunks).toString();
          const fs = require("fs");
          const filePath = path.resolve(process.cwd(), "src/data/content.json");

          try {
            console.log("📝 Écriture du fichier...");
            const formattedJson = JSON.stringify(JSON.parse(body), null, 2);
            fs.writeFileSync(filePath, formattedJson, "utf-8");

            console.log("🚀 Lancement Git...");
            exec(
              'git add . && git commit -m "auto: Mise à jour du contenu via Admin" && git pull --rebase && git push',
              (error, stdout, stderr) => {
                if (error) {
                  if (stdout && stdout.includes("nothing to commit")) {
                    console.log("Changes : Rien à commiter.");
                    return;
                  }
                  console.error(`❌ Erreur Git: ${error.message}`);
                  return;
                }
                console.log(`✅ Git Succès: ${stdout}`);
              }
            );

            res.statusCode = 200;
            res.end("Saved & Pushed");
          } catch (e: any) {
            console.error("❌ Erreur écriture:", e);
            res.statusCode = 500;
            res.end("Error saving file");
          }
        });
        return; // On arrête là, on ne passe pas à next()
      }

      next();
    });
  },
}));
