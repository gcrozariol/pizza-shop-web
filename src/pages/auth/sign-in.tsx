import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  function handleSignIn(data: SignInForm) {
    try {
      toast.success('An authentication link was sent to your e-mail.', {
        action: {
          label: 'Resend',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Invalid credentials.')
    }
  }

  return (
    <>
      <Helmet title="login" />
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Create account</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your sales through the access panel
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
