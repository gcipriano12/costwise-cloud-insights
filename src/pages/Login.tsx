
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoggingIn(true);
      
      // This is a mock login process - replace with your actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes - simulating login redirect
      // In a real app, this would verify credentials with a backend
      console.log('Logging in with:', data);
      
      toast({
        title: t('login.success.title', 'Login successful'),
        description: t('login.success.description', 'Welcome back to X Cost!'),
      });

      navigate('/dashboards');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('login.error.title', 'Login failed'),
        description: t('login.error.description', 'Invalid email or password. Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-muted">
      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="p-4 bg-background border-b">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-4 w-4" />
              <span>{t('login.backToHome', 'Back to home')}</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
                  X Cost
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                {t('login.title', 'Welcome back')}
              </CardTitle>
              <CardDescription className="text-center">
                {t('login.subtitle', 'Enter your credentials to access your account')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('login.form.email', 'Email')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
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
                        <FormLabel>{t('login.form.password', 'Password')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={togglePasswordVisibility}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-XCost-blue hover:bg-blue-700 transition-colors"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn
                      ? t('login.form.loggingIn', 'Logging in...')
                      : t('login.form.login', 'Login')}
                  </Button>

                  <div className="text-center">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-muted-foreground hover:text-blue-500 transition-colors"
                    >
                      {t('login.forgotPassword', 'Forgot your password?')}
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center w-full">
                <p className="text-sm text-muted-foreground">
                  {t('login.noAccount', "Don't have an account?")}{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-XCost-blue hover:underline"
                  >
                    {t('login.signUp', 'Sign up')}
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Login;
