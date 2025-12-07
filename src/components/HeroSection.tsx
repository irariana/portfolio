/* ==========================================
   COMPOSANT HERO SECTION
   ==========================================
   
   Section d'accueil principale du portfolio.
   C'est la première chose que les visiteurs voient.
   
   Fonctionnalités :
   - Animation de particules en arrière-plan
   - Titre avec effet de dégradé
   - Sous-titre avec animation de typing
   - Boutons CTA (Call To Action)
   - Badges animés montrant les centres d'intérêt
   
   Animations utilisées :
   - Particules flottantes (CSS keyframes)
   - Fade-in au chargement
   - Hover effects sur les boutons
*/

import { useEffect, useState } from "react";
import { ChevronDown, Github, Linkedin, Mail, Gamepad2, Trophy, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// COMPOSANT PARTICULES (Animation de fond)
// ==========================================

/**
 * Crée des particules flottantes animées en arrière-plan
 * Donne un effet spatial/gaming au site
 */
function Particles() {
  // Nombre de particules à générer
  const particleCount = 50;

  // Génère un tableau de particules avec des propriétés aléatoires
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    // Position horizontale aléatoire (0-100%)
    left: `${Math.random() * 100}%`,
    // Taille aléatoire (2-6px)
    size: Math.random() * 4 + 2,
    // Durée d'animation aléatoire (10-20s)
    duration: Math.random() * 10 + 10,
    // Délai de départ aléatoire (0-15s)
    delay: Math.random() * 15,
    // Opacité aléatoire (0.1-0.5)
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    // Container des particules (couvre tout l'écran)
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            // Animation : monte du bas vers le haut
            animation: `particle-float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// COMPOSANT HERO PRINCIPAL
// ==========================================

export function HeroSection() {
  // ------------------------------------------
  // ÉTATS
  // ------------------------------------------

  // Stocke les données du profil
  const [profile, setProfile] = useState<Profile | null>(null);

  // État pour l'animation du titre (effet machine à écrire)
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [titleComplete, setTitleComplete] = useState(false);

  // Titre complet à afficher
  const fullTitle = "Data Science × Gaming × Sports × Animés";

  // ------------------------------------------
  // EFFET : Charger les données du profil
  // ------------------------------------------

  useEffect(() => {
    // Récupère le profil depuis le localStorage
    const data = getProfile();
    setProfile(data);
  }, []);

  // ------------------------------------------
  // EFFET : Animation de typing du titre
  // ------------------------------------------

  useEffect(() => {
    // Si le titre est déjà complet, ne rien faire
    if (displayedTitle.length >= fullTitle.length) {
      setTitleComplete(true);
      return;
    }

    // Timer qui ajoute une lettre toutes les 80ms
    const timer = setTimeout(() => {
      setDisplayedTitle(fullTitle.slice(0, displayedTitle.length + 1));
    }, 80);

    // Nettoie le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, [displayedTitle]);

  // ------------------------------------------
  // FONCTION : Scroll vers une section
  // ------------------------------------------

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ------------------------------------------
  // RENDU JSX
  // ------------------------------------------

  return (
    <section
      id="hero"
      className={cn(
        // Hauteur plein écran
        "min-h-screen relative",
        // Centrage du contenu
        "flex items-center justify-center",
        // Grille en arrière-plan
        "bg-grid",
        // Overflow caché pour les particules
        "overflow-hidden"
      )}
    >
      {/* ========================================
          PARTICULES ANIMÉES (Arrière-plan)
          ======================================== */}
      <Particles />

      {/* ========================================
          DÉGRADÉ DE FOND (Overlay)
          ======================================== */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-b from-background via-background/95 to-background"
        )}
      />

      {/* ========================================
          CONTENU PRINCIPAL
          ======================================== */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* ------------------------------------------
              BADGES DE PASSION (Gaming, Sports, Animés)
              ------------------------------------------ */}
          <div className="flex justify-center gap-4 mb-8 animate-fade-in">
            {/* Badge Gaming */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2",
                "rounded-full glass",
                "text-primary text-sm font-medium",
                "animate-float"
              )}
              style={{ animationDelay: "0s" }}
            >
              <Gamepad2 className="w-4 h-4" />
              Gaming
            </div>

            {/* Badge Sports */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2",
                "rounded-full glass",
                "text-secondary text-sm font-medium",
                "animate-float"
              )}
              style={{ animationDelay: "0.5s" }}
            >
              <Trophy className="w-4 h-4" />
              Sports
            </div>

            {/* Badge Animés */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2",
                "rounded-full glass",
                "text-tertiary text-sm font-medium",
                "animate-float"
              )}
              style={{ animationDelay: "1s" }}
            >
              <Tv className="w-4 h-4" />
              Animés
            </div>
          </div>

          {/* ------------------------------------------
              TITRE PRINCIPAL (Effet typing)
              ------------------------------------------ */}
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
              "font-display font-bold",
              "mb-6",
              "gradient-text"
            )}
          >
            {/* Texte avec animation de typing */}
            <span className="inline-block">
              {displayedTitle}
              {/* Curseur clignotant (disparaît quand le titre est complet) */}
              {!titleComplete && (
                <span className="inline-block w-[4px] h-[1em] bg-primary ml-1 animate-blink-caret" />
              )}
            </span>
          </h1>

          {/* ------------------------------------------
              SOUS-TITRE (Titre professionnel)
              ------------------------------------------ */}
          <p
            className={cn(
              "text-xl md:text-2xl",
              "text-muted-foreground",
              "mb-4",
              "animate-fade-in"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            {profile?.title || "Étudiant BUT Science des Données"}
          </p>

          {/* ------------------------------------------
              DESCRIPTION / BIO COURTE
              ------------------------------------------ */}
          <p
            className={cn(
              "text-lg",
              "text-muted-foreground/80",
              "max-w-2xl mx-auto",
              "mb-8",
              "animate-fade-in"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            Passionné par l'analyse de données, je cherche à appliquer la data
            science dans mes domaines de passion : l'e-sport, les statistiques
            sportives et les recommandations d'animés.
          </p>

          {/* ------------------------------------------
              BOUTONS CTA (Call To Action)
              ------------------------------------------ */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            {/* Bouton principal : Voir les projets */}
            <Button
              size="lg"
              className={cn(
                "gradient-primary text-primary-foreground",
                "font-semibold",
                "glow-hover",
                "transition-all duration-300",
                "hover:scale-105"
              )}
              onClick={() => scrollToSection("projects")}
            >
              Découvrir mes projets
            </Button>

            {/* Bouton secondaire : Contact */}
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "border-primary/50 text-primary",
                "hover:bg-primary/10",
                "transition-all duration-300"
              )}
              onClick={() => scrollToSection("contact")}
            >
              Me contacter
            </Button>
          </div>

          {/* ------------------------------------------
              LIENS RÉSEAUX SOCIAUX
              ------------------------------------------ */}
          <div
            className="flex justify-center gap-6 animate-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            {/* Lien GitHub */}
            {profile?.socials?.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  "transition-all duration-300",
                  "hover:scale-110"
                )}
                aria-label="Voir mon profil GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            )}

            {/* Lien LinkedIn */}
            {profile?.socials?.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  "transition-all duration-300",
                  "hover:scale-110"
                )}
                aria-label="Voir mon profil LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}

            {/* Lien Email */}
            {profile?.socials?.email && (
              <a
                href={`mailto:${profile.socials.email}`}
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  "transition-all duration-300",
                  "hover:scale-110"
                )}
                aria-label="M'envoyer un email"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ========================================
          INDICATEUR DE SCROLL (Flèche vers le bas)
          ======================================== */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "animate-bounce",
          "cursor-pointer"
        )}
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </div>
    </section>
  );
}
