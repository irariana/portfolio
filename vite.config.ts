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
    // On ajoute le base path "/portfolio/" pour correspondre à l'URL de fetch
    server.middlewares.use("/portfolio/api/save-content", async (req: any, res: any, next: any) => {
      if (req.method === "POST") {
        const chunks: Uint8Array[] = [];
        req.on("data", (chunk: any) => chunks.push(chunk));
        req.on("end", () => {
          const body = Buffer.concat(chunks).toString();
          const fs = require("fs");
          // Utilisation de process.cwd() car __dirname n'est pas dispo en ESM (type: module)
          const filePath = path.resolve(process.cwd(), "src/data/content.json");

          try {
            // Formatte le JSON pour qu'il soit lisible
            const formattedJson = JSON.stringify(JSON.parse(body), null, 2);
            fs.writeFileSync(filePath, formattedJson, "utf-8");

            // AUTOMATISATION GIT : Commit & Push
            console.log("Sauvegarde locale effectuée. Lancement du push GitHub...");
            exec(
              'git add . && git commit -m "auto: Mise à jour du contenu via Admin" && git pull --rebase && git push',
              (error, stdout, stderr) => {
                if (error) {
                  // Si l'erreur est juste "rien à commiter", ce n'est pas grave
                  // Note: git commit retourne exit code 1 si rien à commiter
                  if (stdout && stdout.includes("nothing to commit")) {
                    console.log("Rien à commiter.");
                    return;
                  }
                  console.error(`Erreur Git Auto-Push: ${error.message}`);
                  console.error(`Stdout: ${stdout}`);
                  console.error(`Stderr: ${stderr}`);
                  return;
                }
                console.log(`Git Auto-Push Succès: ${stdout}`);
              }
            );

            res.statusCode = 200;
            res.end("Saved & Pushed");
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end("Error saving file");
          }
        });
      } else {
        next();
      }
    });
  },
}));
