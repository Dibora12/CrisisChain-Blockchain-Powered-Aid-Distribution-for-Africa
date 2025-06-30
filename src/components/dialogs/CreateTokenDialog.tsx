
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateTokenForm } from '@/components/forms/CreateTokenForm';

interface CreateTokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTokenDialog({ open, onOpenChange }: CreateTokenDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create First Token</DialogTitle>
          <DialogDescription>
            Create a new privacy token on the Midnight network for aid distribution.
          </DialogDescription>
        </DialogHeader>
        <CreateTokenForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
