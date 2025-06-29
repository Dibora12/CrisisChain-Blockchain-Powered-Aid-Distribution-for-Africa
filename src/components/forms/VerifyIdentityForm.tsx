
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreateVerifierApplication } from '@/hooks/useVerifierApplications';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  motivation: z.string().min(10, 'Motivation must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface VerifyIdentityFormProps {
  onSuccess?: () => void;
}

export function VerifyIdentityForm({ onSuccess }: VerifyIdentityFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      motivation: '',
    },
  });

  const createApplication = useCreateVerifierApplication();

  const onSubmit = async (data: FormData) => {
    await createApplication.mutateAsync({
      full_name: data.fullName,
      motivation: data.motivation,
    });
    
    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivation</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Why do you want to become a verifier?"
                  className="min-h-[100px]"
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
          disabled={createApplication.isPending}
        >
          {createApplication.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Application
        </Button>
      </form>
    </Form>
  );
}
