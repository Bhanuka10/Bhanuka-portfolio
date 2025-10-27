// Utility to handle image paths correctly for both development and production
export const getImagePath = (imagePath) => {
  // Handle empty or invalid paths
  if (!imagePath || typeof imagePath !== 'string') {
    console.warn('Invalid image path provided:', imagePath);
    return '/assets/profile.png'; // fallback to default profile image
  }

  // Remove leading ./ if present
  const cleanPath = imagePath.startsWith('./') ? imagePath.substring(2) : imagePath;
  
  // For Vercel deployment, always use root path
  // Public folder assets are served from root in production
  const finalPath = `/${cleanPath}`;
  
  // Debug logging (will be removed in production builds)
  if (import.meta.env.DEV) {
    console.log(`Image path: ${imagePath} -> ${finalPath}`);
  }
  
  return finalPath;
};

// Helper function to create image element with error handling
export const createImageWithFallback = (src, alt, fallbackSrc = '/assets/profile.png') => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.onerror = () => {
    console.warn(`Failed to load image: ${src}, using fallback: ${fallbackSrc}`);
    img.src = fallbackSrc;
  };
  return img;
};

// Export commonly used image paths
export const profileImage = 'assets/profile.png';
export const fullBodyImage = 'assets/Full body.png';