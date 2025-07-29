import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

// Props: open, onOpenChange, onConfirm, loading, plantName
const DeleteModal = ({ open, onOpenChange, onConfirm, loading = false, plantName = "this plant" }) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-background-body border-input-border dark:bg-background-body dark:border-input-border">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-heading-primary dark:text-heading-primary text-xl">
                        Delete Plant
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-black-pg-light dark:text-black-pg-light text-xl">
                        Are you sure you want to delete <span className="font-bold text-error-text">{plantName}</span>?
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="font-bold text-xl bg-gray-400 hover:shadow-none cursor-pointer hover:bg-error-text">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-btn-background-primary hover:bg-btn-hover-bg text-base-white font-bold cursor-pointer text-xl"
                        onClick={onConfirm}
                        disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteModal;
