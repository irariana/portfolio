/* ==========================================
   PANNEAU D'ADMINISTRATION
   ==========================================
   
   Interface pour gérer le contenu du portfolio :
   - Profil, compétences, projets, messages
   - CRUD complet avec localStorage
*/

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, User, Wrench, FolderGit2, Mail, LogOut, Plus, Trash2, Save, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isAuthenticated, logout } from "@/lib/authManager";
import { getProfile, updateProfile, getSkills, addSkill, updateSkill, deleteSkill, getProjects, addProject, updateProject, deleteProject, getMessages, deleteMessage, markMessageAsRead, exportData, importData, type Profile, type Skill, type Project, type ContactMessage } from "@/lib/dataManager";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Vérifie l'authentification
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
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-display font-bold gradient-text">Admin Panel</h1>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              <Home className="w-4 h-4" /> Voir le site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" /> Export</Button>
            <label>
              <Button variant="outline" size="sm" asChild><span><Upload className="w-4 h-4 mr-1" /> Import</span></Button>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <Button variant="destructive" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mr-1" /> Déconnexion</Button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="glass">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-1" /> Profil</TabsTrigger>
            <TabsTrigger value="skills"><Wrench className="w-4 h-4 mr-1" /> Compétences ({skills.length})</TabsTrigger>
            <TabsTrigger value="projects"><FolderGit2 className="w-4 h-4 mr-1" /> Projets ({projects.length})</TabsTrigger>
            <TabsTrigger value="messages"><Mail className="w-4 h-4 mr-1" /> Messages ({messages.filter(m => !m.read).length})</TabsTrigger>
          </TabsList>

          {/* Onglet Profil */}
          <TabsContent value="profile" className="p-6 rounded-xl glass">
            <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
            <div className="grid gap-4 max-w-xl">
              <div><Label>Nom</Label><Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
              <div><Label>Titre</Label><Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} /></div>
              <div><Label>Bio</Label><Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></div>
              <div><Label>Avatar URL</Label><Input value={profile.avatar} onChange={(e) => setProfile({ ...profile, avatar: e.target.value })} /></div>
              <div><Label>GitHub</Label><Input value={profile.socials?.github || ""} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })} /></div>
              <div><Label>LinkedIn</Label><Input value={profile.socials?.linkedin || ""} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })} /></div>
              <div><Label>Email</Label><Input value={profile.socials?.email || ""} onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, email: e.target.value } })} /></div>
              <Button onClick={() => { updateProfile(profile); toast({ title: "Profil sauvegardé !" }); }}><Save className="w-4 h-4 mr-1" /> Sauvegarder</Button>
            </div>
          </TabsContent>

          {/* Onglet Compétences */}
          <TabsContent value="skills" className="p-6 rounded-xl glass">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Gérer les compétences</h2>
              <Button size="sm" onClick={() => { addSkill({ name: "Nouvelle", category: "Autres", level: 50 }); loadData(); }}><Plus className="w-4 h-4 mr-1" /> Ajouter</Button>
            </div>
            <div className="grid gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <Input value={skill.name} onChange={(e) => { updateSkill(skill.id, { name: e.target.value }); loadData(); }} className="flex-1" />
                  <Input value={skill.category} onChange={(e) => { updateSkill(skill.id, { category: e.target.value }); loadData(); }} className="w-32" />
                  <Input type="number" value={skill.level} onChange={(e) => { updateSkill(skill.id, { level: parseInt(e.target.value) }); loadData(); }} className="w-20" />
                  <Button variant="destructive" size="icon" onClick={() => { deleteSkill(skill.id); loadData(); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Projets */}
          <TabsContent value="projects" className="p-6 rounded-xl glass">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Gérer les projets</h2>
              <Button size="sm" onClick={() => { addProject({ title: "Nouveau projet", description: "", image: "", technologies: [], featured: false }); loadData(); }}><Plus className="w-4 h-4 mr-1" /> Ajouter</Button>
            </div>
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 rounded-lg bg-muted/50 space-y-3">
                  <div className="flex gap-2">
                    <Input value={project.title} placeholder="Titre" onChange={(e) => { updateProject(project.id, { title: e.target.value }); loadData(); }} />
                    <Button variant="destructive" size="icon" onClick={() => { deleteProject(project.id); loadData(); }}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                  <Textarea value={project.description} placeholder="Description" onChange={(e) => { updateProject(project.id, { description: e.target.value }); loadData(); }} />
                  <Input value={project.technologies.join(", ")} placeholder="Technologies (séparées par virgules)" onChange={(e) => { updateProject(project.id, { technologies: e.target.value.split(",").map(t => t.trim()) }); loadData(); }} />
                  <div className="flex gap-2">
                    <Input value={project.githubUrl || ""} placeholder="URL GitHub" onChange={(e) => { updateProject(project.id, { githubUrl: e.target.value }); loadData(); }} />
                    <Input value={project.demoUrl || ""} placeholder="URL Démo" onChange={(e) => { updateProject(project.id, { demoUrl: e.target.value }); loadData(); }} />
                  </div>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={project.featured} onChange={(e) => { updateProject(project.id, { featured: e.target.checked }); loadData(); }} /> Featured</label>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Messages */}
          <TabsContent value="messages" className="p-6 rounded-xl glass">
            <h2 className="text-xl font-bold mb-4">Messages reçus</h2>
            {messages.length === 0 ? (
              <p className="text-muted-foreground">Aucun message.</p>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("p-4 rounded-lg", msg.read ? "bg-muted/30" : "bg-primary/10 border border-primary/30")} onClick={() => { markMessageAsRead(msg.id); loadData(); }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{msg.name} <span className="text-sm text-muted-foreground">({msg.email})</span></p>
                        <p className="text-sm text-muted-foreground">{new Date(msg.date).toLocaleDateString()}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); loadData(); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    <p className="mt-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
