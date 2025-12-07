/* ==========================================
   COMPOSANT ABOUT SECTION (À PROPOS)
   ==========================================
   
   Section présentant le créateur du portfolio.
   
   Contient :
   - Photo/Avatar avec effet de bordure animée
   - Biographie courte
   - Valeurs personnelles
   - Timeline de formation
   - Centres d'intérêt avec icônes
*/

import { useEffect, useState } from "react";
import {
  User,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Rocket,
  Heart,
  Gamepad2,
  Trophy,
  Tv,
  Code,
  Calendar,
} from "lucide-react";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// DONNÉES DE LA TIMELINE DE FORMATION
// ==========================================

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: typeof GraduationCap;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "BUT Science des Données - 2ème année",
    description:
      "Approfondissement en Machine Learning, statistiques avancées et visualisation de données.",
    icon: GraduationCap,
  },
  {
    year: "2023",
    title: "BUT Science des Données - 1ère année",
    description:
      "Fondamentaux de la programmation Python, SQL, et introduction aux statistiques.",
    icon: Code,
  },
  {
    year: "2022",
    title: "Baccalauréat",
    description:
      "Obtention du baccalauréat avec spécialités mathématiques et NSI.",
    icon: GraduationCap,
  },
];

// ==========================================
// DONNÉES DES VALEURS
// ==========================================

interface Value {
  icon: typeof Lightbulb;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Lightbulb,
    title: "Curiosité",
    description: "Toujours apprendre et explorer de nouveaux domaines",
  },
  {
    icon: Sparkles,
    title: "Créativité",
    description: "Trouver des solutions innovantes aux problèmes",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Repousser les limites de ce qui est possible",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Mettre du cœur dans chaque projet",
  },
];

// ==========================================
// DONNÉES DES CENTRES D'INTÉRÊT
// ==========================================

interface Interest {
  icon: typeof Gamepad2;
  name: string;
  color: string;
}

const interests: Interest[] = [
  { icon: Gamepad2, name: "Jeux Vidéo", color: "text-primary" },
  { icon: Trophy, name: "E-Sport", color: "text-secondary" },
  { icon: Tv, name: "Animés", color: "text-tertiary" },
  { icon: Code, name: "Programmation", color: "text-primary" },
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function AboutSection() {
  // État pour stocker les données du profil
  const [profile, setProfile] = useState<Profile | null>(null);

  // Charge les données au montage du composant
  useEffect(() => {
    setProfile(getProfile());
  }, []);

  return (
    <section
      id="about"
      className={cn(
        "py-20 md:py-32",
        "relative",
        "bg-gradient-to-b from-background to-muted/30"
      )}
    >
      <div className="container mx-auto px-4">
        {/* ========================================
            EN-TÊTE DE SECTION
            ======================================== */}
        <div className="text-center mb-16">
          {/* Badge "À propos" */}
          <div
            className={cn(
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-full",
              "glass text-primary text-sm font-medium",
              "mb-4"
            )}
          >
            <User className="w-4 h-4" />
            À propos
          </div>

          {/* Titre principal */}
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">
            Qui suis-je ?
          </h2>
        </div>

        {/* ========================================
            CONTENU PRINCIPAL (2 colonnes)
            ======================================== */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ------------------------------------------
              COLONNE GAUCHE : Photo + Bio + Valeurs
              ------------------------------------------ */}
          <div className="space-y-8">
            {/* Photo avec bordure animée */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Cercle de bordure animé */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full",
                    "bg-gradient-to-r from-primary via-secondary to-tertiary",
                    "animate-gradient-rotate",
                    "blur-sm"
                  )}
                  style={{ backgroundSize: "400% 400%" }}
                />
                {/* Avatar */}
                <div
                  className={cn(
                    "relative w-48 h-48 md:w-56 md:h-56",
                    "rounded-full",
                    "bg-card",
                    "flex items-center justify-center",
                    "border-4 border-background",
                    "overflow-hidden"
                  )}
                >
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Avatar par défaut si pas d'image
                    <User className="w-24 h-24 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            {/* Biographie */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {profile?.name || "Alexandre Dupont"}
              </h3>
              <p className="text-primary font-medium mb-4">
                {profile?.title || "Étudiant BUT Science des Données"}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {profile?.bio ||
                  "Passionné par la Data Science, les jeux vidéo et les animés. Je cherche à appliquer l'analyse de données dans mes domaines de passion."}
              </p>
            </div>

            {/* Grille des valeurs */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={cn(
                    "p-4 rounded-lg",
                    "glass",
                    "group",
                    "hover:border-primary/50",
                    "transition-all duration-300",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icône de la valeur */}
                  <value.icon
                    className={cn(
                      "w-6 h-6 text-primary mb-2",
                      "group-hover:scale-110 transition-transform"
                    )}
                  />
                  {/* Titre de la valeur */}
                  <h4 className="font-semibold text-foreground mb-1">
                    {value.title}
                  </h4>
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------
              COLONNE DROITE : Timeline + Intérêts
              ------------------------------------------ */}
          <div className="space-y-8">
            {/* Timeline de formation */}
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Parcours
              </h3>

              {/* Liste des événements */}
              <div className="space-y-6">
                {timelineData.map((item, index) => (
                  <div
                    key={item.year}
                    className={cn(
                      "relative pl-8",
                      // Ligne verticale
                      "before:absolute before:left-0 before:top-0 before:bottom-0",
                      "before:w-0.5 before:bg-border",
                      // Supprime la ligne pour le dernier élément
                      index === timelineData.length - 1 && "before:hidden"
                    )}
                  >
                    {/* Point sur la timeline */}
                    <div
                      className={cn(
                        "absolute left-0 -translate-x-1/2",
                        "w-3 h-3 rounded-full",
                        "bg-primary",
                        "glow-primary"
                      )}
                    />

                    {/* Contenu de l'événement */}
                    <div
                      className={cn(
                        "p-4 rounded-lg glass",
                        "animate-slide-up"
                      )}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Année */}
                      <span className="text-primary font-mono text-sm">
                        {item.year}
                      </span>
                      {/* Titre */}
                      <h4 className="font-semibold text-foreground mt-1">
                        {item.title}
                      </h4>
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                Passions
              </h3>

              {/* Grille des intérêts */}
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={interest.name}
                    className={cn(
                      "flex items-center gap-3",
                      "p-4 rounded-lg glass",
                      "group cursor-pointer",
                      "hover:scale-105 transition-all duration-300",
                      "animate-scale-in"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <interest.icon
                      className={cn(
                        "w-8 h-8",
                        interest.color,
                        "group-hover:animate-pulse-glow"
                      )}
                    />
                    <span className="font-medium text-foreground">
                      {interest.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
