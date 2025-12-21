/* ==========================================
   COMPOSANT SKILLS SECTION - STYLE JOURNAL VINTAGE
   ==========================================
   
   Compétences présentées comme un index de journal
   avec barres de progression élégantes.
*/

import { useEffect, useState, useRef } from "react";
import { getSkills, type Skill } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// COMPOSANT BARRE DE PROGRESSION
// ==========================================

interface SkillBarProps {
  name: string;
  level: number;
  animated: boolean;
  delay: number;
}

function SkillBar({ name, level, animated, delay }: SkillBarProps) {
  // Niveau textuel
  const getLevelLabel = (lvl: number) => {
    if (lvl >= 90) return "Expert";
    if (lvl >= 70) return "Avancé";
    if (lvl >= 50) return "Intermédiaire";
    return "Débutant";
  };

  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground uppercase tracking-wide">
          {name}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {getLevelLabel(level)}
        </span>
      </div>
      
      {/* Barre de progression minimaliste */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: animated ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Charger les compétences
  useEffect(() => {
    setSkills(getSkills());
  }, []);

  // Détecter la visibilité pour animer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Regrouper par catégorie
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Autres";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="journal-badge mb-4 inline-block">COMPÉTENCES</span>
          <h2 className="headline text-4xl md:text-5xl text-primary mt-4">
            Skills Index
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Mes compétences techniques acquises au fil des projets et formations.
          </p>
        </div>

        {/* Grille des compétences par catégorie */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <div 
              key={category} 
              className={cn(
                "journal-box p-6",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              {/* Titre de catégorie */}
              <h3 className="subheadline text-primary mb-4 pb-3 border-b-2 border-primary">
                {category}
              </h3>

              {/* Liste des skills */}
              <div>
                {categorySkills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.id}
                    name={skill.name}
                    level={skill.level}
                    animated={isVisible}
                    delay={categoryIndex * 100 + skillIndex * 50}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats résumées */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 journal-box p-6">
            <div className="text-center">
              <span className="headline text-3xl text-primary block">{skills.length}</span>
              <span className="caption-text text-muted-foreground">Compétences</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <span className="headline text-3xl text-primary block">
                {Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length || 0)}%
              </span>
              <span className="caption-text text-muted-foreground">Moyenne</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <span className="headline text-3xl text-primary block">
                {Object.keys(skillsByCategory).length}
              </span>
              <span className="caption-text text-muted-foreground">Catégories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
