/* CONTACT SECTION - Style Journal */
import { useState, useEffect } from "react";
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addMessage, getProfile, type Profile } from "@/lib/dataManager";
import { sendContactEmail, isEmailJSConfigured } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FormData { name: string; email: string; message: string; }

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  useEffect(() => { setProfile(getProfile()); }, []);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Formulaire incomplet", description: "Veuillez remplir tous les champs.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      addMessage({ name: formData.name, email: formData.email, message: formData.message });
      if (isEmailJSConfigured()) { await sendContactEmail(formData); }
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({ title: "Message envoyé", description: "Votre message a bien été transmis." });
      setTimeout(() => { setIsSuccess(false); setFormData({ name: "", email: "", message: "" }); }, 3000);
    } catch {
      setIsSubmitting(false);
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="journal-badge mb-4 inline-block">CONTACT</span>
          <h2 className="headline text-4xl md:text-5xl text-primary mt-4">Connect Now</h2>
          <p className="text-muted-foreground mt-2 italic">"Operators are standing by to take your call."</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="journal-box p-6 flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="subheadline text-primary mb-1">EMAIL INQUIRY</h3>
                <p className="text-muted-foreground text-sm">{profile?.socials?.email || "contact@example.com"}</p>
              </div>
            </div>
            <div className="journal-box p-6 flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="subheadline text-primary mb-1">LOCATION</h3>
                <p className="text-muted-foreground text-sm">France 🇫🇷</p>
              </div>
            </div>
            <div className="journal-box p-6">
              <h3 className="subheadline text-primary mb-4">RÉSEAUX</h3>
              <div className="flex gap-4">
                {profile?.socials?.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="journal-badge hover:bg-primary hover:text-primary-foreground transition-colors">LINKEDIN</a>
                )}
                {profile?.socials?.github && (
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="journal-badge hover:bg-primary hover:text-primary-foreground transition-colors">GITHUB</a>
                )}
              </div>
            </div>
          </div>

          <div className="journal-box-bordered p-8">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-scale-in py-12">
                <CheckCircle className="w-16 h-16 text-success mb-4" />
                <h3 className="headline text-2xl text-primary mb-2">Message envoyé !</h3>
                <p className="text-muted-foreground">Je vous répondrai rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="subheadline text-muted-foreground">VOTRE NOM</Label>
                  <Input id="name" type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="border-border focus:border-primary" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="subheadline text-muted-foreground">VOTRE EMAIL</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="border-border focus:border-primary" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="subheadline text-muted-foreground">VOTRE MESSAGE</Label>
                  <Textarea id="message" value={formData.message} onChange={(e) => handleChange("message", e.target.value)} className="border-border focus:border-primary min-h-[120px]" required />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi...</> : <><Send className="w-4 h-4 mr-2" />Envoyer</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
