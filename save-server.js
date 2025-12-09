import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Nécessaire pour __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
// Chemin absolu vers le fichier content.json
const DATA_FILE = path.resolve(__dirname, 'src/data/content.json');

console.log('=================================================');
console.log(`🤖 SERVEUR DE SAUVEGARDE DÉMARRÉ SUR LE PORT ${PORT}`);
console.log(`📂 Fichier cible : ${DATA_FILE}`);
console.log('=================================================');

const server = http.createServer((req, res) => {
    // 1. GESTION DES HEADERS CORS (Sécurité)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. GESTION DES REQUÊTES "PREFLIGHT" (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // 3. RECUPERATION DU CONTENU DU FICHIER (Méthode GET pour test)
    if (req.method === 'GET' && req.url === '/api/content') {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        } catch (e) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

    // 4. SAUVEGARDE (Méthode POST)
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                console.log('📥 Données reçues, écriture en cours...');

                // Vérifier que le JSON est valide
                const jsonContent = JSON.parse(body);
                const formattedContent = JSON.stringify(jsonContent, null, 2);

                // Écriture du fichier
                fs.writeFileSync(DATA_FILE, formattedContent, 'utf-8');
                console.log('✅ Fichier content.json mis à jour.');

                // Exécution Git
                console.log('🚀 Exécution des commandes Git...');
                exec('git add . && git commit -m "update: contenu via admin" && git pull --rebase && git push', (err, stdout, stderr) => {
                    if (err) {
                        // On log l'erreur mais on ne bloque pas la réponse si c'est juste "nothing to commit"
                        console.log('ℹ️ Info Git:', stdout || err.message);
                    } else {
                        console.log('✅ Git Push succès !');
                    }
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Sauvegardé avec succès !' }));

            } catch (error) {
                console.error('❌ Erreur:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Erreur serveur intern' }));
            }
        });
        return;
    }

    // 404 pour le reste
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Prêt à recevoir les sauvegardes sur http://localhost:${PORT}`);
    console.log(`Gardez cette fenêtre ouverte pendant que vous modifiez le site.`);
});
