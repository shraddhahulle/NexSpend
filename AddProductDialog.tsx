
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface ProductService {
  id: string;
  name: string;
  description: string;
  transactions: number;
  hasImage: boolean;
  imageType: string | null;
}

interface AddProductDialogProps {
  onAddProduct: (product: ProductService) => void;
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [imageType, setImageType] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please provide a name for the product",
        variant: "destructive",
      });
      return;
    }

    const newProduct: ProductService = {
      id: uuidv4(),
      name,
      description,
      transactions: 0,
      hasImage,
      imageType
    };

    onAddProduct(newProduct);

    // Reset form and close dialog
    setName("");
    setDescription("");
    setHasImage(false);
    setImageType(null);
    setOpen(false);

    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  // Mock file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.type.startsWith('image/')) {
      setImageType('image');
    } else {
      setImageType('document');
    }
    
    setHasImage(true);
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been attached to the product`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product/Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product or Service</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Product or service name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this product or service"
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="attachment">Attachment (Optional)</Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="cursor-pointer"
                type="button"
              >
                <Upload className="mr-2 h-4 w-4" /> 
                Upload File
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              {hasImage && (
                <span className="text-sm text-muted-foreground">
                  File attached ({imageType})
                </span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
