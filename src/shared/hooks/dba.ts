import axios from 'axios';

// Configuration for API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper function to check if a URL is valid
const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add interceptors for request handling
api.interceptors.request.use(
  (config) => {
    // Check for valid URL
    if (!config.url) {
      throw new Error('URL is required for API requests');
    }
    
    // Make sure we have a properly formatted URL
    if (!isValidURL(`${config.baseURL || ''}${config.url}`)) {
      // For relative URLs, prepend with baseURL or placeholder
      config.url = `${config.baseURL || '/api'}${config.url.startsWith('/') ? '' : '/'}${config.url}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define the fetchData function that's causing the error
export const fetchData = async <T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> => {
  try {
    let response;
    
    switch (method.toUpperCase()) {
    case 'GET':
      response = await api.get<T>(endpoint);
      break;
    case 'POST':
      response = await api.post<T>(endpoint, data);
      break;
    case 'PUT':
      response = await api.put<T>(endpoint, data);
      break;
    case 'DELETE':
      response = await api.delete<T>(endpoint);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
    }
    
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    // Instead of passing the error directly which may contain undefined properties,
    // create a more controlled error message
    throw new Error(`Failed to ${method.toLowerCase()} data from ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default api;
