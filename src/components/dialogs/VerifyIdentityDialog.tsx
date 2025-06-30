
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VerifyIdentityForm } from '@/components/forms/VerifyIdentityForm';

interface VerifyIdentityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VerifyIdentityDialog({ open, onOpenChange }: VerifyIdentityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Identity Verification</DialogTitle>
          <DialogDescription>
            Submit your application to become a trusted identity verifier in the CrisisChain network.
          </DialogDescription>
        </DialogHeader>
        <VerifyIdentityForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
