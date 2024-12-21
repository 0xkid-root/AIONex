import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';

export function ExamplePage() {
  const { toast, success, error } = useToast();

  const handleClick = () => {
    success({
      title: 'Success',
      description: 'Operation completed successfully',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Example Page</h1>
      <Button onClick={handleClick}>Show Toast</Button>
    </div>
  );
} 