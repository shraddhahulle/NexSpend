
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ComboBox } from "@/components/ComboBox";
import { ProductService } from "@/types/transaction";

interface ProductSelectionFieldProps {
  existingProducts: ProductService[];
  onProductSelection: (value: string, isNew: boolean) => void;
  onDescriptionChange: (value: string) => void;
  productDescription: string;
  isNewProduct: boolean;
}

export function ProductSelectionField({
  existingProducts,
  onProductSelection,
  onDescriptionChange,
  productDescription,
  isNewProduct
}: ProductSelectionFieldProps) {
  // Get product suggestions for autocomplete
  const productSuggestions = existingProducts.map(product => ({
    value: product.id,
    label: product.name
  }));

  const handleProductSelection = (value: string) => {
    // Check if the value is an ID from an existing product
    const existingProduct = existingProducts.find(p => p.id === value);
    
    if (existingProduct) {
      onProductSelection(existingProduct.name, false);
    } else {
      // New product entered by user
      onProductSelection(value, true);
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="product">Product/Service (Optional)</Label>
      <ComboBox
        items={productSuggestions}
        placeholder="Search product or add new..."
        onSelect={handleProductSelection}
        onInputChange={(value) => onProductSelection(value, true)}
        allowCustomValue={true}
      />
      
      {isNewProduct && (
        <div className="mt-2">
          <Label htmlFor="productDescription">Description (Optional)</Label>
          <Input 
            id="productDescription" 
            value={productDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Product description" 
          />
        </div>
      )}
    </div>
  );
}
