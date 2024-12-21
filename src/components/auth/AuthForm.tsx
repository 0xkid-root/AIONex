import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AuthForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        {...register('email', { required: true })}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}