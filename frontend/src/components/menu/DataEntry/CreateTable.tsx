import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { PopupComponent } from "@/components/core/PopupComponent";

const CreateTable = () => {
  const { toast } = useToast();
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

  const manipulateTable = async (type: string) => {
    try {
      const url =
        type == "create" ? "/api/create_tables/" : "/api/clear_all_tables/";
      const response = await fetch(url);

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Something wrong happened",
          description: "Something wrong happened, please try again",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: "Action Success",
        description: data.message,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearSpecificTable = async (tableName: string) => {
    try {
      const url = "/api/clear_specific_table/" + tableName;
      const response = await fetch(url);

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Something wrong happened",
          description: "Something wrong happened, please try again",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: "Action Success",
        description: data.message,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const clearAllTable = async () => {
    try {
      const url = "/api/drop_all_tables/";
      const response = await fetch(url);

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Something wrong happened",
          description: "Something wrong happened, please try again",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: "Action Success",
        description: data.message,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const populateTable = async () => {
    try {
      const url = "/api/populate_table/";
      const response = await fetch(url);

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Something wrong happened",
          description: "Something wrong happened, please try again",
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: "Action Success",
        description: data.message,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="min-h-[30vh] text-lg items-center text-start space-y-5">
      <div className="flex-col space-y-5">
        <PopupComponent
          onConfirm={async () => {
            await populateTable();
          }}
          buttonTitle="Populate Data"
          title="Are you absolutely sure?"
          description="This action will clear your current data, then populate with new data."
        />
        <PopupComponent
          onConfirm={async () => {
            await manipulateTable("create");
          }}
          buttonTitle="Create Tables"
          title="Are you sure?"
          description="This action cannot be undone. This will create your table"
        />
        <PopupComponent
          onConfirm={() => {
            console.log(`Clear a Table with name ${tableName}`);
            if (tableName) clearSpecificTable(tableName);
            else
              toast({
                variant: "destructive",
                title: "Enter table name",
                description: "Please enter the table name you want to clear.",
              });
          }}
          buttonTitle="Clear and Drop a Table"
          title="Enter the table you want to clear"
          description={<ClearTable />}
        />
        <PopupComponent
          onConfirm={async () => {
            await manipulateTable("clear");
          }}
          buttonTitle="Clear All Tables (Data only)"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your data"
        />
        <PopupComponent
          onConfirm={async () => {
            await clearAllTable();
          }}
          buttonTitle="Drop All Tables (Data and Tables)"
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
