import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ReactNode, useEffect } from "react";
import { useToast } from "../ui/use-toast";

interface PopupComponentProps {
  buttonTitle: string;
  title?: string;
  description: ReactNode;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const PopupComponent: React.FC<PopupComponentProps> = ({
  buttonTitle,
  title = "Enter the information",
  description,
  onCancel,
  onConfirm,
}) => {
  const { toast } = useToast();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mx-5">{buttonTitle}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="pt-3">
            {description}
            <div className="flex flex-row space-x-5 pt-5 justify-end items-end">
              <AlertDialogCancel
                onClick={
                  onCancel
                    ? onCancel
                    : () => {
                        toast({
                          title: "Action Cancelled",
                        });
                      }
                }
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>
                Continue
              </AlertDialogAction>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
