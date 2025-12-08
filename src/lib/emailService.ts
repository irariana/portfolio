/* ==========================================
   SERVICE D'ENVOI D'EMAILS - EMAILJS
   ==========================================
   
   Ce fichier gère l'envoi d'emails via EmailJS.
   
   CONFIGURATION REQUISE :
   1. Créer un compte sur https://www.emailjs.com/
   2. Créer un service email (Gmail, Outlook, etc.)
   3. Créer un template d'email
   4. Récupérer les IDs et la clé publique
   
   VARIABLES À CONFIGURER (dans les secrets Lovable) :
   - EMAILJS_SERVICE_ID : ID du service email
   - EMAILJS_TEMPLATE_ID : ID du template
   - EMAILJS_PUBLIC_KEY : Clé publique EmailJS
   
   Le template doit contenir ces variables :
   - {{from_name}} : Nom de l'expéditeur
   - {{from_email}} : Email de l'expéditeur
   - {{message}} : Le message
   - {{to_name}} : Ton nom (destinataire)
*/

import emailjs from "@emailjs/browser";

// ==========================================
// CONFIGURATION
// ==========================================

// Ces valeurs sont récupérées depuis les secrets Lovable
// ou tu peux les mettre directement ici si tu préfères
const EMAILJS_CONFIG = {
  // ID de ton service email (ex: "service_abc123")
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
  
  // ID de ton template (ex: "template_xyz789")
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
  
  // Ta clé publique EmailJS (ex: "user_ABCdef123")
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
};

// ==========================================
// INTERFACES
// ==========================================

/**
 * Données du formulaire de contact
 */
export interface ContactFormData {
  name: string;     // Nom de l'expéditeur
  email: string;    // Email de l'expéditeur
  message: string;  // Le message
}

/**
 * Résultat de l'envoi d'email
 */
export interface EmailResult {
  success: boolean;
  message: string;
}

// ==========================================
// FONCTIONS
// ==========================================

/**
 * Initialise EmailJS avec ta clé publique
 * 
 * À appeler une fois au démarrage de l'application
 */
export function initEmailJS(): void {
  if (EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log("📧 [EMAIL] EmailJS initialisé avec succès !");
  } else {
    console.log("⚠️ [EMAIL] EmailJS non configuré - les emails ne seront pas envoyés");
  }
}

/**
 * Envoie un email via EmailJS
 * 
 * @param formData - Les données du formulaire de contact
 * @returns Résultat de l'envoi (succès ou erreur)
 * 
 * FONCTIONNEMENT :
 * 1. Prépare les données pour le template
 * 2. Appelle l'API EmailJS
 * 3. Retourne le résultat
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<EmailResult> {
  console.log("📧 [EMAIL] Envoi de l'email en cours...");
  
  // Vérifie que EmailJS est configuré
  if (EMAILJS_CONFIG.publicKey === "YOUR_PUBLIC_KEY" ||
      EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID" ||
      EMAILJS_CONFIG.templateId === "YOUR_TEMPLATE_ID") {
    console.log("⚠️ [EMAIL] EmailJS n'est pas configuré");
    return {
      success: false,
      message: "EmailJS n'est pas configuré. Le message a été sauvegardé localement."
    };
  }
  
  try {
    // Prépare les données pour le template
    // Ces noms doivent correspondre aux variables de ton template EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Admin Portfolio", // Ton nom
      reply_to: formData.email,
    };
    
    // Envoie l'email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    
    console.log("✅ [EMAIL] Email envoyé avec succès !", response);
    
    return {
      success: true,
      message: "Email envoyé avec succès !"
    };
  } catch (error) {
    console.error("❌ [EMAIL] Erreur lors de l'envoi:", error);
    
    return {
      success: false,
      message: "Erreur lors de l'envoi de l'email. Le message a été sauvegardé localement."
    };
  }
}

/**
 * Vérifie si EmailJS est correctement configuré
 * 
 * @returns true si tous les IDs sont configurés
 */
export function isEmailJSConfigured(): boolean {
  return (
    EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_CONFIG.serviceId !== "YOUR_SERVICE_ID" &&
    EMAILJS_CONFIG.templateId !== "YOUR_TEMPLATE_ID"
  );
}
