// Image path verification for debugging
import { getImagePath, profileImage, fullBodyImage } from '../utils/imagePaths.js';

console.log('=== IMAGE PATH VERIFICATION ===');
console.log('Profile Image Path:', getImagePath(profileImage));
console.log('Full Body Image Path:', getImagePath(fullBodyImage));
console.log('Capstone Project Image:', getImagePath("assets/Cpstone/Screenshot (161).png"));
console.log('Hostel Project Image:', getImagePath("assets/Hostel_management_System/first one(1).png"));

// Test function to verify image existence
export const testImagePaths = () => {
  const imagePaths = [
    getImagePath(profileImage),
    getImagePath(fullBodyImage),
    getImagePath("assets/Cpstone/Screenshot (161).png"),
    getImagePath("assets/Hostel_management_System/first one(1).png")
  ];

  imagePaths.forEach(path => {
    const img = new Image();
    img.onload = () => console.log(`✅ Image loaded successfully: ${path}`);
    img.onerror = () => console.error(`❌ Failed to load image: ${path}`);
    img.src = path;
  });
};

export default testImagePaths;