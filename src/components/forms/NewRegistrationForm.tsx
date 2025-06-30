import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/backend/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  walletAddress: z.string().min(10, 'Please enter a valid wallet address'),
});

type FormData = z.infer<typeof formSchema>;

interface NewRegistrationFormProps {
  onSuccess?: () => void;
}

export function NewRegistrationForm({ onSuccess }: NewRegistrationFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      walletAddress: '',
    },
  });

  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    setIsSubmitting(true);
    try {
      // Update the user's profile with the registration data
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: data.name,
          wallet_address: data.walletAddress,
        });

      if (error) throw error;

      toast.success('Registration completed successfully', {
        description: 'Your identity information has been saved',
      });
      
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed', {
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your wallet address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Complete Registration
        </Button>
      </form>
    </Form>
  );
}
