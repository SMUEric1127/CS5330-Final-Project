import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DepartmentCombobox({
  departmentFetchList = ["Computer Science", "Mathematics", "Physics"],
  departmentID = "",
  setDepartmentID = (dept: any) => {},
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDepartment: any) => {
    setDepartmentID(selectedDepartment.split(" - ")[0]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-full justify-between"
        >
          {departmentID || "Select department..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command className="min-w-full p-0">
          <CommandInput placeholder="Search Department" />
          <CommandEmpty>No department found.</CommandEmpty>
          <CommandGroup>
            {departmentFetchList.map((data, index) => (
              <CommandItem
                key={index}
                value={data}
                onSelect={() => handleSelect(data)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    departmentID === data ? "opacity-100" : "opacity-0"
                  )}
                />
                {data}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
