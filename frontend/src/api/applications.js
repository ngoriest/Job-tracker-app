const API_URL = 'http://localhost:5000/api';

export const getApplications = async (token) => {
  const response = await fetch(`${API_URL}/applications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }

  return response.json();
};

export const addApplication = async (application, token) => {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error('Failed to add application');
  }

  return response.json();
};

export const updateApplication = async (id, updates, token) => {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update application');
  }

  return response.json();
};

export const deleteApplication = async (id, token) => {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete application');
  }

  return response.json();
};