/* ==========================================
   COMPOSANT PROJECTS SECTION - STYLE JOURNAL VINTAGE + GAMING
   ==========================================
   
   Projets présentés comme des articles de journal
   avec touches RPG/gaming subtiles.
*/

import { useEffect, useState } from "react";
import { ExternalLink, Github, Gamepad2, Trophy, Tv, BarChart3, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, type Project } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// MAPPING ICÔNES GAMING
// ==========================================

function getProjectIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("esport") || lowerTitle.includes("lol") || lowerTitle.includes("gaming") || lowerTitle.includes("jeu")) {
    return Gamepad2;
  }
  if (lowerTitle.includes("sport") || lowerTitle.includes("football")) {
    return Trophy;
  }
  if (lowerTitle.includes("animé") || lowerTitle.includes("anime") || lowerTitle.includes("recommandation")) {
    return Tv;
  }
  if (lowerTitle.includes("dashboard") || lowerTitle.includes("stats") || lowerTitle.includes("data")) {
    return BarChart3;
  }
  return FolderGit2;
}

// ==========================================
// COMPOSANT CARTE PROJET
// ==========================================

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const IconComponent = getProjectIcon(project.title);
  
  return (
    <article
      className={cn(
        "journal-box overflow-hidden",
        "group cursor-pointer",
        "transition-all duration-300",
        "hover:shadow-lg hover:border-accent",
        "animate-fade-in",
        featured && "md:col-span-2"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image du projet - Corrigée */}
      <div className={cn(
        "relative overflow-hidden bg-muted",
        featured ? "h-56 md:h-64" : "h-44"
      )}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-contain bg-card",
              "group-hover:scale-102",
              "transition-all duration-500"
            )}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50">
            <IconComponent className="w-16 h-16 text-muted-foreground/30 mb-2" />
            <span className="caption-text text-muted-foreground/50">QUEST #{index + 1}</span>
          </div>
        )}

        {/* Badge Featured avec style RPG */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 text-xs font-mono uppercase tracking-wider">
            <span>★</span> FEATURED
          </div>
        )}

        {/* Badge XP style gaming */}
        <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 text-xs font-mono">
          +{(index + 1) * 100} XP
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Header avec icône gaming */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-muted border border-border">
            <IconComponent className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            {/* Titre */}
            <h3 className={cn(
              "headline text-lg text-primary leading-tight",
              "group-hover:text-accent transition-colors"
            )}>
              {project.title}
            </h3>
            {/* Type de quête */}
            <span className="caption-text text-muted-foreground text-xs">
              {project.featured ? "QUÊTE PRINCIPALE" : "QUÊTE SECONDAIRE"}
            </span>
          </div>
        </div>

        {/* Tags avec style gaming */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={tech}
              className={cn(
                "text-xs px-2 py-0.5 font-mono uppercase tracking-wide",
                i === 0 ? "bg-accent/20 text-accent border border-accent/30" : "bg-muted text-muted-foreground"
              )}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Barre de "complétion" style RPG */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-mono text-muted-foreground">PROGRESS</span>
            <span className="font-mono text-accent">100%</span>
          </div>
          <div className="h-1.5 bg-muted overflow-hidden">
            <div className="h-full bg-accent w-full" />
          </div>
        </div>

        {/* Liens */}
        <div className="flex gap-2 pt-3 border-t border-border">
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-3.5 h-3.5 mr-1.5" />
                CODE
              </a>
            </Button>
          )}

          {project.demoUrl && (
            <Button
              size="sm"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                DEMO
              </a>
            </Button>
          )}

          {!project.githubUrl && !project.demoUrl && (
            <span className="text-xs text-muted-foreground italic font-mono">
              EN DÉVELOPPEMENT...
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-background paper-texture"
    >
      <div className="container mx-auto px-4">
        
        {/* En-tête style journal + gaming */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-5 h-5 text-accent" />
            <span className="journal-badge-filled bg-accent text-accent-foreground">
              QUEST LOG
            </span>
          </div>
          <h2 className="headline text-4xl md:text-5xl text-primary">
            Mes Réalisations
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl flex items-center gap-2">
            <span>🎮</span>
            Découvrez mes quêtes accomplies — projets Data Science mêlant analyse et passions.
          </p>
        </div>

        {/* Stats gaming */}
        <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b-2 border-primary">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-mono text-sm">
              <span className="text-accent font-bold">{projects.length}</span> Quêtes complétées
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent">★</span>
            <span className="font-mono text-sm">
              <span className="text-accent font-bold">{featuredProjects.length}</span> Quêtes principales
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              XP Total: <span className="text-accent font-bold">{projects.length * 500}</span>
            </span>
          </div>
        </div>

        {/* Projets Featured */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg">⚔️</span>
              <h3 className="subheadline text-primary">QUÊTES PRINCIPALES</h3>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* Autres projets */}
        {otherProjects.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-lg">📜</span>
              <h3 className="subheadline text-muted-foreground">QUÊTES SECONDAIRES</h3>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </>
        )}

        {/* Message si aucun projet */}
        {projects.length === 0 && (
          <div className="text-center py-16 journal-box">
            <span className="text-6xl mb-4 block">🗺️</span>
            <p className="headline text-xl text-primary mb-2">Aucune quête disponible</p>
            <p className="text-muted-foreground font-mono text-sm">
              De nouvelles aventures arrivent bientôt...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
