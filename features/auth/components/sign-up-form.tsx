'use client';

import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const signUpSchema = z
  .object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    path: ['confirmPassword'],
    error: "Passwords don't match",
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: SignUpFormValues) {
    await authClient.signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          console.error(ctx.error);
        },
      }
    );
  }

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Get Started</CardTitle>
          <CardDescription>CReate your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    disabled={isPending}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <span>Continue with Google</span>
                  </Button>
                  <Button
                    type="button"
                    disabled={isPending}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <span>Continue with Github</span>
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled={isPending}
                            placeholder="jhon doe"
                            {...field}
                          />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            disabled={isPending}
                            placeholder="jhon.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isPending}
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    {isPending && <Spinner />}
                    <span>Sign up</span>
                  </Button>
                </div>
                <p className="text-sm text-center">
                  <span className="text-muted-foreground">
                    Already have an account?
                  </span>{' '}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
