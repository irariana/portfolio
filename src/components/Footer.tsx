/* FOOTER - Style Journal */
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { getProfile, type Profile } from "@/lib/dataManager";
import { cn } from "@/lib/utils";

const quickLinks = [
  { name: "Accueil", href: "#hero" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const currentYear = new Date().getFullYear();
  useEffect(() => { setProfile(getProfile()); }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace("#", ""));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="headline text-2xl mb-4">{profile?.name?.split(" ")[0] || "Portfolio"}</h3>
            <p className="text-primary-foreground/70 text-sm">
              Portfolio Data Science avec une touche gaming et passion pour l'analyse.
            </p>
          </div>
          <div>
            <h4 className="subheadline text-primary-foreground/80 mb-4">NAVIGATION</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="subheadline text-primary-foreground/80 mb-4">CONNECT</h4>
            <div className="flex gap-4">
              {profile?.socials?.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground"><Github className="w-5 h-5" /></a>}
              {profile?.socials?.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground"><Linkedin className="w-5 h-5" /></a>}
              {profile?.socials?.email && <a href={`mailto:${profile.socials.email}`} className="text-primary-foreground/70 hover:text-primary-foreground"><Mail className="w-5 h-5" /></a>}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {currentYear} {profile?.name || "Portfolio"}. Tous droits réservés.</p>
          <p className="flex items-center gap-1">Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> and ☕</p>
        </div>
      </div>
    </footer>
  );
}
