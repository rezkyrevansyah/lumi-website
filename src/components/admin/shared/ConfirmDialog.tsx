"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title = "Delete item?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-rubik)" }}>{title}</DialogTitle>
          <DialogDescription style={{ fontFamily: "var(--font-opensans)" }}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}
            style={{ fontFamily: "var(--font-opensans)" }}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => { onConfirm(); onOpenChange(false); }}
            style={{ fontFamily: "var(--font-opensans)" }}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
