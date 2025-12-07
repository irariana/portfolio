/* ==========================================
   PAGE DE CONNEXION ADMIN
   ==========================================
   
   Formulaire de connexion pour accéder au panneau admin.
   Mot de passe par défaut : admin123
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/authManager";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(password);

    if (success) {
      toast({ title: "Connexion réussie !", description: "Bienvenue dans le panneau admin." });
      navigate("/admin");
    } else {
      toast({ title: "Erreur", description: "Mot de passe incorrect.", variant: "destructive" });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Retour à l'accueil */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </Link>

        {/* Carte de connexion */}
        <div className="p-8 rounded-xl glass animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold gradient-text">Connexion Admin</h1>
            <p className="text-muted-foreground text-sm mt-2">Mot de passe par défaut : admin123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
