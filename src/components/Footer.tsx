/* ==========================================
   COMPOSANT FOOTER
   ==========================================
   
   Pied de page du site avec :
   - Copyright
   - Liens rapides
   - Icônes des réseaux sociaux
   - Animation de particules (optionnel)
*/

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Heart, Gamepad2 } from "lucide-react";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// LIENS RAPIDES
// ==========================================

const quickLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function Footer() {
  // État pour le profil
  const [profile, setProfile] = useState<Profile | null>(null);

  // Année courante pour le copyright
  const currentYear = new Date().getFullYear();

  // Charge le profil
  useEffect(() => {
    setProfile(getProfile());
  }, []);

  // Fonction de navigation fluide
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className={cn(
        "py-12",
        "bg-gradient-to-t from-card to-background",
        "border-t border-border/50"
      )}
    >
      <div className="container mx-auto px-4">
        {/* ========================================
            GRILLE PRINCIPALE (3 colonnes sur desktop)
            ======================================== */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* ------------------------------------------
              COLONNE 1 : Logo et description
              ------------------------------------------ */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="font-display text-xl font-bold gradient-text">
                DataGamer
              </span>
            </div>
            {/* Description */}
            <p className="text-muted-foreground text-sm">
              Portfolio de Data Science mêlant passion pour les données,
              le gaming, les sports et les animés.
            </p>
          </div>

          {/* ------------------------------------------
              COLONNE 2 : Liens rapides
              ------------------------------------------ */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      "text-muted-foreground hover:text-primary",
                      "transition-colors text-sm"
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------
              COLONNE 3 : Réseaux sociaux
              ------------------------------------------ */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Me suivre</h3>
            <div className="flex gap-4">
              {/* GitHub */}
              {profile?.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-muted hover:bg-primary/20",
                    "text-muted-foreground hover:text-primary",
                    "transition-all duration-300"
                  )}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}

              {/* LinkedIn */}
              {profile?.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-muted hover:bg-primary/20",
                    "text-muted-foreground hover:text-primary",
                    "transition-all duration-300"
                  )}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}

              {/* Email */}
              {profile?.socials?.email && (
                <a
                  href={`mailto:${profile.socials.email}`}
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-muted hover:bg-primary/20",
                    "text-muted-foreground hover:text-primary",
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

        {/* ========================================
            LIGNE DE COPYRIGHT
            ======================================== */}
        <div
          className={cn(
            "pt-8 border-t border-border/30",
            "flex flex-col md:flex-row items-center justify-between gap-4"
          )}
        >
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} {profile?.name || "DataGamer"}. Tous droits réservés.
          </p>

          {/* Message "fait avec amour" */}
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Fait avec{" "}
            <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />{" "}
            et beaucoup de données
          </p>
        </div>
      </div>
    </footer>
  );
}
