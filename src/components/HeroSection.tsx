/* ==========================================
   COMPOSANT HERO SECTION - STYLE RPG RÉTRO
   ==========================================
   
   Section d'accueil principale du portfolio.
   Design inspiré des écrans titre de jeux 8-bit/16-bit.
   
   Fonctionnalités :
   - Particules pixelisées en arrière-plan
   - Titre avec effet néon
   - Animation de typing style terminal
   - Badges style items RPG
*/

import { useEffect, useState } from "react";
import { ChevronDown, Github, Linkedin, Mail, Gamepad2, Trophy, Tv, Sword, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// COMPOSANT PARTICULES PIXELISÉES
// ==========================================

/**
 * Crée des particules pixelisées style 8-bit
 * Ressemble à des étoiles/pixels qui flottent
 */
function PixelParticles() {
  const particleCount = 40;

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    // Tailles en multiples de 4 pour l'effet pixel
    size: (Math.floor(Math.random() * 3) + 1) * 4,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 20,
    opacity: Math.random() * 0.6 + 0.2,
    // Couleur aléatoire (or, cyan ou magenta)
    color: ['primary', 'secondary', 'tertiary'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute",
            particle.color === 'primary' && "bg-primary",
            particle.color === 'secondary' && "bg-secondary",
            particle.color === 'tertiary' && "bg-tertiary",
          )}
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `particle-float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            // Pas de border-radius = pixel carré
            borderRadius: 0,
            boxShadow: `0 0 ${particle.size}px currentColor`,
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [titleComplete, setTitleComplete] = useState(false);

  // Titre style RPG
  const fullTitle = "DATA QUEST";
  const subtitle = "Gaming × Sports × Animés × Data Science";

  useEffect(() => {
    const data = getProfile();
    setProfile(data);
  }, []);

  // Animation de typing
  useEffect(() => {
    if (displayedTitle.length >= fullTitle.length) {
      setTitleComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedTitle(fullTitle.slice(0, displayedTitle.length + 1));
    }, 150); // Plus lent pour l'effet rétro

    return () => clearTimeout(timer);
  }, [displayedTitle]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className={cn(
        "min-h-screen relative",
        "flex items-center justify-center",
        "bg-grid overflow-hidden"
      )}
    >
      {/* Particules pixelisées */}
      <PixelParticles />

      {/* Overlay scanlines */}
      <div className="absolute inset-0 scanlines opacity-30" />

      {/* Dégradé de fond */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge "Press Start" */}
          <div
            className={cn(
              "inline-block mb-8 animate-arcade-blink",
              "font-display text-pixel-sm",
              "text-primary"
            )}
          >
            ▶ PRESS START ◀
          </div>

          {/* Titre principal style arcade */}
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
              "font-display font-bold",
              "mb-4",
              "text-primary"
            )}
          >
            {displayedTitle}
            {!titleComplete && (
              <span className="inline-block w-[0.5em] h-[1em] bg-primary ml-2 animate-blink-caret" />
            )}
          </h1>

          {/* Sous-titre gradient */}
          <p
            className={cn(
              "text-lg md:text-xl lg:text-2xl",
              "font-sans",
              "gradient-text",
              "mb-8",
              "animate-fade-in"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            {subtitle}
          </p>

          {/* Badges style items RPG */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {/* Badge Gaming */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2",
              "rpg-box",
              "text-primary font-sans text-lg"
            )}>
              <Gamepad2 className="w-5 h-5" />
              <span>+10 Gaming</span>
            </div>

            {/* Badge Sports */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2",
              "rpg-box",
              "text-secondary font-sans text-lg"
            )}>
              <Trophy className="w-5 h-5" />
              <span>+10 Sports</span>
            </div>

            {/* Badge Animés */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2",
              "rpg-box",
              "text-tertiary font-sans text-lg"
            )}>
              <Tv className="w-5 h-5" />
              <span>+10 Animés</span>
            </div>
          </div>

          {/* Titre professionnel */}
          <p
            className={cn(
              "text-xl md:text-2xl",
              "text-muted-foreground",
              "mb-3",
              "font-sans",
              "animate-fade-in"
            )}
            style={{ animationDelay: "1s" }}
          >
            {profile?.title || "Étudiant BUT Science des Données"}
          </p>

          {/* Description */}
          <p
            className={cn(
              "text-lg",
              "text-muted-foreground/80",
              "max-w-2xl mx-auto",
              "mb-10",
              "font-sans",
              "animate-fade-in"
            )}
            style={{ animationDelay: "1.2s" }}
          >
            Bienvenue dans mon univers.

            Un espace où les idées prennent forme, où la curiosité guide chaque projet et où la technologie devient un terrain d’exploration.
            Ici, je partage mon parcours, mes créations et les expériences qui façonnent ma vision du numérique et de la data.

            Chaque projet raconte une histoire : celle d’un apprentissage, d’un défi relevé, d’une envie d’aller plus loin.
            Prenez le temps d’explorer, et si cet univers vous parle, discutons-en.
          </p>

          {/* Boutons CTA style RPG */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "1.4s" }}
          >
            {/* Bouton principal */}
            <Button
              size="lg"
              className={cn(
                "gradient-primary text-primary-foreground",
                "font-display text-pixel-sm",
                "px-8 py-6",
                "border-2 border-primary-foreground/20",
                "shadow-pixel hover:shadow-pixel-lg",
                "transition-all duration-200",
                "hover:translate-y-[-2px]"
              )}
              onClick={() => scrollToSection("projects")}
            >
              <Sword className="w-4 h-4 mr-2" />
              VOIR MES QUÊTES
            </Button>

            {/* Bouton secondaire */}
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "border-2 border-secondary text-secondary",
                "font-display text-pixel-sm",
                "px-8 py-6",
                "hover:bg-secondary/20",
                "shadow-glow-secondary",
                "transition-all duration-200"
              )}
              onClick={() => scrollToSection("contact")}
            >
              <Shield className="w-4 h-4 mr-2" />
              ME CONTACTER
            </Button>
          </div>

          {/* Liens réseaux sociaux */}
          <div
            className="flex justify-center gap-6 animate-fade-in"
            style={{ animationDelay: "1.6s" }}
          >
            {profile?.socials?.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rpg-box",
                  "text-muted-foreground hover:text-primary",
                  "transition-all duration-200",
                  "hover:shadow-glow"
                )}
                aria-label="Voir mon profil GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            )}

            {profile?.socials?.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rpg-box",
                  "text-muted-foreground hover:text-secondary",
                  "transition-all duration-200",
                  "hover:shadow-glow-secondary"
                )}
                aria-label="Voir mon profil LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}

            {profile?.socials?.email && (
              <a
                href={`mailto:${profile.socials.email}`}
                className={cn(
                  "p-3 rpg-box",
                  "text-muted-foreground hover:text-tertiary",
                  "transition-all duration-200",
                  "hover:shadow-glow-tertiary"
                )}
                aria-label="M'envoyer un email"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "animate-float",
          "cursor-pointer"
        )}
        onClick={() => scrollToSection("about")}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary font-display text-pixel-xs">SCROLL</span>
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
}
