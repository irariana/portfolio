/* ==========================================
   COMPOSANT FOOTER - STYLE RPG RÉTRO
   ==========================================
   
   Pied de page style écran de fin de jeu/crédits.
*/

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Heart, Sword, Star, Trophy } from "lucide-react";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// LIENS RAPIDES
// ==========================================

const quickLinks = [
  { name: "Accueil", href: "#hero", icon: "🏠" },
  { name: "À propos", href: "#about", icon: "📜" },
  { name: "Skills", href: "#skills", icon: "⚔️" },
  { name: "Quêtes", href: "#projects", icon: "🗺️" },
  { name: "Contact", href: "#contact", icon: "💬" },
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setProfile(getProfile());
  }, []);

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
    <footer className={cn(
      "py-12 relative",
      "bg-gradient-to-t from-card to-background",
      "border-t-4 border-primary/50"
    )}>
      {/* Effet scanlines */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        
        {/* Grille principale */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Colonne 1 : Logo et description */}
          <div className="rpg-box p-6">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                "w-12 h-12 flex items-center justify-center",
                "bg-primary text-primary-foreground",
                "border-2 border-primary-foreground/30"
              )}>
                <Sword className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display text-pixel-base text-primary block">
                  DATA QUEST
                </span>
                <span className="font-sans text-sm text-muted-foreground">
                  Portfolio RPG
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground font-sans text-lg">
              Un portfolio de Data Science avec une touche gaming, 
              sports et animés. Level up your data skills!
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div className="rpg-box p-6">
            <h3 className="font-display text-pixel-sm text-primary mb-4 flex items-center gap-2">
              <Star className="w-4 h-4" />
              NAVIGATION
            </h3>
            
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      "flex items-center gap-2",
                      "text-muted-foreground hover:text-primary",
                      "font-sans text-lg",
                      "transition-colors duration-200"
                    )}
                  >
                    <span className="text-sm">▶</span>
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Réseaux sociaux */}
          <div className="rpg-box p-6">
            <h3 className="font-display text-pixel-sm text-secondary mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              CONNEXIONS
            </h3>
            
            <div className="flex gap-4">
              {/* GitHub */}
              {profile?.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3",
                    "bg-muted hover:bg-primary/20",
                    "text-muted-foreground hover:text-primary",
                    "border-2 border-border hover:border-primary",
                    "transition-all duration-200"
                  )}
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}

              {/* LinkedIn */}
              {profile?.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3",
                    "bg-muted hover:bg-secondary/20",
                    "text-muted-foreground hover:text-secondary",
                    "border-2 border-border hover:border-secondary",
                    "transition-all duration-200"
                  )}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}

              {/* Email */}
              {profile?.socials?.email && (
                <a
                  href={`mailto:${profile.socials.email}`}
                  className={cn(
                    "p-3",
                    "bg-muted hover:bg-tertiary/20",
                    "text-muted-foreground hover:text-tertiary",
                    "border-2 border-border hover:border-tertiary",
                    "transition-all duration-200"
                  )}
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              )}
            </div>
            
            {/* Stats style RPG */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">XP Total</span>
                <span className="text-primary font-display">9999</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quêtes</span>
                <span className="text-secondary font-display">42</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level</span>
                <span className="text-tertiary font-display">MAX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de copyright */}
        <div className={cn(
          "pt-6 border-t-2 border-primary/20",
          "flex flex-col md:flex-row items-center justify-between gap-4"
        )}>
          <p className="text-muted-foreground font-sans text-lg">
            © {currentYear} {profile?.name || "DataGamer"}. All rights reserved.
          </p>

          <p className="text-muted-foreground font-sans text-lg flex items-center gap-2">
            Made with{" "}
            <Heart className="w-5 h-5 text-destructive fill-destructive animate-pulse" />{" "}
            and lots of ☕ & 🎮
          </p>
        </div>
        
        {/* Message style fin de jeu */}
        <div className="text-center mt-8">
          <p className="font-display text-pixel-xs text-primary/50 animate-arcade-blink">
            ★ THANK YOU FOR PLAYING ★
          </p>
        </div>
      </div>
    </footer>
  );
}
