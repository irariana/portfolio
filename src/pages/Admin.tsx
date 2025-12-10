/* ==========================================
   PANNEAU D'ADMINISTRATION - STYLE RPG
   ==========================================
   
   Interface pour gérer le contenu du portfolio :
   - Profil avec upload d'avatar
   - Compétences, projets avec images
   - Messages et changement de mot de passe
*/

import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, User, Wrench, FolderGit2, Mail, LogOut, Plus, Trash2, Save, Download, Upload, Key, Image, Eye, EyeOff, Lock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isAuthenticated, logout, changePassword } from "@/lib/authManager";
import { getProfile, updateProfile, getSkills, addSkill, updateSkill, deleteSkill, getProjects, addProject, updateProject, deleteProject, getMessages, deleteMessage, markMessageAsRead, exportData, importData, type Profile, type Skill, type Project, type ContactMessage } from "@/lib/dataManager";
import { uploadImage, type ImageUploadResult } from "@/lib/imageManager";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// ==========================================
// COMPOSANT UPLOAD D'IMAGE
// ==========================================

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (base64: string) => void;
  label: string;
}

function ImageUpload({ currentImage, onImageChange, label }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Utilise uploadImage qui valide et compresse automatiquement
      const result = await uploadImage(file, 800);

      if (!result.success) {
        toast({
          title: "Erreur",
          description: result.error || "Impossible de traiter l'image.",
          variant: "destructive"
        });
        return;
      }

      if (result.dataUrl) {
        onImageChange(result.dataUrl);
        toast({ title: "Image uploadée !", description: "L'image a été ajoutée avec succès." });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de traiter l'image.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        {/* Prévisualisation */}
        <div className="w-20 h-20 rounded-lg border border-border bg-muted/50 overflow-hidden flex items-center justify-center">
          {currentImage ? (
            <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Image className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-1" /> Choisir une image
          </Button>
          {currentImage && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onImageChange("")}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Supprimer
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

// ==========================================
// COMPOSANT CHANGEMENT DE MOT DE PASSE
// ==========================================

function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 4) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 4 caractères.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await changePassword(currentPassword, newPassword);
    setIsLoading(false);

    if (success) {
      toast({ title: "Succès", description: "Mot de passe modifié avec succès !" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast({
        title: "Erreur",
        description: "Mot de passe actuel incorrect.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label>Mot de passe actuel</Label>
        <div className="relative">
          <Input
            type={showPasswords ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Nouveau mot de passe</Label>
        <Input
          type={showPasswords ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Confirmer le nouveau mot de passe</Label>
        <Input
          type={showPasswords ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPasswords(!showPasswords)}
        >
          {showPasswords ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {showPasswords ? "Masquer" : "Afficher"}
        </Button>
      </div>

      <Button type="submit" disabled={isLoading}>
        <Key className="w-4 h-4 mr-1" />
        {isLoading ? "Modification..." : "Changer le mot de passe"}
      </Button>
    </form>
  );
}

// ==========================================
// COMPOSANT PRINCIPAL ADMIN
// ==========================================

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Vérification de l'authentification
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setProfile(getProfile());
    setSkills(getSkills());
    setProjects(getProjects());
    setMessages(getMessages());
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    toast({ title: "Export réussi", description: "Données exportées en JSON." });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importData(event.target?.result as string);
      if (success) {
        loadData();
        toast({ title: "Import réussi", description: "Données importées avec succès." });
      } else {
        toast({ title: "Erreur", description: "Fichier invalide.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header RPG */}
      <header className="sticky top-0 z-50 rpg-box border-b border-border/50 rounded-none mb-6">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-display font-bold">
              <span className="neon-text">Admin Panel</span>
            </h1>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 font-pixel text-xs">
              <Home className="w-4 h-4" /> Retour au jeu
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {import.meta.env.DEV ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Mode Éditeur (PC)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">
                <Lock className="w-3 h-3" />
                Lecture Seule
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleExport} className="font-pixel text-xs">
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
            <label>
              <Button variant="outline" size="sm" asChild className="font-pixel text-xs">
                <span><Upload className="w-4 h-4 mr-1" /> Import</span>
              </Button>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="font-pixel text-xs">
              <LogOut className="w-4 h-4 mr-1" /> Quitter
            </Button>
          </div>
        </div>
      </header>

      {import.meta.env.PROD && (
        <div className="container mx-auto px-4 mb-6">
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex items-center gap-3 text-destructive">
            <div className="p-2 bg-destructive/20 rounded-full">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Modifications impossibles depuis ce lien</h3>
              <p className="text-sm opacity-90">
                Vous êtes sur la version publique du site (GitHub Pages).
                Pour modifier le contenu et sauvegarder, vous devez utiliser <strong>votre site local sur votre ordinateur</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contenu */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="rpg-box p-1">
            <TabsTrigger value="profile" className="font-pixel text-xs"><User className="w-4 h-4 mr-1" /> Profil</TabsTrigger>
            <TabsTrigger value="skills" className="font-pixel text-xs"><Wrench className="w-4 h-4 mr-1" /> Skills ({skills.length})</TabsTrigger>
            <TabsTrigger value="projects" className="font-pixel text-xs"><FolderGit2 className="w-4 h-4 mr-1" /> Quêtes ({projects.length})</TabsTrigger>
            <TabsTrigger value="messages" className="font-pixel text-xs"><Mail className="w-4 h-4 mr-1" /> Messages ({messages.filter(m => !m.read).length})</TabsTrigger>
            <TabsTrigger value="settings" className="font-pixel text-xs"><Key className="w-4 h-4 mr-1" /> Sécurité</TabsTrigger>
          </TabsList>

          {/* Onglet Profil */}
          <TabsContent value="profile" className="p-6 rounded-xl rpg-box">
            <h2 className="text-xl font-bold mb-6 neon-text">Fiche du Personnage</h2>
            <div className="grid gap-6 max-w-xl">
              {/* Upload Avatar */}
              <ImageUpload
                currentImage={profile.avatar}
                onImageChange={(base64) => {
                  const updated = { ...profile, avatar: base64 };
                  setProfile(updated);
                  updateProfile(updated);
                }}
                label="Avatar du Héros"
              />

              <div><Label>Nom</Label><Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
              <div><Label>Titre / Classe</Label><Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} /></div>
              <div><Label>Biographie</Label><Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></div>
              <div><Label>GitHub</Label><Input value={profile.socials?.github || ""} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })} /></div>
              <div><Label>LinkedIn</Label><Input value={profile.socials?.linkedin || ""} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })} /></div>
              <div><Label>Email</Label><Input value={profile.socials?.email || ""} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, email: e.target.value } })} /></div>
              <Button onClick={() => { updateProfile(profile); toast({ title: "Profil sauvegardé !" }); }}>
                <Save className="w-4 h-4 mr-1" /> Sauvegarder
              </Button>
            </div>
          </TabsContent>

          {/* Onglet Compétences */}
          <TabsContent value="skills" className="p-6 rounded-xl rpg-box">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold neon-text">Arbre de Compétences</h2>
              <Button size="sm" onClick={() => { addSkill({ name: "Nouvelle", category: "Autres", level: 50 }); loadData(); }}>
                <Plus className="w-4 h-4 mr-1" /> Ajouter
              </Button>
            </div>
            <div className="grid gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <Input value={skill.name} placeholder="Nom" onChange={(e) => { updateSkill(skill.id, { name: e.target.value }); loadData(); }} className="flex-1" />
                  <Input value={skill.category} placeholder="Catégorie" onChange={(e) => { updateSkill(skill.id, { category: e.target.value }); loadData(); }} className="w-32" />
                  <Input type="number" min="0" max="100" value={skill.level} onChange={(e) => { updateSkill(skill.id, { level: parseInt(e.target.value) || 0 }); loadData(); }} className="w-20" />
                  <Button variant="destructive" size="icon" onClick={() => { deleteSkill(skill.id); loadData(); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Projets */}
          <TabsContent value="projects" className="p-6 rounded-xl rpg-box">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold neon-text">Journal de Quêtes</h2>
              <Button size="sm" onClick={() => { addProject({ title: "Nouvelle quête", description: "", image: "", technologies: [], featured: false }); loadData(); }}>
                <Plus className="w-4 h-4 mr-1" /> Ajouter
              </Button>
            </div>
            <div className="grid gap-6">
              {projects.map((project) => (
                <div key={project.id} className="p-6 rounded-lg bg-muted/30 border border-border/50 space-y-4">
                  <div className="flex gap-4">
                    {/* Upload image projet */}
                    <div className="w-32 h-24 rounded border border-border bg-muted/50 overflow-hidden flex-shrink-0">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input value={project.title} placeholder="Titre" onChange={(e) => { updateProject(project.id, { title: e.target.value }); loadData(); }} />
                      <div className="flex gap-2">
                        <label className="flex-1">
                          <Button type="button" variant="outline" size="sm" className="w-full" asChild>
                            <span><Upload className="w-4 h-4 mr-1" /> Image</span>
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const result = await uploadImage(file, 600);
                                if (result.success && result.dataUrl) {
                                  updateProject(project.id, { image: result.dataUrl });
                                  loadData();
                                }
                              }
                            }}
                          />
                        </label>
                        <Button variant="destructive" size="sm" onClick={() => { deleteProject(project.id); loadData(); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Textarea value={project.description} placeholder="Description" onChange={(e) => { updateProject(project.id, { description: e.target.value }); loadData(); }} />
                  <Input value={project.technologies.join(", ")} placeholder="Technologies (séparées par virgules)" onChange={(e) => { updateProject(project.id, { technologies: e.target.value.split(",").map(t => t.trim()) }); loadData(); }} />
                  <div className="flex gap-2">
                    <Input value={project.githubUrl || ""} placeholder="URL GitHub" onChange={(e) => { updateProject(project.id, { githubUrl: e.target.value }); loadData(); }} />
                    <Input value={project.demoUrl || ""} placeholder="URL Démo" onChange={(e) => { updateProject(project.id, { demoUrl: e.target.value }); loadData(); }} />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={project.featured} onChange={(e) => { updateProject(project.id, { featured: e.target.checked }); loadData(); }} />
                    <span className="font-pixel text-xs">⭐ Quête Principale (Featured)</span>
                  </label>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Messages */}
          <TabsContent value="messages" className="p-6 rounded-xl rpg-box">
            <h2 className="text-xl font-bold mb-4 neon-text">Parchemins Reçus</h2>
            {messages.length === 0 ? (
              <p className="text-muted-foreground font-pixel text-xs">Aucun message dans la boîte aux lettres...</p>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "p-4 rounded-lg cursor-pointer transition-colors",
                      msg.read ? "bg-muted/20" : "bg-primary/10 border border-primary/30"
                    )}
                    onClick={() => { markMessageAsRead(msg.id); loadData(); }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{msg.name} <span className="text-sm text-muted-foreground">({msg.email})</span></p>
                        <p className="text-xs text-muted-foreground font-pixel">{new Date(msg.date).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); loadData(); }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="settings" className="p-6 rounded-xl rpg-box">
            <h2 className="text-xl font-bold mb-6 neon-text">Paramètres de Sécurité</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-pixel text-xs text-accent mb-4">CHANGER LE MOT DE PASSE</h3>
                <PasswordChangeForm />
              </div>
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <h3 className="font-pixel text-xs text-accent mb-2">INFORMATIONS</h3>
                <p className="text-sm text-muted-foreground">
                  Le mot de passe par défaut est "admin". Pensez à le changer pour sécuriser votre panneau d'administration.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
