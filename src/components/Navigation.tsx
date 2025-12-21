/* NAVIGATION - Style Journal */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.replace("#", ""));
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border py-3" : "bg-transparent py-6"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="headline text-xl text-primary">Portfolio</Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
                {link.name}
              </a>
            ))}
            {import.meta.env.DEV && (
              <Link to="/admin" className="journal-badge hover:bg-primary hover:text-primary-foreground transition-colors">ADMIN</Link>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-sm animate-fade-in">
          <div className="container mx-auto px-4 pt-24">
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-2xl headline text-primary py-4 border-b border-border animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
