
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  handleLogout: () => void;
  currentTheme?: "light" | "dark";
  toggleTheme?: () => void;
}

export function MobileNav({ navItems, handleLogout, currentTheme = "light", toggleTheme }: MobileNavProps) {
  const location = useLocation();

  if (!navItems) {
    return null; // Return null or some fallback UI when navItems is undefined
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-6">
        {navItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "inline-flex flex-col items-center justify-center px-1 text-xs font-medium",
              location.pathname === item.to
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 mb-1",
              location.pathname === item.to
                ? "text-primary"
                : "text-muted-foreground"
            )} />
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Theme toggle */}
        <div className="inline-flex flex-col items-center justify-center px-1">
          <ThemeToggle currentTheme={currentTheme || "light"} setTheme={toggleTheme || (() => {})} />
        </div>
      </div>
    </div>
  );
}
