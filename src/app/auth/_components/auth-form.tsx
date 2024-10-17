'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const form = useForm()
  const { toast } = useToast()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await signIn('email', { email: data.email, redirect: false });
      console.log(result); // Verifique o resultado aqui

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: 'Magic link sent',
        description: 'Check your email for the magic link to login',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      });
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Use your email to sign in via Magic Link</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...form.register("email")}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Magic Link
                </>
              ) : (
                'Send Magic Link'
              )}
            </Button>
          </CardFooter>
        </form>
        {message && (
          <CardContent className="pt-0">
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
