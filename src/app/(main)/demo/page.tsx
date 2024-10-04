"use client";

import { useEffect } from 'react';
import { create } from 'zustand';
import { api } from '@/app/api/v1/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from "@clerk/nextjs";

type TransactionResult = {
  id: string;
  amount: number;
  productCategory: string;
  customerLocation: string;
  accountAgeDays: number;
  transactionDate: string;
  fraudProbability: number;
};

type FormData = {
  amount: string;
  productCategory: string;
  customerLocation: string;
  accountAgeDays: string;
  transactionDate: string;
};

type State = {
  userId: string | null;
  formData: FormData;
  result: TransactionResult | null;
  error: string | null;
  isLoading: boolean;
  isRegistering: boolean;
  setUserId: (userId: string | null) => void;
  setFormData: (formData: Partial<FormData>) => void;
  setResult: (result: TransactionResult | null) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsRegistering: (isRegistering: boolean) => void;
  registerUser: (user: any) => Promise<void>;
  createTransaction: () => Promise<void>;
};

const useStore = create<State>((set, get) => ({
  userId: null,
  formData: {
    amount: '',
    productCategory: '',
    customerLocation: '',
    accountAgeDays: '',
    transactionDate: new Date().toISOString().slice(0, 16),
  },
  result: null,
  error: null,
  isLoading: false,
  isRegistering: false,
  setUserId: (userId) => set({ userId }),
  setFormData: (formData) => set((state) => ({ formData: { ...state.formData, ...formData } })),
  setResult: (result) => set({ result }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsRegistering: (isRegistering) => set({ isRegistering }),
  registerUser: async (user) => {
    const { setUserId, setError, setIsRegistering } = get();
    setIsRegistering(true);
    try {
      const existingUser = await api.getUser(user.id);
      setUserId(existingUser.id);
    } catch (error) {
      try {
        const newUser = await api.createUser({
          id: user.id,
          name: user.fullName || 'Anonymous',
          email: user.primaryEmailAddress?.emailAddress || 'unknown@example.com',
        });
        setUserId(newUser.id);
      } catch (createError) {
        setError('Failed to register user. Please try again later or contact support.');
      }
    } finally {
      setIsRegistering(false);
    }
  },
  createTransaction: async () => {
    const { userId, formData, setIsLoading, setError, setResult } = get();
    if (!userId) {
      setError('User not registered. Please try again.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const transaction = await api.createTransaction({
        userId,
        amount: parseFloat(formData.amount),
        productCategory: formData.productCategory,
        customerLocation: formData.customerLocation,
        accountAgeDays: parseInt(formData.accountAgeDays),
        transactionDate: new Date(formData.transactionDate).toISOString(),
      });
      setResult(transaction as TransactionResult);
    } catch (error) {
      setError('Failed to create transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  },
}));

const productCategories = [
  'Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors', 'Books',
  'Toys & Games', 'Health & Beauty', 'Automotive', 'Jewelry', 'Food & Grocery',
];

const locations = [
  { value: "new-york", label: "New York", country: "United States" },
  { value: "london", label: "London", country: "United Kingdom" },
  { value: "paris", label: "Paris", country: "France" },
  { value: "tokyo", label: "Tokyo", country: "Japan" },
  { value: "sydney", label: "Sydney", country: "Australia" },
  { value: "berlin", label: "Berlin", country: "Germany" },
  { value: "mumbai", label: "Mumbai", country: "India" },
  { value: "rio-de-janeiro", label: "Rio de Janeiro", country: "Brazil" },
  { value: "cape-town", label: "Cape Town", country: "South Africa" },
  { value: "toronto", label: "Toronto", country: "Canada" },
];

export default function DemoPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { formData, result, error, isLoading, isRegistering, setFormData, registerUser, createTransaction } = useStore();

  useEffect(() => {
    if (isUserLoaded && user) {
      registerUser(user);
    }
  }, [isUserLoaded, user, registerUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTransaction();
  };

  if (!isUserLoaded || isRegistering) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Demo</CardTitle>
          <CardDescription>Test our fraud detection system with a sample transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter transaction amount"
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productCategory">Product Category</Label>
              <Select onValueChange={(value) => setFormData({ productCategory: value })} value={formData.productCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerLocation">Customer Location</Label>
              <Select onValueChange={(value) => setFormData({ customerLocation: value })} value={formData.customerLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}, {location.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountAgeDays">Account Age (Days)</Label>
              <Input
                id="accountAgeDays"
                type="number"
                value={formData.accountAgeDays}
                onChange={handleInputChange}
                placeholder="Enter account age in days"
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionDate">Transaction Date</Label>
              <Input
                id="transactionDate"
                type="datetime-local"
                value={formData.transactionDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Create Transaction'
            )}
          </Button>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Transaction Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-semibold">Transaction ID:</dt>
                    <dd>{result.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Amount:</dt>
                    <dd>${result.amount.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Product Category:</dt>
                    <dd>{result.productCategory}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Customer Location:</dt>
                    <dd>{result.customerLocation}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Account Age:</dt>
                    <dd>{result.accountAgeDays} days</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Transaction Date:</dt>
                    <dd>{new Date(result.transactionDate).toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-semibold">Fraud Probability:</dt>
                    <dd className={result.fraudProbability > 0.5 ? 'text-red-500' : 'text-green-500'}>
                      {(result.fraudProbability * 100).toFixed(2)}%
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}