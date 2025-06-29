
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DistributeAidForm } from '@/components/forms/DistributeAidForm';

interface DistributeAidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DistributeAidDialog({ open, onOpenChange }: DistributeAidDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Distribute Aid</DialogTitle>
          <DialogDescription>
            Create a new aid distribution to send tokens to recipients through the Midnight network.
          </DialogDescription>
        </DialogHeader>
        <DistributeAidForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
