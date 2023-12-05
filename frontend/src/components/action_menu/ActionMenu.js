import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export const ActionMenu = () => {
  return (
    <div className="flex-row items-start font-medium">
      <Accordion collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Data Entry</AccordionTrigger>
          <AccordionContent>Creating data here</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Data Querying</AccordionTrigger>
          <AccordionContent>Querying data goes here</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
