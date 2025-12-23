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

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group cursor-pointer",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image du projet avec filtre grayscale */}
      <div className="relative overflow-hidden bg-muted aspect-[4/3] mb-3">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover",
              "grayscale group-hover:grayscale-0",
              "group-hover:scale-105",
              "transition-all duration-500"
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50 grayscale group-hover:grayscale-0 transition-all duration-500">
            <span className="text-4xl">📁</span>
          </div>
        )}
      </div>

      {/* Titre simple */}
      <h3 className={cn(
        "font-serif text-sm text-primary leading-tight",
        "group-hover:text-accent transition-colors"
      )}>
        {project.title}
      </h3>

      {/* Liens discrets */}
      <div className="flex gap-3 mt-1">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            GitHub →
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            Demo →
          </a>
        )}
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

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-background paper-texture"
    >
      <div className="container mx-auto px-4">
        
        {/* En-tête simple style journal */}
        <div className="mb-12">
          <h2 className="headline text-4xl md:text-5xl text-primary mb-2">
            Projets
          </h2>
          <div className="h-px bg-border w-full" />
        </div>

        {/* Grille de projets en petit format */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Message si aucun projet */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl mb-4 block">📁</span>
            <p className="text-muted-foreground">
              Aucun projet disponible
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
