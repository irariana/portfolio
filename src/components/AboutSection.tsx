/* ==========================================
   COMPOSANT ABOUT SECTION - STYLE JOURNAL VINTAGE
   ==========================================
   
   Présentation du profil style article de journal
   avec sidebar pour les infos académiques.
*/

import { useEffect, useState } from "react";
import { getProfile, getTimeline, type Profile, type TimelineItem } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// Passions avec style gaming
const interests = [
  { name: "Gaming", icon: "🎮" },
  { name: "E-Sport", icon: "🏆" },
  { name: "Animés", icon: "📺" },
  { name: "Data Science", icon: "📊" },
];

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setTimeline(getTimeline());
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 relative bg-background paper-texture">
      <div className="container mx-auto px-4">
        
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <span className="journal-badge mb-4 inline-block">À PROPOS</span>
          <h2 className="headline text-4xl md:text-5xl text-primary mt-4">
            Profil du Candidat
          </h2>
        </div>

        {/* Grille principale style journal */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Colonne principale - Article */}
          <div className="lg:col-span-8">
            <article className="journal-box p-6 md:p-8">
              <h3 className="headline text-2xl text-primary mb-4">
                Parcours & Motivations
              </h3>
              
              <div className="body-text text-foreground/90 space-y-4 drop-cap">
                <p>
                  {profile?.bio || 
                    "Passionné par la Data Science, les jeux vidéo et les animés. Je cherche à appliquer l'analyse de données dans mes domaines de passion : e-sport, statistiques sportives et les recherches en tout genre."}
                </p>
                <p>
                  Mon approche combine la rigueur analytique avec une passion profonde pour l'univers du gaming et de la culture geek. Chaque projet est une nouvelle quête, chaque dataset un territoire à explorer.
                </p>
              </div>

              {/* Séparateur */}
              <div className="journal-divider my-8" />

              {/* Passions/Intérêts */}
              <div>
                <h4 className="subheadline text-muted-foreground mb-4">CENTRES D'INTÉRÊT</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {interests.map((interest) => (
                    <div 
                      key={interest.name}
                      className={cn(
                        "text-center p-4 journal-box",
                        "hover:border-primary transition-colors"
                      )}
                    >
                      <span className="text-3xl mb-2 block">{interest.icon}</span>
                      <span className="caption-text text-foreground">{interest.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar - Style encadré journal */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Academic Notices */}
            <div className="journal-box-bordered p-6">
              <h3 className="subheadline text-primary mb-4 pb-2 border-b border-border">
                PARCOURS ACADÉMIQUE
              </h3>
              
              <div className="space-y-6">
                {timeline.length === 0 ? (
                  <p className="text-muted-foreground text-sm italic">
                    Historique en cours de rédaction...
                  </p>
                ) : (
                  timeline.slice(0, 4).map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-display font-semibold text-foreground text-sm">
                          {item.title}
                        </h4>
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="journal-box p-6">
              <h3 className="subheadline text-primary mb-4 pb-2 border-b border-border">
                STATISTIQUES RAPIDES
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projets réalisés</span>
                  <span className="font-mono text-primary font-bold">12+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Années d'études</span>
                  <span className="font-mono text-primary font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Heures de gaming</span>
                  <span className="font-mono text-primary font-bold">∞</span>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}
