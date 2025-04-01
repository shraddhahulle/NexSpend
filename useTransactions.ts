
import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";

export const useTransactions = (initialTransactions: Transaction[]) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Update transactions whenever initialTransactions changes (i.e., when data from server changes)
  useEffect(() => {
    if (initialTransactions && initialTransactions.length > 0) {
      setTransactions(initialTransactions);
    }
  }, [initialTransactions]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    // Add to the client-side state
    setTransactions(prev => [newTransaction, ...prev]);
    
    // In a real app, we would also post this to the server
    // Example:
    // fetch('http://localhost:5000/api/transactions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newTransaction),
    // });
  };

  // Filter and sort transactions
  const filterTransactions = (transactionList: Transaction[], filterType?: string) => {
    // First apply type filter if provided
    let filtered = transactionList || [];
    if (filterType && filterType !== "all") {
      filtered = filtered.filter(t => t.type === filterType);
    }
    
    // Then apply search filter
    filtered = filtered.filter(transaction => 
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Then apply category filter if not "all"
    if (categoryFilter !== "all") {
      filtered = filtered.filter(transaction => 
        transaction.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Then apply sorting
    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
  };

  return {
    transactions,
    setTransactions,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
    handleAddTransaction,
    filterTransactions
  };
};
