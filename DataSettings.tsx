
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportToExcel } from "@/utils/excelExport";
import { Transaction, ProductService } from "@/types/transaction";

interface DataSettingsProps {
  transactions: Transaction[];
  products: ProductService[];
}

const DataSettings = ({ transactions, products }: DataSettingsProps) => {
  const { toast } = useToast();

  const handleExportData = async () => {
    try {
      // Try to get server data, but fall back to local data
      let exportSuccessful = false;
      
      try {
        const response = await fetch("http://localhost:5000/api/export");
        if (response.ok) {
          const data = await response.json();
          // Use server data if available
          exportSuccessful = exportToExcel(
            data.transactions || transactions, 
            data.products || products, 
            data.categories || [], 
            "finance-data"
          );
        }
      } catch (error) {
        console.log("Export API not available, using local data");
        // If server API call fails, fall back to client data
        exportSuccessful = exportToExcel(transactions, products, [], "finance-data");
      }
      
      if (exportSuccessful) {
        toast({
          title: "Export Successful",
          description: "Your data has been exported to Excel",
          variant: "default",
        });
      } else {
        throw new Error("Excel export failed");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data",
        variant: "destructive",
      });
    }
  };

  const handleRequestDeletion = () => {
    toast({
      title: "Request Submitted",
      description: "Your data deletion request has been submitted. We'll process it within 48 hours.",
      variant: "default",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Export or delete your data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Export All Data</h3>
          <p className="text-sm text-muted-foreground">Download all your data in an Excel file</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleExportData} className="mt-2">
                  <Download className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export all your transactions and products/services</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-medium">Data Privacy</h3>
          <p className="text-sm text-muted-foreground">
            Your data is securely stored and never shared with third parties. 
            You can request a full data deletion at any time.
          </p>
          <Button variant="outline" className="mt-2" onClick={handleRequestDeletion}>
            Request Data Deletion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSettings;
