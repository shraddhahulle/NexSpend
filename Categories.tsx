
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2 } from "lucide-react";
import { AddCategoryDialog, Category } from "@/components/AddCategoryDialog";
import { useToast } from "@/hooks/use-toast";

// Initial categories - same as in Transactions.tsx
const initialCategories = [
  {
    id: "1",
    name: "Income",
    type: "income" as const,
    color: "#22c55e",
    description: "Regular income from salary and other sources",
    transactionCount: 3
  },
  {
    id: "2",
    name: "Housing",
    type: "expense" as const,
    color: "#ef4444",
    description: "Rent, mortgage, and home repairs",
    transactionCount: 1
  },
  {
    id: "3",
    name: "Food",
    type: "expense" as const,
    color: "#f97316",
    description: "Groceries and eating out",
    transactionCount: 1
  },
  {
    id: "4",
    name: "Transport",
    type: "expense" as const,
    color: "#3b82f6",
    description: "Gas, public transportation, and vehicle maintenance",
    transactionCount: 2
  },
  {
    id: "5",
    name: "Utilities",
    type: "expense" as const,
    color: "#6366f1",
    description: "Electricity, water, internet, and phone bills",
    transactionCount: 2
  },
  {
    id: "6",
    name: "Entertainment",
    type: "expense" as const,
    color: "#ec4899",
    description: "Movies, concerts, and other leisure activities",
    transactionCount: 1
  },
];

const Categories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");

  const handleAddCategory = (newCategory: Category) => {
    setCategories(prev => [newCategory, ...prev]);
  };

  const handleDeleteCategory = (id: string) => {
    // Check if category has transactions
    const category = categories.find(c => c.id === id);
    if (category && category.transactionCount > 0) {
      toast({
        title: "Cannot Delete",
        description: `This category has ${category.transactionCount} transaction(s). Remove them first.`,
        variant: "destructive",
      });
      return;
    }
    
    setCategories(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Category Deleted",
      description: "The category has been deleted successfully",
    });
  };

  // Filter categories based on search term and active tab
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && category.type === activeTab;
  });

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage categories for your income and expenses</p>
        </div>
        <AddCategoryDialog onAddCategory={handleAddCategory} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>Organize your transactions with custom categories</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button 
              variant={activeTab === "all" ? "default" : "outline"} 
              onClick={() => setActiveTab("all")}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={activeTab === "income" ? "default" : "outline"} 
              onClick={() => setActiveTab("income")}
              size="sm"
            >
              Income
            </Button>
            <Button 
              variant={activeTab === "expense" ? "default" : "outline"} 
              onClick={() => setActiveTab("expense")}
              size="sm"
            >
              Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium flex items-center">
                      {category.name}
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted">
                        {category.type}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description || "No description"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.transactionCount} transaction{category.transactionCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 justify-end">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredCategories.length === 0 && (
              <div className="col-span-full p-8 text-center">
                <p className="text-muted-foreground">No categories found</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
