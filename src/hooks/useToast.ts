import { useCallback } from 'react';
import { ToastActionElement, toast as showToast } from '@/components/ui/toast';

type ToastProps = {
  title: string;
  description?: string;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive' | 'success';
};

export function useToast() {
  const toast = useCallback(({ title, description, action, variant = 'default' }: ToastProps) => {
    showToast({
      title,
      description: description || '',
      variant,
      action,
    });
  }, []);

  return {
    toast,
    success: (props: Omit<ToastProps, 'variant'>) => 
      toast({ ...props, variant: 'success' }),
    error: (props: Omit<ToastProps, 'variant'>) => 
      toast({ ...props, variant: 'destructive' }),
    default: (props: Omit<ToastProps, 'variant'>) => 
      toast({ ...props, variant: 'default' }),
  };
} 