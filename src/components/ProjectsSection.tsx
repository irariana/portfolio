/* ==========================================
   COMPOSANT PROJECTS SECTION (PROJETS)
   ==========================================
   
   Affiche les projets du portfolio sous forme de cartes.
   
   Fonctionnalités :
   - Cartes avec image, titre, description
   - Tags des technologies utilisées
   - Liens vers GitHub et démo
   - Animation au hover avec effet de scale
   - Filtrage par projet "featured" (mis en avant)
*/

import { useEffect, useState } from "react";
import { ExternalLink, Github, FolderGit2, Gamepad2, Trophy, Tv, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects, type Project } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// ==========================================
// MAPPING DES ICÔNES PAR THÈME
// ==========================================
// Associe un thème/mot-clé à une icône pour illustrer les projets

function getProjectIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("esport") || lowerTitle.includes("lol") || lowerTitle.includes("gaming")) {
    return Gamepad2;
  }
  if (lowerTitle.includes("sport") || lowerTitle.includes("football")) {
    return Trophy;
  }
  if (lowerTitle.includes("animé") || lowerTitle.includes("anime") || lowerTitle.includes("recommandation")) {
    return Tv;
  }
  if (lowerTitle.includes("dashboard") || lowerTitle.includes("stats")) {
    return BarChart;
  }
  return FolderGit2;
}

// ==========================================
// COMPOSANT CARTE DE PROJET
// ==========================================

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  // Récupère l'icône appropriée selon le titre du projet
  const IconComponent = getProjectIcon(project.title);

  return (
    <article
      className={cn(
        // Container de la carte
        "group relative",
        "rounded-xl overflow-hidden",
        "glass",
        // Animation au hover
        "hover:scale-[1.02] hover:shadow-glow",
        "transition-all duration-300",
        // Animation d'apparition
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ========================================
          IMAGE DU PROJET
          ======================================== */}
      <div
        className={cn(
          "relative h-48 overflow-hidden",
          "bg-gradient-to-br from-primary/20 via-secondary/20 to-tertiary/20"
        )}
      >
        {project.image ? (
          // Si une image existe, l'afficher
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover",
              "group-hover:scale-110 transition-transform duration-500"
            )}
          />
        ) : (
          // Sinon, afficher une icône par défaut
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent
              className={cn(
                "w-20 h-20 text-primary/40",
                "group-hover:scale-110 group-hover:text-primary/60",
                "transition-all duration-300"
              )}
            />
          </div>
        )}

        {/* Overlay dégradé au hover */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-t from-card via-transparent to-transparent",
            "opacity-60 group-hover:opacity-80",
            "transition-opacity duration-300"
          )}
        />

        {/* Badge "Featured" si le projet est mis en avant */}
        {project.featured && (
          <div
            className={cn(
              "absolute top-3 right-3",
              "px-3 py-1 rounded-full",
              "gradient-primary text-primary-foreground",
              "text-xs font-semibold"
            )}
          >
            ⭐ Featured
          </div>
        )}
      </div>

      {/* ========================================
          CONTENU DE LA CARTE
          ======================================== */}
      <div className="p-6">
        {/* Titre du projet */}
        <h3
          className={cn(
            "text-xl font-display font-bold",
            "text-foreground mb-2",
            "group-hover:text-primary transition-colors"
          )}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags des technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={tech}
              className={cn(
                "px-2 py-1 rounded-md",
                "text-xs font-medium",
                // Alternance de couleurs pour les tags
                techIndex % 3 === 0 && "bg-primary/20 text-primary",
                techIndex % 3 === 1 && "bg-secondary/20 text-secondary",
                techIndex % 3 === 2 && "bg-tertiary/20 text-tertiary"
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Liens (GitHub + Démo) */}
        <div className="flex gap-3">
          {/* Lien GitHub */}
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex-1",
                "border-primary/30 text-primary",
                "hover:bg-primary/10 hover:border-primary"
              )}
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

          {/* Lien Démo */}
          {project.demoUrl && (
            <Button
              size="sm"
              className="flex-1 gradient-primary text-primary-foreground"
              asChild
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Démo
              </a>
            </Button>
          )}

          {/* Si pas de liens, bouton désactivé */}
          {!project.githubUrl && !project.demoUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 opacity-50 cursor-not-allowed"
              disabled
            >
              Bientôt disponible
            </Button>
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
  // État pour stocker les projets
  const [projects, setProjects] = useState<Project[]>([]);

  // Charge les projets au montage
  useEffect(() => {
    setProjects(getProjects());
  }, []);

  // Sépare les projets featured des autres
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className={cn(
        "py-20 md:py-32",
        "bg-gradient-to-b from-muted/30 to-background"
      )}
    >
      <div className="container mx-auto px-4">
        {/* ========================================
            EN-TÊTE DE SECTION
            ======================================== */}
        <div className="text-center mb-16">
          {/* Badge "Projets" */}
          <div
            className={cn(
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-full",
              "glass text-primary text-sm font-medium",
              "mb-4"
            )}
          >
            <FolderGit2 className="w-4 h-4" />
            Projets
          </div>

          {/* Titre principal */}
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Mes Réalisations
          </h2>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes projets alliant Data Science et mes passions :
            gaming, sports et animés.
          </p>
        </div>

        {/* ========================================
            PROJETS MIS EN AVANT (Featured)
            ======================================== */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              Projets phares
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* ========================================
            AUTRES PROJETS
            ======================================== */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-secondary" />
              Autres projets
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* ========================================
            MESSAGE SI AUCUN PROJET
            ======================================== */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <FolderGit2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Aucun projet pour le moment. Ajoutez-en via le panneau admin !
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
