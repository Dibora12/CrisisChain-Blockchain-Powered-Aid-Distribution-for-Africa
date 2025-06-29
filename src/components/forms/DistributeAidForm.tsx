
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreateDistribution } from '@/hooks/useDistributions';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  recipientId: z.string().min(1, 'Please select a recipient'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  aidRequestId: z.string().min(1, 'Aid request ID is required'),
});

type FormData = z.infer<typeof formSchema>;

interface DistributeAidFormProps {
  onSuccess?: () => void;
}

export function DistributeAidForm({ onSuccess }: DistributeAidFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientId: '',
      amount: 0,
      reason: '',
      aidRequestId: '',
    },
  });

  const createDistribution = useCreateDistribution();

  const onSubmit = async (data: FormData) => {
    await createDistribution.mutateAsync({
      aid_request_id: data.aidRequestId,
      recipient_id: data.recipientId,
      amount: data.amount,
      shielded_memo: data.reason,
    });
    
    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="recipientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipient user ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="aidRequestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aid Request ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter aid request ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  placeholder="Enter amount to distribute"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Reason for aid distribution"
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={createDistribution.isPending}
        >
          {createDistribution.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Distribute Aid
        </Button>
      </form>
    </Form>
  );
}
