/* ==========================================
   COMPOSANT NAVIGATION
   ==========================================
   
   Barre de navigation principale du site.
   
   Fonctionnalités :
   - Logo cliquable ramenant à l'accueil
   - Liens vers les différentes sections
   - Effet de transparence au scroll (glass effect)
   - Menu hamburger sur mobile
   - Indication de la section active
   
   Ce composant utilise :
   - useState : pour gérer l'état du menu mobile
   - useEffect : pour détecter le scroll
   - react-router-dom : pour la navigation
*/

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ==========================================
// INTERFACE POUR LES LIENS DE NAVIGATION
// ==========================================

interface NavLink {
  name: string;    // Texte affiché
  href: string;    // Lien vers la section (ancre #section)
}

// ==========================================
// LIENS DE NAVIGATION
// ==========================================
// Liste des liens affichés dans la navbar
// href commence par # pour les ancres (liens internes à la page)

const navLinks: NavLink[] = [
  { name: "Accueil", href: "#hero" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function Navigation() {
  // ------------------------------------------
  // ÉTATS (STATE)
  // ------------------------------------------

  // État pour savoir si le menu mobile est ouvert
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // État pour savoir si on a scrollé (pour changer le style de la navbar)
  const [isScrolled, setIsScrolled] = useState(false);

  // Récupère la route actuelle (pour l'admin)
  const location = useLocation();

  // ------------------------------------------
  // EFFET POUR DÉTECTER LE SCROLL
  // ------------------------------------------

  useEffect(() => {
    /**
     * Fonction appelée à chaque scroll
     * Change isScrolled selon la position de scroll
     */
    const handleScroll = () => {
      // scrollY = nombre de pixels scrollés verticalement
      // Si on a scrollé plus de 50px, on considère qu'on a scrollé
      setIsScrolled(window.scrollY > 50);
    };

    // Ajoute l'écouteur d'événement sur la fenêtre
    window.addEventListener("scroll", handleScroll);

    // Fonction de nettoyage : retire l'écouteur quand le composant est démonté
    // Ceci évite les fuites mémoire
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] = l'effet ne s'exécute qu'une fois au montage

  // ------------------------------------------
  // FONCTION DE NAVIGATION FLUIDE
  // ------------------------------------------

  /**
   * Gère le clic sur un lien de navigation
   * Fait défiler la page jusqu'à la section correspondante
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien

    // Ferme le menu mobile si ouvert
    setIsMobileMenuOpen(false);

    // Extrait l'ID de la section (enlève le #)
    const targetId = href.replace("#", "");

    // Trouve l'élément HTML correspondant
    const element = document.getElementById(targetId);

    if (element) {
      // Fait défiler jusqu'à l'élément avec une animation fluide
      element.scrollIntoView({
        behavior: "smooth", // Animation fluide
        block: "start",     // Aligne le haut de l'élément avec le haut de la fenêtre
      });
    }
  };

  // ------------------------------------------
  // RENDU JSX
  // ------------------------------------------

  return (
    <>
      {/* ========================================
          BARRE DE NAVIGATION PRINCIPALE
          ======================================== */}
      <nav
        className={cn(
          // Classes de base
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          // Styles conditionnels selon le scroll
          isScrolled
            ? "glass py-3 shadow-lg shadow-primary/5" // Avec scroll : effet verre
            : "bg-transparent py-5"                    // Sans scroll : transparent
        )}
      >
        {/* Container centré avec largeur max */}
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* ------------------------------------------
              LOGO
              ------------------------------------------ */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            {/* Icône du logo avec animation au hover */}
            <Gamepad2 
              className={cn(
                "w-8 h-8 transition-all duration-300",
                "text-primary group-hover:text-secondary",
                "group-hover:rotate-12"
              )}
            />
            {/* Texte du logo avec dégradé */}
            <span className="font-display text-xl font-bold gradient-text">
              DataGamer
            </span>
          </Link>

          {/* ------------------------------------------
              LIENS DE NAVIGATION (Desktop)
              ------------------------------------------ 
              hidden md:flex = caché sur mobile, visible sur md+ */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  // Styles de base
                  "text-sm font-medium transition-all duration-300",
                  "relative py-1",
                  // Couleur normale
                  "text-muted-foreground hover:text-primary",
                  // Pseudo-élément pour la ligne sous le lien au hover
                  // Utilise les classes CSS définies dans index.css
                  "after:absolute after:bottom-0 after:left-0",
                  "after:w-full after:h-0.5",
                  "after:bg-primary after:scale-x-0",
                  "after:origin-right after:transition-transform",
                  "hover:after:scale-x-100 hover:after:origin-left"
                )}
              >
                {link.name}
              </a>
            ))}

            {/* Lien vers l'Admin (visible seulement pour démo) */}
            <Link
              to="/admin"
              className={cn(
                "text-sm font-medium transition-all duration-300",
                "text-muted-foreground/60 hover:text-primary/80"
              )}
            >
              Admin
            </Link>
          </div>

          {/* ------------------------------------------
              BOUTON MENU MOBILE
              ------------------------------------------
              md:hidden = visible sur mobile, caché sur md+ */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {/* Affiche X si ouvert, Menu sinon */}
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* ========================================
          MENU MOBILE (OVERLAY)
          ======================================== */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            // Positionnement plein écran sous la navbar
            "fixed inset-0 top-16 z-40",
            // Fond avec effet de verre
            "glass",
            // Animation d'apparition
            "animate-fade-in"
          )}
        >
          {/* Liste des liens */}
          <div className="flex flex-col items-center gap-6 pt-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  // Styles de base
                  "text-lg font-medium text-foreground",
                  "transition-all duration-300",
                  "hover:text-primary",
                  // Animation décalée pour chaque lien
                  "animate-slide-up"
                )}
                // Délai d'animation progressif pour chaque élément
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </a>
            ))}

            {/* Lien Admin dans le menu mobile */}
            <Link
              to="/admin"
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
