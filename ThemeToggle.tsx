
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  currentTheme: "light" | "dark";
  setTheme: () => void;
}

export function ThemeToggle({ currentTheme, setTheme }: ThemeToggleProps) {
  return (
    <Button variant="outline" size="icon" onClick={setTheme}>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
