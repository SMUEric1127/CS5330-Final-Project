import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { PopupComponent } from "@/components/core/PopupComponent";

const CreateTable = () => {
  const [tableName, setTableName] = useState<string | undefined>(undefined);

  const ClearTable = () => {
    return (
      <Input
        type="text"
        autoFocus
        placeholder="Table name"
        onChange={(e) => {
          e.preventDefault();
          setTableName(e.target.value);
        }}
        value={tableName || ""}
      />
    );
  };
  return (
    <div className="min-h-[30vh] text-lg items-center text-start space-y-5">
      <div className="flex-col space-y-5">
        <PopupComponent
          onConfirm={() => {
            console.log("Crate Tables");
          }}
          buttonTitle="Create Tables"
          title="Are you sure?"
          description="This action cannot be undone. This will create your table"
        />
        <PopupComponent
          onConfirm={() => {
            console.log(`Clear a Table with name ${tableName}`);
            // This is where fetch goes
          }}
          buttonTitle="Clear a Table"
          title="Enter the table you want to clear"
          description={<ClearTable />}
        />
        <PopupComponent
          onConfirm={() => {
            console.log("Clear All Tables");
          }}
          buttonTitle="Clear All Tables"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your table"
        />
      </div>
      {/* <div className="text-start pt-5 text-normal font-light italic">
        Notes:
        <br />
        Create Tables: This will create the table
        <br />
        Clear Tables: This will clear the table given the table name
        <br />
        All Tables: This will clear all the table
      </div> */}
    </div>
  );
};

export default CreateTable;
