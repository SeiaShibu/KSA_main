// src/api/auth.ts
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// Get auth headers
const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
});

// ======================
// Auth API
// ======================
export const authAPI = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: authHeader(),
      credentials: 'include', // ← crucial for cookies/session
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Login failed');
    }

    const data = await res.json();

    // Optionally store token if your backend returns one
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  },

  logout: async () => {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Logout failed');

    // Clear localStorage
    localStorage.removeItem('token');
    return res.json();
  },

  getProfile: async () => {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: authHeader(),
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },
};
