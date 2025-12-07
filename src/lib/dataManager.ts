/* ==========================================
   GESTIONNAIRE DE DONNÉES (DATA MANAGER)
   ==========================================
   
   Ce fichier gère toutes les données du portfolio.
   Il utilise localStorage pour sauvegarder les données
   directement dans le navigateur de l'utilisateur.
   
   localStorage = stockage persistant dans le navigateur
   - Les données restent même après fermeture du navigateur
   - Capacité d'environ 5MB par domaine
   - Données stockées en format texte (JSON)
   
   IMPORTANT : Ces données sont locales à chaque navigateur.
   Si vous voulez des données partagées, il faudrait un backend.
*/

// ==========================================
// INTERFACES TYPESCRIPT
// ==========================================
// Les interfaces définissent la "forme" de nos données
// TypeScript vérifiera que nos données respectent ces formes

/**
 * Interface pour les liens vers les réseaux sociaux
 * Chaque propriété est optionnelle (?)
 */
export interface SocialLinks {
  github?: string;      // Lien vers le profil GitHub
  linkedin?: string;    // Lien vers le profil LinkedIn
  email?: string;       // Adresse email
  twitter?: string;     // Lien vers Twitter/X
}

/**
 * Interface pour le profil utilisateur
 * Contient toutes les informations personnelles
 */
export interface Profile {
  name: string;         // Nom complet
  title: string;        // Titre professionnel
  bio: string;          // Biographie courte
  avatar: string;       // URL de la photo de profil
  socials: SocialLinks; // Liens réseaux sociaux
}

/**
 * Interface pour une compétence
 */
export interface Skill {
  id: string;           // Identifiant unique (généré automatiquement)
  name: string;         // Nom de la compétence (ex: "Python")
  category: string;     // Catégorie (ex: "Langages", "Data")
  level: number;        // Niveau de maîtrise (0-100)
  icon?: string;        // Nom de l'icône (optionnel)
}

/**
 * Interface pour un projet
 */
export interface Project {
  id: string;           // Identifiant unique
  title: string;        // Titre du projet
  description: string;  // Description détaillée
  image: string;        // URL de l'image/screenshot
  technologies: string[]; // Liste des technologies utilisées
  githubUrl?: string;   // Lien GitHub (optionnel)
  demoUrl?: string;     // Lien démo live (optionnel)
  featured: boolean;    // Projet mis en avant ?
}

/**
 * Interface pour un article de blog
 */
export interface Article {
  id: string;           // Identifiant unique
  title: string;        // Titre de l'article
  excerpt: string;      // Résumé/extrait
  content: string;      // Contenu complet (Markdown)
  date: string;         // Date de publication
  published: boolean;   // Publié ou brouillon ?
  tags: string[];       // Tags/catégories
}

/**
 * Interface pour un message de contact
 */
export interface ContactMessage {
  id: string;           // Identifiant unique
  name: string;         // Nom de l'expéditeur
  email: string;        // Email de l'expéditeur
  message: string;      // Contenu du message
  date: string;         // Date de réception
  read: boolean;        // Lu ou non lu ?
}

/**
 * Interface principale contenant TOUTES les données du site
 */
export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  articles: Article[];
  messages: ContactMessage[];
}

// ==========================================
// DONNÉES PAR DÉFAUT
// ==========================================
// Ces données sont utilisées lors de la première visite
// ou si les données sont corrompues/supprimées

const defaultData: PortfolioData = {
  // ------------------------------------------
  // Profil par défaut
  // ------------------------------------------
  profile: {
    name: "Alexandre Dupont",
    title: "Étudiant BUT Science des Données",
    bio: "Passionné par la Data Science, les jeux vidéo et les animés. Je cherche à appliquer l'analyse de données dans mes domaines de passion : e-sport, statistiques sportives et recommandation de contenus.",
    avatar: "",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "contact@example.com",
    },
  },

  // ------------------------------------------
  // Compétences par défaut
  // ------------------------------------------
  skills: [
    // Langages de programmation
    {
      id: "skill-1",
      name: "Python",
      category: "Langages",
      level: 80,
      icon: "code",
    },
    {
      id: "skill-2",
      name: "HTML/CSS",
      category: "Langages",
      level: 75,
      icon: "code",
    },
    {
      id: "skill-3",
      name: "JavaScript",
      category: "Langages",
      level: 65,
      icon: "code",
    },
    {
      id: "skill-4",
      name: "SQL",
      category: "Langages",
      level: 70,
      icon: "database",
    },
    // Data Science
    {
      id: "skill-5",
      name: "Pandas",
      category: "Data Science",
      level: 85,
      icon: "bar-chart",
    },
    {
      id: "skill-6",
      name: "NumPy",
      category: "Data Science",
      level: 75,
      icon: "calculator",
    },
    {
      id: "skill-7",
      name: "Matplotlib",
      category: "Data Science",
      level: 80,
      icon: "line-chart",
    },
    {
      id: "skill-8",
      name: "Scikit-learn",
      category: "Data Science",
      level: 60,
      icon: "brain",
    },
    // Outils
    {
      id: "skill-9",
      name: "Git & GitHub",
      category: "Outils",
      level: 70,
      icon: "git-branch",
    },
    {
      id: "skill-10",
      name: "Visualisation",
      category: "Data Science",
      level: 75,
      icon: "pie-chart",
    },
  ],

  // ------------------------------------------
  // Projets par défaut
  // ------------------------------------------
  projects: [
    {
      id: "project-1",
      title: "Analyse E-Sport LoL",
      description:
        "Analyse statistique des performances des joueurs professionnels de League of Legends. Visualisation des KDA, winrates et méta-analyse des champions.",
      image: "",
      technologies: ["Python", "Pandas", "Matplotlib", "Riot API"],
      githubUrl: "https://github.com",
      demoUrl: "",
      featured: true,
    },
    {
      id: "project-2",
      title: "Prédiction Football",
      description:
        "Modèle de machine learning pour prédire les résultats de matchs de football en utilisant les statistiques historiques des équipes.",
      image: "",
      technologies: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
      githubUrl: "https://github.com",
      demoUrl: "",
      featured: true,
    },
    {
      id: "project-3",
      title: "Recommandation Animés",
      description:
        "Système de recommandation d'animés basé sur le filtrage collaboratif. Analyse des préférences utilisateurs pour suggérer de nouveaux contenus.",
      image: "",
      technologies: ["Python", "Surprise", "Flask", "React"],
      githubUrl: "https://github.com",
      demoUrl: "",
      featured: true,
    },
    {
      id: "project-4",
      title: "Dashboard Gaming Stats",
      description:
        "Dashboard interactif affichant les statistiques de jeu personnelles avec graphiques temps réel et analyses de performance.",
      image: "",
      technologies: ["JavaScript", "Chart.js", "Node.js", "Steam API"],
      githubUrl: "https://github.com",
      demoUrl: "",
      featured: false,
    },
  ],

  // ------------------------------------------
  // Articles par défaut (blog)
  // ------------------------------------------
  articles: [
    {
      id: "article-1",
      title: "Comment la Data Science révolutionne l'E-Sport",
      excerpt:
        "Découvrez comment les équipes professionnelles utilisent l'analyse de données pour optimiser leurs stratégies et performances.",
      content:
        "# Introduction\n\nL'e-sport moderne est de plus en plus data-driven...",
      date: "2024-01-15",
      published: true,
      tags: ["Data Science", "E-Sport", "Gaming"],
    },
    {
      id: "article-2",
      title: "Créer un système de recommandation d'animés",
      excerpt:
        "Guide pratique pour construire votre propre système de recommandation en Python avec des algorithmes de filtrage collaboratif.",
      content:
        "# Prérequis\n\nPour ce tutoriel, vous aurez besoin de Python 3.8+...",
      date: "2024-02-20",
      published: true,
      tags: ["Python", "Machine Learning", "Animés"],
    },
  ],

  // Messages de contact (vide par défaut)
  messages: [],
};

// ==========================================
// CLÉ DE STOCKAGE LOCALSTORAGE
// ==========================================
// Cette clé identifie nos données dans le localStorage
const STORAGE_KEY = "portfolio_data";

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

/**
 * Génère un identifiant unique
 * Utilise la date actuelle + un nombre aléatoire
 * @returns {string} - ID unique (ex: "1703234567890-abc123")
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Récupère toutes les données du portfolio
 * Si aucune donnée n'existe, retourne les données par défaut
 * @returns {PortfolioData} - Toutes les données du portfolio
 */
export function getData(): PortfolioData {
  try {
    // 1. Récupère les données du localStorage
    const stored = localStorage.getItem(STORAGE_KEY);

    // 2. Si aucune donnée, retourne les données par défaut
    if (!stored) {
      // Sauvegarde les données par défaut pour la prochaine fois
      saveData(defaultData);
      return defaultData;
    }

    // 3. Parse le JSON en objet JavaScript
    // JSON.parse convertit une chaîne JSON en objet
    const parsed = JSON.parse(stored) as PortfolioData;

    // 4. Fusionne avec les données par défaut pour éviter les champs manquants
    // Cela assure la compatibilité si on ajoute de nouveaux champs
    return {
      profile: { ...defaultData.profile, ...parsed.profile },
      skills: parsed.skills || defaultData.skills,
      projects: parsed.projects || defaultData.projects,
      articles: parsed.articles || defaultData.articles,
      messages: parsed.messages || defaultData.messages,
    };
  } catch (error) {
    // En cas d'erreur (JSON corrompu), log l'erreur et retourne les défauts
    console.error("Erreur lors de la lecture des données:", error);
    return defaultData;
  }
}

/**
 * Sauvegarde toutes les données dans le localStorage
 * @param {PortfolioData} data - Les données à sauvegarder
 */
export function saveData(data: PortfolioData): void {
  try {
    // JSON.stringify convertit un objet en chaîne JSON
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données:", error);
  }
}

// ==========================================
// FONCTIONS SPÉCIFIQUES PAR TYPE DE DONNÉE
// ==========================================

/**
 * Met à jour le profil utilisateur
 * @param {Partial<Profile>} updates - Les champs à mettre à jour
 * 
 * Partial<Profile> signifie que seuls certains champs peuvent être fournis
 * Exemple: updateProfile({ name: "Nouveau Nom" }) 
 */
export function updateProfile(updates: Partial<Profile>): void {
  const data = getData();
  // Spread operator (...) fusionne l'ancien profil avec les nouvelles valeurs
  data.profile = { ...data.profile, ...updates };
  saveData(data);
}

/**
 * Récupère le profil utilisateur
 * @returns {Profile} - Le profil complet
 */
export function getProfile(): Profile {
  return getData().profile;
}

// ------------------------------------------
// GESTION DES COMPÉTENCES (SKILLS)
// ------------------------------------------

/**
 * Récupère toutes les compétences
 * @returns {Skill[]} - Tableau de compétences
 */
export function getSkills(): Skill[] {
  return getData().skills;
}

/**
 * Ajoute une nouvelle compétence
 * @param {Omit<Skill, "id">} skill - Compétence sans ID (sera généré)
 * 
 * Omit<Skill, "id"> = type Skill mais sans le champ "id"
 */
export function addSkill(skill: Omit<Skill, "id">): void {
  const data = getData();
  // Crée un nouvel objet avec un ID généré automatiquement
  const newSkill: Skill = {
    ...skill,
    id: generateId(),
  };
  // Ajoute à la fin du tableau
  data.skills.push(newSkill);
  saveData(data);
}

/**
 * Met à jour une compétence existante
 * @param {string} id - ID de la compétence à modifier
 * @param {Partial<Skill>} updates - Les champs à mettre à jour
 */
export function updateSkill(id: string, updates: Partial<Skill>): void {
  const data = getData();
  // Trouve l'index de la compétence dans le tableau
  const index = data.skills.findIndex((s) => s.id === id);
  if (index !== -1) {
    // Fusionne les anciennes et nouvelles valeurs
    data.skills[index] = { ...data.skills[index], ...updates };
    saveData(data);
  }
}

/**
 * Supprime une compétence
 * @param {string} id - ID de la compétence à supprimer
 */
export function deleteSkill(id: string): void {
  const data = getData();
  // filter crée un nouveau tableau sans l'élément à supprimer
  data.skills = data.skills.filter((s) => s.id !== id);
  saveData(data);
}

// ------------------------------------------
// GESTION DES PROJETS
// ------------------------------------------

/**
 * Récupère tous les projets
 * @returns {Project[]} - Tableau de projets
 */
export function getProjects(): Project[] {
  return getData().projects;
}

/**
 * Ajoute un nouveau projet
 * @param {Omit<Project, "id">} project - Projet sans ID
 */
export function addProject(project: Omit<Project, "id">): void {
  const data = getData();
  const newProject: Project = {
    ...project,
    id: generateId(),
  };
  data.projects.push(newProject);
  saveData(data);
}

/**
 * Met à jour un projet existant
 * @param {string} id - ID du projet
 * @param {Partial<Project>} updates - Modifications
 */
export function updateProject(id: string, updates: Partial<Project>): void {
  const data = getData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    data.projects[index] = { ...data.projects[index], ...updates };
    saveData(data);
  }
}

/**
 * Supprime un projet
 * @param {string} id - ID du projet
 */
export function deleteProject(id: string): void {
  const data = getData();
  data.projects = data.projects.filter((p) => p.id !== id);
  saveData(data);
}

// ------------------------------------------
// GESTION DES ARTICLES
// ------------------------------------------

/**
 * Récupère tous les articles
 * @param {boolean} publishedOnly - Si true, retourne seulement les publiés
 */
export function getArticles(publishedOnly = false): Article[] {
  const articles = getData().articles;
  if (publishedOnly) {
    return articles.filter((a) => a.published);
  }
  return articles;
}

/**
 * Ajoute un nouvel article
 */
export function addArticle(article: Omit<Article, "id">): void {
  const data = getData();
  const newArticle: Article = {
    ...article,
    id: generateId(),
  };
  data.articles.push(newArticle);
  saveData(data);
}

/**
 * Met à jour un article
 */
export function updateArticle(id: string, updates: Partial<Article>): void {
  const data = getData();
  const index = data.articles.findIndex((a) => a.id === id);
  if (index !== -1) {
    data.articles[index] = { ...data.articles[index], ...updates };
    saveData(data);
  }
}

/**
 * Supprime un article
 */
export function deleteArticle(id: string): void {
  const data = getData();
  data.articles = data.articles.filter((a) => a.id !== id);
  saveData(data);
}

// ------------------------------------------
// GESTION DES MESSAGES DE CONTACT
// ------------------------------------------

/**
 * Récupère tous les messages
 */
export function getMessages(): ContactMessage[] {
  return getData().messages;
}

/**
 * Ajoute un nouveau message de contact
 * Appelé quand quelqu'un soumet le formulaire de contact
 */
export function addMessage(
  message: Omit<ContactMessage, "id" | "date" | "read">
): void {
  const data = getData();
  const newMessage: ContactMessage = {
    ...message,
    id: generateId(),
    date: new Date().toISOString(), // Date actuelle au format ISO
    read: false, // Non lu par défaut
  };
  data.messages.push(newMessage);
  saveData(data);
}

/**
 * Marque un message comme lu
 */
export function markMessageAsRead(id: string): void {
  const data = getData();
  const index = data.messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    data.messages[index].read = true;
    saveData(data);
  }
}

/**
 * Supprime un message
 */
export function deleteMessage(id: string): void {
  const data = getData();
  data.messages = data.messages.filter((m) => m.id !== id);
  saveData(data);
}

// ------------------------------------------
// EXPORT/IMPORT DES DONNÉES
// ------------------------------------------

/**
 * Exporte toutes les données en JSON
 * Permet de sauvegarder une copie de ses données
 * @returns {string} - Données au format JSON
 */
export function exportData(): string {
  return JSON.stringify(getData(), null, 2);
  // null, 2 = formatage avec indentation de 2 espaces (plus lisible)
}

/**
 * Importe des données depuis un JSON
 * Permet de restaurer une sauvegarde
 * @param {string} jsonString - Données JSON à importer
 * @returns {boolean} - true si succès, false si erreur
 */
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as PortfolioData;
    // Vérifie que les données ont la bonne structure
    if (data.profile && data.skills && data.projects) {
      saveData(data);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Réinitialise toutes les données aux valeurs par défaut
 * ATTENTION : Cette action est irréversible !
 */
export function resetData(): void {
  saveData(defaultData);
}
