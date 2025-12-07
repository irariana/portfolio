/* ==========================================
   COMPOSANT SKILLS SECTION (COMPÉTENCES)
   ==========================================
   
   Affiche les compétences techniques et data science
   avec des barres de progression animées.
   
   Fonctionnalités :
   - Regroupement par catégorie
   - Barres de progression avec animation
   - Icônes pour chaque compétence
   - Animation au scroll (quand la section devient visible)
*/

import { useEffect, useState, useRef } from "react";
import {
  Code,
  Database,
  BarChart3,
  GitBranch,
  Calculator,
  LineChart,
  PieChart,
  Brain,
  Wrench,
} from "lucide-react";
import { getSkills, type Skill } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// MAPPING DES ICÔNES
// ==========================================
// Associe le nom de l'icône (stocké en base) au composant React

const iconMap: Record<string, typeof Code> = {
  code: Code,
  database: Database,
  "bar-chart": BarChart3,
  "git-branch": GitBranch,
  calculator: Calculator,
  "line-chart": LineChart,
  "pie-chart": PieChart,
  brain: Brain,
  wrench: Wrench,
};

// ==========================================
// COMPOSANT BARRE DE PROGRESSION
// ==========================================

interface ProgressBarProps {
  value: number;      // Pourcentage (0-100)
  animated: boolean;  // Si l'animation est activée
  delay: number;      // Délai avant l'animation (ms)
}

function ProgressBar({ value, animated, delay }: ProgressBarProps) {
  return (
    <div
      className={cn(
        // Container de la barre
        "h-2 rounded-full",
        "bg-muted",
        "overflow-hidden"
      )}
    >
      {/* Barre de remplissage */}
      <div
        className={cn(
          "h-full rounded-full",
          "gradient-primary",
          // Animation de remplissage
          "transition-all duration-1000 ease-out"
        )}
        style={{
          // Largeur = pourcentage de complétion
          // Si non animé, largeur = 0 (état initial)
          width: animated ? `${value}%` : "0%",
          // Délai avant le début de l'animation
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

// ==========================================
// COMPOSANT CARTE DE COMPÉTENCE
// ==========================================

interface SkillCardProps {
  skill: Skill;
  index: number;
  animated: boolean;
}

function SkillCard({ skill, index, animated }: SkillCardProps) {
  // Récupère le composant icône correspondant au nom
  const IconComponent = iconMap[skill.icon || "code"] || Code;

  return (
    <div
      className={cn(
        "p-4 rounded-lg",
        "glass",
        "group",
        "hover:border-primary/30",
        "transition-all duration-300",
        // Animation d'apparition
        animated && "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* En-tête : icône + nom + niveau */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Icône de la compétence */}
          <IconComponent
            className={cn(
              "w-5 h-5 text-primary",
              "group-hover:scale-110 transition-transform"
            )}
          />
          {/* Nom de la compétence */}
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        {/* Pourcentage */}
        <span className="text-sm text-primary font-mono">{skill.level}%</span>
      </div>

      {/* Barre de progression */}
      <ProgressBar
        value={skill.level}
        animated={animated}
        delay={index * 100 + 200}
      />
    </div>
  );
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function SkillsSection() {
  // ------------------------------------------
  // ÉTATS
  // ------------------------------------------

  // Liste des compétences
  const [skills, setSkills] = useState<Skill[]>([]);

  // Indique si les animations doivent démarrer
  const [isVisible, setIsVisible] = useState(false);

  // Référence vers la section pour détecter sa visibilité
  const sectionRef = useRef<HTMLElement>(null);

  // ------------------------------------------
  // EFFET : Charger les compétences
  // ------------------------------------------

  useEffect(() => {
    setSkills(getSkills());
  }, []);

  // ------------------------------------------
  // EFFET : Détecter quand la section est visible
  // ------------------------------------------

  useEffect(() => {
    // IntersectionObserver détecte quand un élément entre dans le viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // Si la section est visible à plus de 20%
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Une fois visible, on arrête d'observer
          observer.disconnect();
        }
      },
      {
        // Déclenche quand 20% de la section est visible
        threshold: 0.2,
      }
    );

    // Commence à observer la section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Nettoyage
    return () => observer.disconnect();
  }, []);

  // ------------------------------------------
  // REGROUPEMENT PAR CATÉGORIE
  // ------------------------------------------

  // Crée un objet { catégorie: [skills] }
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Autres";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // ------------------------------------------
  // RENDU JSX
  // ------------------------------------------

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 md:py-32 relative"
    >
      <div className="container mx-auto px-4">
        {/* ========================================
            EN-TÊTE DE SECTION
            ======================================== */}
        <div className="text-center mb-16">
          {/* Badge "Compétences" */}
          <div
            className={cn(
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-full",
              "glass text-primary text-sm font-medium",
              "mb-4"
            )}
          >
            <Wrench className="w-4 h-4" />
            Compétences
          </div>

          {/* Titre principal */}
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Mon Stack Technique
          </h2>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Les outils et technologies que j'utilise pour analyser les données
            et créer des visualisations impactantes.
          </p>
        </div>

        {/* ========================================
            GRILLE DES COMPÉTENCES PAR CATÉGORIE
            ======================================== */}
        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(
            ([category, categorySkills], categoryIndex) => (
              <div key={category}>
                {/* Titre de la catégorie */}
                <h3
                  className={cn(
                    "text-xl font-display font-semibold",
                    "text-foreground mb-6",
                    "flex items-center gap-2"
                  )}
                >
                  {/* Barre décorative avant le titre */}
                  <span className="w-8 h-0.5 bg-primary" />
                  {category}
                </h3>

                {/* Grille des compétences de cette catégorie */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      index={categoryIndex * 3 + skillIndex}
                      animated={isVisible}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* ========================================
            STATISTIQUES GLOBALES
            ======================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: skills.length, label: "Technologies" },
            {
              value: skills.filter((s) => s.level >= 70).length,
              label: "Maîtrisées",
            },
            {
              value: new Set(skills.map((s) => s.category)).size,
              label: "Catégories",
            },
            { value: "2+", label: "Ans d'expérience" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center p-6 rounded-lg glass",
                isVisible && "animate-scale-in"
              )}
              style={{ animationDelay: `${index * 100 + 500}ms` }}
            >
              {/* Valeur */}
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                {stat.value}
              </div>
              {/* Label */}
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
