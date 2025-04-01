
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, Trash2 } from "lucide-react";

const AccountSettings = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information and account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="flex items-center space-x-4">
                <User className="w-4 h-4 text-muted-foreground" />
                <Input id="name" defaultValue="John Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center space-x-4">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input id="email" defaultValue="john.doe@example.com" type="email" />
              </div>
            </div>
            
            <Button className="w-full md:w-auto">Save Profile</Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="flex items-center space-x-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <Input id="currentPassword" type="password" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="flex items-center space-x-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <Input id="newPassword" type="password" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="flex items-center space-x-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            
            <Button className="w-full md:w-auto">Change Password</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="destructive" className="w-full md:w-auto">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountSettings;
