
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Category, ProductService } from "@/types/transaction";
import { ProductSelectionField } from "./ProductSelectionField";

interface TransactionFormProps {
  onSubmit: (formData: {
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: Date;
    product: string;
    isNewProduct: boolean;
    productDescription: string;
  }) => void;
  existingCategories: Category[];
  existingProducts: ProductService[];
}

export function TransactionForm({ 
  onSubmit, 
  existingCategories, 
  existingProducts 
}: TransactionFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [product, setProduct] = useState("");
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productDescription, setProductDescription] = useState("");

  // Filter categories based on transaction type
  const filteredCategories = existingCategories.filter(cat => cat.type === type);
  
  // Reset form when transaction type changes
  useEffect(() => {
    setCategory("");
  }, [type]);

  const handleSubmit = () => {
    if (!title || !amount || !category || !date) {
      return false;
    }

    onSubmit({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
      product,
      isNewProduct,
      productDescription
    });

    return true;
  };

  const handleProductSelection = (value: string, isNew: boolean) => {
    setProduct(value);
    setIsNewProduct(isNew);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="transaction-type">Transaction Type</Label>
        <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
          <SelectTrigger id="transaction-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Transaction title"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input 
          id="amount" 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {type === "expense" && (
        <ProductSelectionField
          existingProducts={existingProducts}
          onProductSelection={handleProductSelection}
          onDescriptionChange={setProductDescription}
          productDescription={productDescription}
          isNewProduct={isNewProduct}
        />
      )}

      <div className="hidden">
        <Button id="submit-form" onClick={handleSubmit} type="button">Submit</Button>
      </div>
    </div>
  );
}
