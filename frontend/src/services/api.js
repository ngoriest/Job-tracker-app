const BASE_URL = 'https://job-tracker-app-xtf2.onrender.com/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn("🚫 No token found in localStorage");
  }

  // Log outgoing request for debugging
  if (options.method && options.body) {
    console.log(`📤 [${options.method}] Sending to ${endpoint}:`, JSON.parse(options.body));
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`❌ API Error (${response.status}):`, errorData);
    throw new Error(errorData.error || 'API Error');
  }

  const data = await response.json();
  console.log(`✅ Response from ${endpoint}:`, data);
  return data;
};
