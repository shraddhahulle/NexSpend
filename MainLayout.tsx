
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Receipt, 
  Tags, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNav } from "@/components/MobileNav";

// Helper function to get the app name from path
const getAppName = (pathname: string) => {
  const path = pathname.split("/")[2] || "dashboard";
  return {
    "dashboard": "Dashboard",
    "transactions": "Transactions",
    "categories": "Categories",
    "products": "Products & Services",
    "reports": "Reports",
    "settings": "Settings",
    "profile": "Profile"
  }[path] || "Dashboard";
};

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const isDetailView = location.pathname.includes("/products/");
  const isMobile = useIsMobile();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/app" },
    { label: "Transactions", icon: Receipt, to: "/app/transactions" },
    { label: "Categories", icon: Tags, to: "/app/categories" },
    { label: "Products", icon: ShoppingBag, to: "/app/products" },
    { label: "Reports", icon: BarChart3, to: "/app/reports" },
    { label: "Settings", icon: Settings, to: "/app/settings" },
    { label: "Profile", icon: User, to: "/app/profile" }
  ];

  const handleLogout = () => {
    // In a real app, this would also clear authentication tokens etc.
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === "light" ? "dark" : "light");
  };

  const isActive = (path: string) => {
    if (path === "/app" && location.pathname === "/app") return true;
    if (path !== "/app" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close sidebar on location change on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden lg:flex h-screen w-56 flex-col bg-black text-white", // Reduced from w-64 to w-56
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 z-20"
        )}
      >
        {/* Logo */}
        <div className="flex items-center p-3">
          <Link to="/app" className="flex items-center">
            <Rocket className="h-5 w-5 text-white" />
            <span className="ml-2 text-lg font-bold text-white">NexSpend</span>
          </Link>
        </div>
        
        <Separator className="bg-gray-700" />
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center rounded-lg px-2 py-2 text-sm",
                isActive(item.to) 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className={cn("mr-2 h-4 w-4")} />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Mobile Nav */}
      <MobileNav 
        navItems={navItems} 
        handleLogout={handleLogout} 
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white text-black">
        {/* Top Bar */}
        <header className="border-b bg-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center text-black">
              {isDetailView && (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-sm font-normal"
                    onClick={() => navigate("/app/products")}
                  >
                    Products
                  </Button>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Details</span>
                </>
              )}
              {!isDetailView && (
                <h1 className="text-lg font-medium">
                  {getAppName(location.pathname)}
                </h1>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle currentTheme={currentTheme} setTheme={toggleTheme} />
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
