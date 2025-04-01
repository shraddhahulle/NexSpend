
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Transaction, ProductService, Category } from "@/types/transaction";
import { v4 as uuidv4 } from 'uuid';

interface AddTransactionDialogProps {
  onAddTransaction: (transaction: Transaction) => void;
  onAddProduct?: (product: ProductService) => void;
  existingProducts: ProductService[];
  existingCategories: Category[];
}

export function AddTransactionDialog({ 
  onAddTransaction, 
  onAddProduct, 
  existingProducts, 
  existingCategories 
}: AddTransactionDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (formData: {
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: Date;
    product: string;
    isNewProduct: boolean;
    productDescription: string;
  }) => {
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create the transaction
    const newTransaction: Transaction = {
      id: uuidv4(),
      title: formData.title,
      amount: formData.amount,
      category: formData.category,
      date: formData.date.toISOString(),
      type: formData.type,
    };

    onAddTransaction(newTransaction);

    // If user entered a new product, create it
    if (formData.product && formData.isNewProduct && onAddProduct) {
      const newProduct: ProductService = {
        id: uuidv4(),
        name: formData.product,
        description: formData.productDescription || `Added from transaction: ${formData.title}`,
        transactions: 1,
        hasImage: false,
        imageType: null
      };
      
      onAddProduct(newProduct);
    }

    // Close dialog
    setOpen(false);

    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        
        <TransactionForm
          onSubmit={handleSubmit}
          existingCategories={existingCategories}
          existingProducts={existingProducts}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => document.getElementById('submit-form')?.click()}>
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
