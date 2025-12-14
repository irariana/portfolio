/* ==========================================
   COMPOSANT ABOUT SECTION - STYLE RPG
   ==========================================
   
   Affiche le profil du héros avec ses stats et
   son historique des quêtes (timeline éditable).
*/

import { useEffect, useState } from "react";
import { User, Calendar, Shield, Star, Gamepad2, Trophy, Tv, Code } from "lucide-react";
import { getProfile, getTimeline, type Profile, type TimelineItem } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

// Stats RPG du personnage
const stats = [
  { label: "HP", value: 100, max: 100, color: "bg-success" },
  { label: "MP", value: 85, max: 100, color: "bg-secondary" },
  { label: "XP", value: 7500, max: 10000, color: "bg-primary" },
];

// Passions/équipements
const interests = [
  { icon: Gamepad2, name: "Jeux Vidéo", color: "text-primary", stat: "+15 INT" },
  { icon: Trophy, name: "E-Sport", color: "text-secondary", stat: "+10 DEX" },
  { icon: Tv, name: "Animés", color: "text-tertiary", stat: "+12 CHA" },
  { icon: Code, name: "Programmation", color: "text-success", stat: "+20 WIS" },
];

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setTimeline(getTimeline());
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 relative bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 font-display text-pixel-sm text-primary mb-4">
            <Shield className="w-4 h-4" />
            CHARACTER INFO
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-primary">
            PROFIL DU HÉROS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche : Avatar et stats */}
          <div className="space-y-8">
            {/* Carte personnage RPG */}
            <div className="rpg-box p-6">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className={cn(
                  "w-32 h-32 flex-shrink-0",
                  "border-4 border-primary",
                  "bg-card overflow-hidden"
                )}>
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <User className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Infos */}
                <div className="flex-1">
                  <h3 className="font-display text-pixel-base text-primary mb-1">
                    {profile?.name || "HERO_NAME"}
                  </h3>
                  <p className="text-secondary font-sans text-lg mb-3">
                    {profile?.title || "Data Scientist LVL 42"}
                  </p>
                  
                  {/* Barres de stats */}
                  <div className="space-y-2">
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-2">
                        <span className="w-8 text-xs font-display text-muted-foreground">{stat.label}</span>
                        <div className="flex-1 h-4 bg-muted border-2 border-border">
                          <div 
                            className={cn("h-full", stat.color)}
                            style={{ width: `${(stat.value / stat.max) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-foreground w-16">
                          {stat.value}/{stat.max}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 pt-4 border-t-2 border-primary/30">
                <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                  {profile?.bio || "Passionné par la Data Science, les jeux vidéo et les animés."}
                </p>
              </div>
            </div>

            {/* Passions/Items équipés */}
            <div className="rpg-box p-6">
              <h3 className="font-display text-pixel-sm text-secondary mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                ÉQUIPEMENT (Passions)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <div key={interest.name} className={cn(
                    "flex items-center justify-between p-3",
                    "bg-muted/50 border-2 border-border",
                    "hover:border-primary/50 transition-colors"
                  )}>
                    <div className="flex items-center gap-2">
                      <interest.icon className={cn("w-5 h-5", interest.color)} />
                      <span className="font-sans text-foreground">{interest.name}</span>
                    </div>
                    <span className="text-xs text-success font-mono">{interest.stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Timeline dynamique */}
          <div className="rpg-box p-6">
            <h3 className="font-display text-pixel-sm text-primary mb-6 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              HISTORIQUE DES QUÊTES
            </h3>

            <div className="space-y-6">
              {timeline.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Aucune quête dans l'historique. Ajoutez-en via l'admin !
                </p>
              ) : (
                timeline.map((item, index) => (
                  <div key={item.id} className={cn(
                    "relative pl-8",
                    "before:absolute before:left-0 before:top-0 before:bottom-0",
                    "before:w-1 before:bg-primary/30",
                    index === timeline.length - 1 && "before:hidden"
                  )}>
                    <div className={cn(
                      "absolute left-0 -translate-x-1/2",
                      "w-4 h-4 bg-primary border-2 border-background"
                    )} />
                    <div className="p-4 bg-muted/30 border-2 border-border">
                      <span className="font-display text-pixel-xs text-primary">{item.year}</span>
                      <h4 className="font-sans text-lg text-foreground mt-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
