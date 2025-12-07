/* ==========================================
   COMPOSANT CONTACT SECTION
   ==========================================
   
   Formulaire de contact avec animation.
   Les messages sont stockés dans localStorage
   et visibles dans le panneau admin.
   
   Fonctionnalités :
   - Formulaire avec validation
   - Animation de succès après envoi
   - Liens vers les réseaux sociaux
   - Design glassmorphism
*/

import { useState, useEffect } from "react";
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addMessage, getProfile, type Profile } from "@/lib/dataManager";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ==========================================
// INTERFACE DU FORMULAIRE
// ==========================================

interface FormData {
  name: string;
  email: string;
  message: string;
}

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export function ContactSection() {
  // ------------------------------------------
  // ÉTATS
  // ------------------------------------------

  // Données du formulaire
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // État de chargement (pendant l'envoi)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État de succès (après envoi)
  const [isSuccess, setIsSuccess] = useState(false);

  // Profil pour les liens sociaux
  const [profile, setProfile] = useState<Profile | null>(null);

  // Hook pour les notifications toast
  const { toast } = useToast();

  // ------------------------------------------
  // EFFET : Charger le profil
  // ------------------------------------------

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  // ------------------------------------------
  // GESTION DES CHANGEMENTS DE CHAMP
  // ------------------------------------------

  /**
   * Met à jour l'état du formulaire quand un champ change
   * @param field - Nom du champ (name, email, message)
   * @param value - Nouvelle valeur du champ
   */
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ------------------------------------------
  // SOUMISSION DU FORMULAIRE
  // ------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    // Empêche le rechargement de la page
    e.preventDefault();

    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    // Début de l'envoi
    setIsSubmitting(true);

    // Simule un délai réseau (pour l'animation)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Sauvegarde le message dans localStorage
    addMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    // Affiche le succès
    setIsSubmitting(false);
    setIsSuccess(true);

    // Notification de succès
    toast({
      title: "Message envoyé !",
      description: "Merci pour votre message. Je vous répondrai rapidement.",
    });

    // Réinitialise le formulaire après 3 secondes
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  // ------------------------------------------
  // RENDU JSX
  // ------------------------------------------

  return (
    <section
      id="contact"
      className={cn(
        "py-20 md:py-32",
        "relative",
        "bg-gradient-to-b from-background to-muted/30"
      )}
    >
      <div className="container mx-auto px-4">
        {/* ========================================
            EN-TÊTE DE SECTION
            ======================================== */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-full",
              "glass text-primary text-sm font-medium",
              "mb-4"
            )}
          >
            <Mail className="w-4 h-4" />
            Contact
          </div>

          {/* Titre */}
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Travaillons ensemble
          </h2>

          {/* Description */}
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une idée de projet ? Une question ? N'hésitez pas à me contacter !
          </p>
        </div>

        {/* ========================================
            CONTENU (2 colonnes)
            ======================================== */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* ------------------------------------------
              COLONNE GAUCHE : Infos de contact
              ------------------------------------------ */}
          <div className="space-y-8">
            {/* Carte d'info avec email */}
            <div
              className={cn(
                "p-6 rounded-xl glass",
                "flex items-start gap-4"
              )}
            >
              <div className="p-3 rounded-lg bg-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">
                  {profile?.socials?.email || "contact@example.com"}
                </p>
              </div>
            </div>

            {/* Carte d'info avec localisation */}
            <div
              className={cn(
                "p-6 rounded-xl glass",
                "flex items-start gap-4"
              )}
            >
              <div className="p-3 rounded-lg bg-secondary/20">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Localisation
                </h3>
                <p className="text-muted-foreground">France</p>
              </div>
            </div>

            {/* Liens réseaux sociaux */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Me retrouver</h3>
              <div className="flex gap-4">
                {/* GitHub */}
                {profile?.socials?.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-lg glass",
                      "text-muted-foreground hover:text-primary",
                      "transition-all duration-300",
                      "hover:scale-110 hover:shadow-glow"
                    )}
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}

                {/* LinkedIn */}
                {profile?.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-lg glass",
                      "text-muted-foreground hover:text-primary",
                      "transition-all duration-300",
                      "hover:scale-110 hover:shadow-glow"
                    )}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------------------------
              COLONNE DROITE : Formulaire
              ------------------------------------------ */}
          <div className="p-8 rounded-xl glass">
            {isSuccess ? (
              /* Affichage du succès */
              <div className="h-full flex flex-col items-center justify-center text-center animate-scale-in">
                <CheckCircle className="w-16 h-16 text-success mb-4" />
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  Message envoyé !
                </h3>
                <p className="text-muted-foreground">
                  Je vous répondrai dès que possible.
                </p>
              </div>
            ) : (
              /* Formulaire */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ Nom */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>

                {/* Champ Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>

                {/* Champ Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Votre message..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="bg-background/50 border-border focus:border-primary min-h-[150px]"
                    required
                  />
                </div>

                {/* Bouton d'envoi */}
                <Button
                  type="submit"
                  size="lg"
                  className={cn(
                    "w-full",
                    "gradient-primary text-primary-foreground",
                    "font-semibold",
                    "glow-hover"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
