/* ==========================================
   COMPOSANT NAVIGATION - STYLE RPG RÉTRO
   ==========================================
   
   Barre de navigation style menu de jeu RPG.
   
   Fonctionnalités :
   - Logo pixelisé
   - Liens style menu de jeu
   - Effet de bordure néon au scroll
   - Menu mobile style inventaire
*/

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sword, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ==========================================
// LIENS DE NAVIGATION
// ==========================================

interface NavLink {
  name: string;
  href: string;
  icon?: string; // Emoji RPG
}

const navLinks: NavLink[] = [
  { name: "Accueil", href: "#hero", icon: "🏠" },
  { name: "À propos", href: "#about", icon: "📜" },
  { name: "Skills", href: "#skills", icon: "⚔️" },
  { name: "Quêtes", href: "#projects", icon: "🗺️" },
  { name: "Contact", href: "#contact", icon: "💬" },
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Barre de navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          isScrolled
            ? "rpg-box py-2 mx-2 mt-2 rounded-sm"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo style RPG */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            {/* Icône avec bordure pixel */}
            <div className={cn(
              "w-10 h-10 flex items-center justify-center",
              "bg-primary text-primary-foreground",
              "border-2 border-primary-foreground/30",
              "shadow-pixel",
              "group-hover:animate-level-up"
            )}>
              <Sword className="w-5 h-5" />
            </div>

            {/* Texte du logo */}
            <div className="flex flex-col">
              <span className="font-display text-pixel-sm text-primary leading-none">
                DATA
              </span>
              <span className="font-display text-pixel-xs text-secondary leading-none">
                QUEST
              </span>
            </div>
          </Link>

          {/* Liens de navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "px-4 py-2",
                  "font-sans text-lg",
                  "text-muted-foreground hover:text-primary",
                  "transition-all duration-200",
                  "hover:bg-primary/10",
                  "border-2 border-transparent hover:border-primary/30"
                )}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </a>
            ))}

            {/* Lien Admin */}
            {/* Lien Admin - Visible uniquement en DEV */}
            {import.meta.env.DEV && (
              <Link
                to="/admin"
                className={cn(
                  "ml-4 px-4 py-2",
                  "font-display text-pixel-xs",
                  "text-accent hover:text-accent-foreground",
                  "bg-accent/20 hover:bg-accent/40",
                  "border-2 border-accent/50",
                  "transition-all duration-200"
                )}
              >
                <Star className="w-4 h-4 inline mr-1" />
                ADMIN
              </Link>
            )}
          </div>

          {/* Bouton menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              "border-2 border-primary",
              "text-primary hover:bg-primary/20"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Menu mobile (style inventaire RPG) */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 top-0 z-40",
            "bg-background/95 backdrop-blur-sm",
            "animate-fade-in"
          )}
        >
          {/* Header du menu */}
          <div className="rpg-box m-4 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-pixel-base text-primary">
                📋 MENU
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Séparateur pixel */}
            <div className="h-1 bg-primary/30 mb-4" />

            {/* Liste des liens */}
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "flex items-center gap-3 p-3",
                    "font-sans text-xl",
                    "text-foreground hover:text-primary",
                    "hover:bg-primary/10",
                    "border-2 border-transparent hover:border-primary/30",
                    "transition-all duration-200",
                    "animate-slide-up"
                  )}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span>{link.name}</span>
                  <span className="ml-auto text-muted-foreground">▶</span>
                </a>
              ))}

              {/* Lien Admin dans le menu mobile */}
              {/* Lien Admin dans le menu mobile - Visible uniquement en DEV */}
              {import.meta.env.DEV && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-3 mt-4",
                    "font-display text-pixel-sm",
                    "text-accent",
                    "bg-accent/20",
                    "border-2 border-accent/50",
                    "animate-slide-up"
                  )}
                  style={{ animationDelay: `${navLinks.length * 80}ms` }}
                >
                  <Star className="w-5 h-5" />
                  <span>ADMIN PANEL</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
