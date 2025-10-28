// Utility to handle image paths correctly for both development and production
export const getImagePath = (imagePath) => {
  // Remove leading ./ if present
  const cleanPath = imagePath.startsWith('./') ? imagePath.substring(2) : imagePath;
  
  // For Vercel deployment, always use absolute paths from root
  return `/${cleanPath}`;
};

// Export commonly used image paths
export const profileImage = 'assets/profile.png';
export const fullBodyImage = 'assets/Full body.png';