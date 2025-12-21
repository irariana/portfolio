/* ==========================================
   COMPOSANT PROJECTS SECTION - STYLE JOURNAL VINTAGE
   ==========================================
   
   Projets présentés comme des articles de journal
   "Featured Projects" avec images et descriptions.
*/

import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, type Project } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// COMPOSANT CARTE PROJET
// ==========================================

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "journal-box overflow-hidden",
        "group cursor-pointer",
        "transition-all duration-300",
        "hover:shadow-lg",
        "animate-fade-in",
        featured && "md:col-span-2"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image du projet */}
      <div className={cn(
        "relative overflow-hidden bg-muted",
        featured ? "h-64" : "h-48"
      )}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover",
              "grayscale group-hover:grayscale-0",
              "transition-all duration-500",
              "group-hover:scale-105"
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-30">📁</span>
          </div>
        )}

        {/* Badge Featured */}
        {project.featured && (
          <div className="absolute top-4 left-4 journal-badge-filled">
            FEATURED
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="journal-badge text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className={cn(
          "headline text-xl text-primary mb-2",
          "group-hover:text-accent transition-colors"
        )}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Liens */}
        <div className="flex gap-3 pt-4 border-t border-border">
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}

          {project.demoUrl && (
            <Button
              size="sm"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Voir
              </a>
            </Button>
          )}

          {!project.githubUrl && !project.demoUrl && (
            <span className="text-sm text-muted-foreground italic">
              Bientôt disponible
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
        
        {/* En-tête style journal */}
        <div className="mb-12">
          <div className="journal-badge-filled inline-block mb-4">
            FEATURED PROJECTS
          </div>
          <h2 className="headline text-4xl md:text-5xl text-primary">
            Mes Réalisations
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Découvrez mes projets alliant Data Science et passions personnelles.
            Chaque projet est une nouvelle aventure analytique.
          </p>
        </div>

        {/* Ligne décorative */}
        <div className="journal-divider-double mb-8" />

        {/* Projets Featured */}
        {featuredProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                featured
              />
            ))}
          </div>
        )}

        {/* Autres projets */}
        {otherProjects.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="subheadline text-muted-foreground">AUTRES PROJETS</h3>
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
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-muted-foreground">
              Les projets arrivent bientôt...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
