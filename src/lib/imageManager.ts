/* ==========================================
   GESTIONNAIRE D'IMAGES - PORTFOLIO RPG
   ==========================================
   
   Ce fichier gère l'upload et le stockage des images.
   
   FONCTIONNALITÉS :
   - Upload d'images (avatar, projets)
   - Conversion en Base64 pour stockage localStorage
   - Compression automatique des grandes images
   - Validation du type de fichier
   
   LIMITATION :
   Les images sont stockées en Base64 dans localStorage.
   C'est adapté pour un portfolio personnel avec peu d'images.
   Pour plus d'images, il faudrait utiliser un service cloud.
*/

// ==========================================
// CONSTANTES
// ==========================================

// Taille maximale d'une image avant compression (en pixels)
const MAX_IMAGE_SIZE = 800;

// Qualité de compression JPEG (0.0 à 1.0)
const COMPRESSION_QUALITY = 0.8;

// Types de fichiers autorisés
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

// Taille maximale du fichier (5 MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// ==========================================
// INTERFACES
// ==========================================

/**
 * Résultat d'un upload d'image
 */
export interface ImageUploadResult {
  success: boolean;          // L'upload a-t-il réussi ?
  dataUrl?: string;          // L'URL de données de l'image (base64)
  error?: string;            // Message d'erreur si échec
  originalSize?: number;     // Taille originale en bytes
  compressedSize?: number;   // Taille après compression
}

// ==========================================
// FONCTIONS D'UPLOAD
// ==========================================

/**
 * Compresse une image et la convertit en Data URL (base64)
 * 
 * @param file - Le fichier image à traiter
 * @param maxSize - Taille maximale en pixels (largeur ou hauteur)
 * @returns Promise avec le résultat de l'upload
 * 
 * PROCESSUS :
 * 1. Vérifie que le fichier est une image valide
 * 2. Charge l'image dans un canvas
 * 3. Redimensionne si nécessaire
 * 4. Convertit en base64 avec compression JPEG
 */
export async function uploadImage(
  file: File,
  maxSize: number = MAX_IMAGE_SIZE
): Promise<ImageUploadResult> {
  console.log(`🖼️ [IMAGE] Début de l'upload: ${file.name}`);
  
  // ------------------------------------------
  // VALIDATION DU FICHIER
  // ------------------------------------------
  
  // Vérifie le type de fichier
  if (!ALLOWED_TYPES.includes(file.type)) {
    console.log("❌ [IMAGE] Type de fichier non autorisé:", file.type);
    return {
      success: false,
      error: `Type de fichier non autorisé. Utilisez : JPG, PNG, GIF ou WebP`
    };
  }
  
  // Vérifie la taille du fichier
  if (file.size > MAX_FILE_SIZE) {
    console.log("❌ [IMAGE] Fichier trop volumineux:", file.size);
    return {
      success: false,
      error: `Fichier trop volumineux. Maximum : 5 MB`
    };
  }
  
  // ------------------------------------------
  // TRAITEMENT DE L'IMAGE
  // ------------------------------------------
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Calcule les nouvelles dimensions
        let { width, height } = img;
        
        // Redimensionne si l'image est trop grande
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
          console.log(`📐 [IMAGE] Redimensionnement: ${img.width}x${img.height} → ${width}x${height}`);
        }
        
        // Crée un canvas pour la compression
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({
            success: false,
            error: "Erreur lors du traitement de l'image"
          });
          return;
        }
        
        // Dessine l'image sur le canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertit en data URL (base64) avec compression
        const dataUrl = canvas.toDataURL("image/jpeg", COMPRESSION_QUALITY);
        
        // Calcule la taille compressée
        const compressedSize = Math.round((dataUrl.length * 3) / 4);
        
        console.log(`✅ [IMAGE] Upload réussi !`);
        console.log(`   📦 Original: ${Math.round(file.size / 1024)} KB`);
        console.log(`   📦 Compressé: ${Math.round(compressedSize / 1024)} KB`);
        
        resolve({
          success: true,
          dataUrl,
          originalSize: file.size,
          compressedSize
        });
      };
      
      img.onerror = () => {
        console.log("❌ [IMAGE] Erreur lors du chargement de l'image");
        resolve({
          success: false,
          error: "Erreur lors du chargement de l'image"
        });
      };
      
      // Charge l'image
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      console.log("❌ [IMAGE] Erreur lors de la lecture du fichier");
      resolve({
        success: false,
        error: "Erreur lors de la lecture du fichier"
      });
    };
    
    // Lit le fichier comme Data URL
    reader.readAsDataURL(file);
  });
}

/**
 * Crée un composant input file invisible pour sélectionner une image
 * 
 * @param onSelect - Callback appelé quand une image est sélectionnée
 * @returns L'élément input à ajouter au DOM
 * 
 * UTILISATION :
 * const input = createImageInput((file) => { ... });
 * input.click();
 */
export function createImageInput(
  onSelect: (file: File) => void
): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ALLOWED_TYPES.join(",");
  input.style.display = "none";
  
  input.onchange = (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      onSelect(file);
    }
  };
  
  return input;
}

/**
 * Vérifie si une chaîne est une Data URL valide
 * 
 * @param str - La chaîne à vérifier
 * @returns true si c'est une Data URL d'image valide
 */
export function isValidImageDataUrl(str: string): boolean {
  return str.startsWith("data:image/");
}

/**
 * Formate la taille d'un fichier en texte lisible
 * 
 * @param bytes - Taille en bytes
 * @returns Texte formaté (ex: "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
