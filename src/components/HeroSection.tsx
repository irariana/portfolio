/* ==========================================
   COMPOSANT HERO SECTION - STYLE JOURNAL VINTAGE
   ==========================================
   
   En-tête style journal/newspaper avec nom en grand,
   date, édition - mais avec une touche gaming subtile.
*/

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  // Date formatée style journal
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).toUpperCase();

  const year = today.getFullYear();

  useEffect(() => {
    const data = getProfile();
    setProfile(data);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Extraire prénom et nom
  const nameParts = profile?.name?.split(" ") || ["VOTRE", "NOM"];
  const firstName = nameParts[0]?.toUpperCase() || "VOTRE";
  const lastName = nameParts.slice(1).join(" ").toUpperCase() || "NOM";

  return (
    <section
      id="hero"
      className={cn(
        "min-h-screen relative",
        "flex flex-col items-center justify-center",
        "bg-background paper-texture",
        "py-16 px-4"
      )}
    >
      {/* Container principal */}
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Barre supérieure style journal */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-6 border-b border-border pb-4">
          <span>VOL. {year} • ÉDITION PORTFOLIO</span>
          <span>{formattedDate}</span>
          <span>EST. {year}</span>
        </div>

        {/* Nom principal - Style masthead de journal */}
        <div className="text-center mb-8">
          <h1 className="headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary tracking-tight">
            {firstName}
          </h1>
          <h1 className="headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary tracking-tight -mt-2 md:-mt-4">
            {lastName}
          </h1>
        </div>

        {/* Sous-titre avec lignes décoratives + touches gaming */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 h-px bg-border max-w-24" />
          <span className="subheadline text-muted-foreground">
            {profile?.title || "ÉTUDIANT DATA SCIENCE"}
          </span>
          <div className="flex-1 h-px bg-border max-w-24" />
        </div>

        {/* Double ligne décorative */}
        <div className="journal-divider-double mb-8" />

        {/* Section "Special Report" style */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Photo + légende (style figure de journal) */}
          <div className="md:col-span-4">
            <figure className="journal-box p-2">
              {profile?.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full aspect-square bg-muted flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
              <figcaption className="caption-text text-center mt-2 text-muted-foreground">
                FIG 1. DATA SCIENTIST
              </figcaption>
            </figure>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-8">
            <h2 className="headline text-2xl md:text-3xl text-primary mb-2">
              Special Report: L'Aventurier Data
            </h2>
            <p className="caption-text text-muted-foreground mb-4">
              PAR {profile?.name?.toUpperCase() || "L'ÉDITEUR"} •
            </p>
            
            <div className="body-text text-foreground/90 space-y-4 drop-cap">
              <p>
                {profile?.bio || 
                  "Passionné par la Data Science, les jeux vidéo et les animés. Je cherche à appliquer l'analyse de données dans mes domaines de passion : e-sport, statistiques sportives et les recherches en tout genre."}
              </p>
            </div>

            {/* Liens sociaux style journal */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="caption-text text-muted-foreground mb-4">
                CONTACT & RÉSEAUX
              </p>
              <div className="flex gap-4">
                {profile?.socials?.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 journal-box-bordered",
                      "text-primary hover:bg-primary hover:text-primary-foreground",
                      "transition-all duration-300"
                    )}
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}

                {profile?.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 journal-box-bordered",
                      "text-primary hover:bg-primary hover:text-primary-foreground",
                      "transition-all duration-300"
                    )}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}

                {profile?.socials?.email && (
                  <a
                    href={`mailto:${profile.socials.email}`}
                    className={cn(
                      "p-3 journal-box-bordered",
                      "text-primary hover:bg-primary hover:text-primary-foreground",
                      "transition-all duration-300"
                    )}
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div
          className={cn(
            "mt-16 text-center cursor-pointer",
            "animate-float"
          )}
          onClick={() => scrollToSection("about")}
        >
          <span className="caption-text text-muted-foreground block mb-2">
            CONTINUER LA LECTURE
          </span>
          <span className="text-2xl">↓</span>
        </div>
      </div>
    </section>
  );
}
