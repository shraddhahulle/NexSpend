
import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboBoxItem {
  value: string;
  label: string;
}

interface ComboBoxProps {
  items: ComboBoxItem[];
  placeholder?: string;
  onSelect: (value: string) => void;
  onInputChange?: (value: string) => void;
  allowCustomValue?: boolean;
  defaultValue?: string;
}

export function ComboBox({
  items,
  placeholder = "Search...",
  onSelect,
  onInputChange,
  allowCustomValue = false,
  defaultValue = "",
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    if (onInputChange) {
      onInputChange(newValue);
    }
  };

  const handleSelect = (currentValue: string) => {
    const selectedItem = items.find(item => item.value === currentValue);
    
    // If it's an existing item, update with its value
    if (selectedItem) {
      setValue(currentValue);
      onSelect(currentValue);
    } 
    // If it's a custom value and allowed, use the input value
    else if (allowCustomValue && inputValue) {
      setValue(inputValue);
      onSelect(inputValue);
    }
    
    setOpen(false);
  };

  // Handle key press for custom values
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && allowCustomValue && inputValue && !items.some(item => item.label.toLowerCase() === inputValue.toLowerCase())) {
      e.preventDefault();
      setValue(inputValue);
      onSelect(inputValue);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label || value
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput 
            ref={inputRef}
            placeholder={placeholder} 
            value={inputValue}
            onValueChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty>
              {allowCustomValue 
                ? "No items found. Press Enter to add." 
                : "No items found."}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
