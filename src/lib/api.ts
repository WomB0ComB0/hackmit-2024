import { API } from '@/app/api/v1/config';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export const api = {
  // User routes
  getUser: (userId: string) =>
    fetchWithAuth(`${API}/users/${userId}`),

  createUser: (userData: { name: string; email: string }) =>
    fetchWithAuth(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }),

  updateUser: (userId: string, userData: { name?: string; email?: string }) =>
    fetchWithAuth(`${API}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }),

  deleteUser: (userId: string) =>
    fetchWithAuth(`${API}/users/${userId}`, { method: 'DELETE' }),

  // Transaction routes
  createTransaction: (transactionData: {
    userId: string;
    amount: number;
    productCategory: string;
    customerLocation: string;
    accountAgeDays: number;
    transactionDate: string;
  }) =>
    fetchWithAuth(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    }),

  getTransaction: (transactionId: string) =>
    fetchWithAuth(`${API}/transactions/${transactionId}`),

  updateTransaction: (transactionId: string, transactionData: {
    amount?: number;
    productCategory?: string;
    customerLocation?: string;
    accountAgeDays?: number;
    transactionDate?: string;
  }) =>
    fetchWithAuth(`${API}/transactions/${transactionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    }),

  deleteTransaction: (transactionId: string) =>
    fetchWithAuth(`${API}/transactions/${transactionId}`, { method: 'DELETE' }),
};
