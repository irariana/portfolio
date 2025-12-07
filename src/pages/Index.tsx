/* ==========================================
   PAGE D'ACCUEIL PRINCIPALE (INDEX)
   ==========================================
   
   Cette page assemble tous les composants du portfolio.
   C'est la page que les visiteurs voient en arrivant sur le site.
*/

import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { initializeAuth } from "@/lib/authManager";

const Index = () => {
  // Initialise l'authentification au chargement
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Barre de navigation fixe */}
      <Navigation />
      
      {/* Contenu principal */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default Index;
