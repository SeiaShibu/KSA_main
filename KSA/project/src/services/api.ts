// API base URL – will use Render backend in production, localhost in dev
const API_BASE = process.env.REACT_APP_API_BASE || 'https://ksa-main.onrender.com/api';

// Function to get auth headers
const authHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

// Complaints API
export const complaintsAPI = {
  create: async (data: { title: string; description: string; category: string; priority: string }) => {
    const res = await fetch(`${API_BASE}/complaints`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit complaint');
    return res.json();
  },

  getAll: async (params: { status?: string; priority?: string; page?: number; limit?: number } = {}) => {
    const qs = new URLSearchParams();
    if (params.status && params.status !== 'all') qs.append('status', params.status);
    if (params.priority && params.priority !== 'all') qs.append('priority', params.priority);
    qs.append('page', String(params.page || 1));
    qs.append('limit', String(params.limit || 10));

    const res = await fetch(`${API_BASE}/complaints/all?${qs.toString()}`, {
      headers: authHeader(),
    });
    if (!res.ok) throw new Error('Failed to load complaints');
    return res.json();
  },

  assign: async (complaintId: string, technicianId: string) => {
    const res = await fetch(`${API_BASE}/complaints/${complaintId}/assign`, {
      method: 'PUT',
      headers: authHeader(),
      body: JSON.stringify({ technicianId }),
    });
    if (!res.ok) throw new Error('Failed to assign complaint');
    return res.json();
  },

  updateComplaintStatus: async (complaintId: string, status: string, details?: string) => {
    const res = await fetch(`${API_BASE}/complaints/${complaintId}`, {
      method: 'PUT',
      headers: authHeader(),
      body: JSON.stringify({ status, details }),
    });
    if (!res.ok) throw new Error('Failed to update complaint');
    return res.json();
  },
};

// Users API
export const usersAPI = {
  getTechnicians: async () => {
    const res = await fetch(`${API_BASE}/users/technicians`, { headers: authHeader() });
    if (!res.ok) throw new Error('Failed to load technicians');
    return res.json();
  },
};
