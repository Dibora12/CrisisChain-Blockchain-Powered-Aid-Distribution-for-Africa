
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NewRegistrationForm } from '@/components/forms/NewRegistrationForm';

interface NewRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewRegistrationDialog({ open, onOpenChange }: NewRegistrationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Identity Registration</DialogTitle>
          <DialogDescription>
            Register your identity information to participate in the CrisisChain network.
          </DialogDescription>
        </DialogHeader>
        <NewRegistrationForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
