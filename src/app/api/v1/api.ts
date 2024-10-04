import { API } from '@/app/api/v1/config';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      return response.text();
    }
  } catch (error) {
    throw error;
  }
}

export const api = {
  createUser: (userData: { id: string; name: string; email: string }) =>
    fetchWithAuth(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }),

  getUser: (userId: string) =>
    fetchWithAuth(`${API}/users/${userId}`),

  updateUser: (userId: string, userData: { name?: string; email?: string }) =>
    fetchWithAuth(`${API}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }),

  deleteUser: (userId: string) =>
    fetchWithAuth(`${API}/users/${userId}`, { method: 'DELETE' }),

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

  createAndFinalizeTransaction: async (transactionData: {
    userId: string;
    amount: number;
    productCategory: string;
    customerLocation: string;
    accountAgeDays: number;
    transactionDate: string;
  }) => {
    try {
      const tempResponse = await fetchWithAuth(`${API}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      let tempId;
      if (typeof tempResponse === 'string') {
        try {
          const parsedResponse = JSON.parse(tempResponse);
          tempId = parsedResponse.tempId;
        } catch (e) {
          throw new Error('Invalid response from server');
        }
      } else if (typeof tempResponse === 'object' && tempResponse !== null) {
        tempId = tempResponse.tempId;
      } else {
        throw new Error('Unexpected response format from server');
      }

      if (!tempId) {
        throw new Error('No tempId received from server');
      }

      await new Promise(resolve => setTimeout(resolve, 5000));

      const finalResponse = await fetchWithAuth(`${API}/transactions/finalize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId }),
      });

      let transactionId;
      if (typeof finalResponse === 'string') {
        try {
          const parsedResponse = JSON.parse(finalResponse);
          transactionId = parsedResponse.transactionId;
        } catch (e) {
          throw new Error('Invalid response from server');
        }
      } else if (typeof finalResponse === 'object' && finalResponse !== null) {
        transactionId = finalResponse.transactionId;
      } else {
        throw new Error('Unexpected response format from server');
      }

      if (!transactionId) {
        throw new Error('No transactionId received from server');
      }

      const transactionDetails = await api.getTransaction(transactionId);
      return transactionDetails;
    } catch (error) {
      throw error;
    }
  },

  getAllTransactions: () =>
    fetchWithAuth(`${API}/transactions`),

  getTransactionsByUserId: (userId: string) =>
    fetchWithAuth(`${API}/transactions/user/${userId}`),

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
