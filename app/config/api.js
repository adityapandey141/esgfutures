// API Configuration
// In production, this will use the environment variable set in Vercel
// In development, it defaults to localhost:5000

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  
  // Reports
  REPORTS: `${API_URL}/api/reports`,
  REPORT_BY_ID: (id) => `${API_URL}/api/reports/id/${id}`,
  REPORT_BY_SLUG: (slug) => `${API_URL}/api/reports/${slug}`,
  
  // Team
  TEAM: `${API_URL}/api/team`,
  TEAM_BY_ID: (id) => `${API_URL}/api/team/${id}`,
  
  // Pages
  PAGES: `${API_URL}/api/pages`,
  PAGE_BY_NAME: (name) => `${API_URL}/api/pages/${name}`,
  
  // Contact
  CONTACT: `${API_URL}/api/contact`,
  
  // Stats
  STATS: `${API_URL}/api/stats`,
  
  // Upload
  UPLOAD: `${API_URL}/api/upload`,
  
  // Health
  HEALTH: `${API_URL}/api/health`,
};

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_URL}${imagePath}`;
};
