
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive updates via email</p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-medium">Browser Notifications</h3>
            <p className="text-sm text-muted-foreground">Get notified in your browser</p>
          </div>
          <Switch id="browser-notifications" />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-medium">Notification Types</h3>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Switch id="transaction-notifications" defaultChecked />
                <Label htmlFor="transaction-notifications">Transactions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="balance-notifications" defaultChecked />
                <Label htmlFor="balance-notifications">Balance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="security-notifications" defaultChecked />
                <Label htmlFor="security-notifications">Security</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
