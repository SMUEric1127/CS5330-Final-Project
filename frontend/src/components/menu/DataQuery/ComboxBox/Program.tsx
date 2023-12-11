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

export function ProgramCombobox({
  programFetchList = ["Computer Science", "Mathematics", "Physics"],
  programID = "",
  setProgramID = (dept: any) => {},
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedDisplayProgram, setSelectedDisplayProgram] = React.useState<
    undefined | string
  >(undefined);

  const handleSelect = (selectedProgram: any) => {
    setSelectedDisplayProgram(selectedProgram);
    setProgramID(selectedProgram.split(" - ")[0]);
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
          {selectedDisplayProgram || "Select Program..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command className="min-w-full p-0">
          <CommandInput placeholder="Search Program" />
          <CommandEmpty>No Program found.</CommandEmpty>
          <CommandGroup>
            {programFetchList.map((data, index) => (
              <CommandItem
                key={index}
                value={data}
                onSelect={() => handleSelect(data)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    programID === data ? "opacity-100" : "opacity-0"
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
