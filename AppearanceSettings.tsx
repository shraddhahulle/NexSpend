
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AppearanceSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the look and feel of the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-medium">Dark Mode</h3>
            <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch id="dark-mode" />
            <Moon className="h-4 w-4" />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-1">
          <h3 className="font-medium">More appearance settings coming soon!</h3>
          <p className="text-sm text-muted-foreground">We're working on more customization options for you</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
