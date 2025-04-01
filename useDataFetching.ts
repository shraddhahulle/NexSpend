import { useState, useEffect } from "react";
import { Transaction, ProductService, Category } from "@/types/transaction";

// Fallback data for when API is not available
const FALLBACK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Income",
    type: "income",
    color: "#22c55e",
    transactionCount: 0
  },
  {
    id: "2",
    name: "Housing",
    type: "expense",
    color: "#ef4444",
    transactionCount: 0
  },
  {
    id: "3", 
    name: "Food",
    type: "expense",
    color: "#f97316",
    transactionCount: 0
  },
  {
    id: "4",
    name: "Transport",
    type: "expense",
    color: "#3b82f6",
    transactionCount: 0
  },
  {
    id: "5",
    name: "Utilities",
    type: "expense",
    color: "#6366f1",
    transactionCount: 0
  },
  {
    id: "6",
    name: "Entertainment",
    type: "expense",
    color: "#ec4899",
    transactionCount: 0
  }
];

const FALLBACK_PRODUCTS: ProductService[] = [
  {
    id: "1",
    name: "Netflix",
    description: "Streaming service",
    transactions: 1,
    hasImage: false,
    imageType: null
  },
  {
    id: "2",
    name: "Spotify",
    description: "Music streaming",
    transactions: 1,
    hasImage: false,
    imageType: null
  }
];

// Sample transaction data for fallback
const FALLBACK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: new Date().toISOString(),
    amount: 15.99,
    title: "Monthly Netflix subscription",
    description: "Monthly Netflix subscription",
    type: "expense",
    category: "Entertainment",
    categoryId: "6",
    paymentMethod: "Credit Card",
    productId: "1"
  },
  {
    id: "2",
    date: new Date().toISOString(),
    amount: 9.99,
    title: "Spotify Premium",
    description: "Spotify Premium",
    type: "expense",
    category: "Entertainment",
    categoryId: "6",
    paymentMethod: "Credit Card",
    productId: "2"
  },
  {
    id: "3",
    date: new Date().toISOString(),
    amount: 2500.00,
    title: "Monthly Salary",
    description: "Monthly Salary",
    type: "income",
    category: "Income",
    categoryId: "1",
    paymentMethod: "Bank Transfer",
    productId: null
  }
];

const API_BASE_URL = "http://localhost:5000/api";

// Generic fetching function
const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${endpoint}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const useTransactionData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchData<Transaction[]>("transactions");
        // Ensure that 'type' is properly typed as 'income' or 'expense'
        const typedTransactions = data.map(transaction => ({
          ...transaction,
          type: transaction.type as "income" | "expense"
        }));
        setTransactions(typedTransactions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        console.error("Error fetching transactions:", err);
        // Use fallback data when API fails
        setTransactions(FALLBACK_TRANSACTIONS);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return { transactions, loading, error };
};

export const useCategoryData = () => {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchData<Category[]>("categories");
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        console.error("Error fetching categories:", err);
        // Use fallback categories when API fails
        setCategories(FALLBACK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return { categories, loading, error };
};

export const useProductData = () => {
  const [products, setProducts] = useState<ProductService[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchData<ProductService[]>("products");
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        console.error("Error fetching products:", err);
        // Use fallback products when API fails
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return { products, loading, error };
};
