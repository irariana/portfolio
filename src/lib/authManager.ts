/* ==========================================
   GESTIONNAIRE D'AUTHENTIFICATION (AUTH MANAGER)
   ==========================================
   
   Ce fichier gère l'authentification de l'administrateur.
   Il utilise localStorage pour stocker le token de session.
   
   IMPORTANT - SÉCURITÉ :
   Cette méthode d'authentification est basique et destinée
   à un usage personnel/portfolio. Pour une vraie application
   avec des données sensibles, utilisez un système plus robuste
   (backend, JWT, OAuth, etc.)
   
   Le mot de passe est hashé en SHA-256 pour plus de sécurité.
*/

// ==========================================
// CONSTANTES
// ==========================================

// Clé pour stocker le token dans localStorage
const AUTH_TOKEN_KEY = "admin_auth_token";

// Clé pour stocker la date d'expiration de la session
const AUTH_EXPIRY_KEY = "admin_auth_expiry";

// Durée de la session en millisecondes (24 heures)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

// Clé pour stocker le hash du mot de passe
const PASSWORD_HASH_KEY = "admin_password_hash";

// Mot de passe par défaut (hashé au premier accès)
// CHANGEZ CE MOT DE PASSE en production !
const DEFAULT_PASSWORD = "admin123";

// ==========================================
// FONCTIONS DE HASHAGE
// ==========================================

/**
 * Hash une chaîne de caractères en SHA-256
 * SHA-256 est un algorithme de hashage cryptographique
 * Il convertit n'importe quelle chaîne en une empreinte de 64 caractères
 * 
 * @param {string} str - La chaîne à hasher
 * @returns {Promise<string>} - Le hash en hexadécimal
 */
async function hashString(str: string): Promise<string> {
  // 1. Convertit la chaîne en tableau d'octets (UTF-8)
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // 2. Calcule le hash SHA-256 (fonction native du navigateur)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // 3. Convertit le buffer en tableau d'octets
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // 4. Convertit chaque octet en caractère hexadécimal (00-ff)
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

// ==========================================
// GESTION DU MOT DE PASSE
// ==========================================

/**
 * Initialise le mot de passe admin si non existant
 * Cette fonction est appelée au chargement de l'app
 */
export async function initializeAuth(): Promise<void> {
  // Vérifie si un hash de mot de passe existe déjà
  const existingHash = localStorage.getItem(PASSWORD_HASH_KEY);

  if (!existingHash) {
    // Première utilisation : hash et stocke le mot de passe par défaut
    const hash = await hashString(DEFAULT_PASSWORD);
    localStorage.setItem(PASSWORD_HASH_KEY, hash);
    console.log(
      "🔐 Mot de passe admin initialisé. Mot de passe par défaut: admin123"
    );
  }
}

/**
 * Change le mot de passe admin
 * @param {string} currentPassword - Mot de passe actuel
 * @param {string} newPassword - Nouveau mot de passe
 * @returns {Promise<boolean>} - true si succès, false sinon
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  // 1. Vérifie que le mot de passe actuel est correct
  const isValid = await verifyPassword(currentPassword);
  if (!isValid) {
    return false;
  }

  // 2. Hash et stocke le nouveau mot de passe
  const newHash = await hashString(newPassword);
  localStorage.setItem(PASSWORD_HASH_KEY, newHash);

  return true;
}

/**
 * Vérifie si un mot de passe est correct
 * @param {string} password - Mot de passe à vérifier
 * @returns {Promise<boolean>} - true si correct, false sinon
 */
export async function verifyPassword(password: string): Promise<boolean> {
  // Récupère le hash stocké
  const storedHash = localStorage.getItem(PASSWORD_HASH_KEY);

  if (!storedHash) {
    // Aucun mot de passe défini, initialise avec la valeur par défaut
    await initializeAuth();
    // Vérifie contre le mot de passe par défaut
    const defaultHash = await hashString(DEFAULT_PASSWORD);
    const inputHash = await hashString(password);
    return defaultHash === inputHash;
  }

  // Compare les hashs
  const inputHash = await hashString(password);
  return storedHash === inputHash;
}

// ==========================================
// GESTION DE LA SESSION
// ==========================================

/**
 * Génère un token de session aléatoire
 * Ce token identifie une session de connexion
 * @returns {string} - Token aléatoire de 32 caractères
 */
function generateSessionToken(): string {
  // Crée un tableau de 16 octets aléatoires
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // Convertit en chaîne hexadécimale
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Connecte l'administrateur
 * Crée une nouvelle session avec un token unique
 * 
 * @param {string} password - Mot de passe à vérifier
 * @returns {Promise<boolean>} - true si connexion réussie
 */
export async function login(password: string): Promise<boolean> {
  // 1. Vérifie le mot de passe
  const isValid = await verifyPassword(password);

  if (!isValid) {
    return false;
  }

  // 2. Génère un nouveau token de session
  const token = generateSessionToken();

  // 3. Calcule la date d'expiration
  const expiry = Date.now() + SESSION_DURATION;

  // 4. Stocke le token et la date d'expiration
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_EXPIRY_KEY, expiry.toString());

  return true;
}

/**
 * Déconnecte l'administrateur
 * Supprime le token de session
 */
export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
}

/**
 * Vérifie si l'administrateur est actuellement connecté
 * Vérifie l'existence du token ET sa validité temporelle
 * 
 * @returns {boolean} - true si connecté et session valide
 */
export function isAuthenticated(): boolean {
  // 1. Récupère le token et la date d'expiration
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);

  // 2. Vérifie que le token existe
  if (!token || !expiry) {
    return false;
  }

  // 3. Vérifie que la session n'a pas expiré
  const expiryTime = parseInt(expiry, 10);
  if (Date.now() > expiryTime) {
    // Session expirée, nettoie le stockage
    logout();
    return false;
  }

  return true;
}

/**
 * Prolonge la session si elle est valide
 * À appeler lors d'activité utilisateur pour éviter la déconnexion
 */
export function extendSession(): void {
  if (isAuthenticated()) {
    const newExpiry = Date.now() + SESSION_DURATION;
    localStorage.setItem(AUTH_EXPIRY_KEY, newExpiry.toString());
  }
}

/**
 * Récupère le temps restant de la session en millisecondes
 * @returns {number} - Temps restant, 0 si non connecté
 */
export function getSessionTimeRemaining(): number {
  const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
  if (!expiry || !isAuthenticated()) {
    return 0;
  }

  const remaining = parseInt(expiry, 10) - Date.now();
  return Math.max(0, remaining);
}
