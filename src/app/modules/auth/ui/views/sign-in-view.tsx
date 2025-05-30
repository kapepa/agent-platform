"use client"

import { Card, CardContent } from "@/components/ui/card";
import { FC, useState } from "react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from 'lucide-react';
import Link from "next/link";
import { Routers } from "@/types/routers";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  }),
})

const SignInView: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setPending(true)

    try {
      authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: Routers.Home
        },
        {
          onSuccess: () => {
            router.push(Routers.Home)
          },
          onError: ({ error }) => {
            setError(error.message);
          }
        }
      )
    } finally {
      setPending(false);
    }
  }

  function handlerSocial(provider: "github" | "google") {
    setError(null);
    setPending(true)

    try {
      authClient.signIn.social(
        {
          provider,
          callbackURL: Routers.Home
        },
        {
          onError: ({ error }) => {
            setError(error.message);
          }
        }
      )
    } finally {
      setPending(false);
    }
  }


  return (
    <div
      className="flex flex-col gap-6"
    >
      <Card
        className="overflow-hidden p-0"
      >
        <CardContent
          className="grid p-0 md:grid-cols-2"
        >
          <Form
            {...form}
          >
            <form
              className="p-6 md:p-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div
                className="flex flex-col gap-6"
              >
                <div
                  className="flex flex-col items-center text-center"
                >
                  <h1
                    className="text-2xl font-bold"
                  >
                    Welcome back
                  </h1>
                  <p
                    className="text-muted-foreground text-balance"
                  >
                    Login to your account
                  </p>
                </div>
                <div
                  className="grid gap-3"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className="grid gap-3"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {
                  !!error
                  && (
                    <Alert
                      className="bg-destructive/10 border-none"
                    >
                      <TriangleAlert
                        className="h-4 w-4 !text-destructive"
                      />
                      <AlertTitle>
                        {error}
                      </AlertTitle>
                    </Alert>
                  )
                }
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full"
                >
                  Sign in
                </Button>
                <div
                  className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t"
                >
                  <span
                    className="bg-card text-muted-foreground relative z-10 px-2"
                  >
                    Or continue with
                  </span>
                </div>
                <div
                  className="grid grid-cols-2 gap-4"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlerSocial.bind(null, "google")}
                    disabled={pending}
                    className="w-full"
                  >
                    <FaGoogle />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlerSocial.bind(null, "github")}
                    disabled={pending}
                    className="w-full"
                  >
                    <FaGithub />
                  </Button>
                </div>
                <div
                  className="text-center text-sm"
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    href={Routers.SignUp}
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div
            className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center"
          >
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-[92px] w-[92px]"
            />
            <p
              className="text-2xl font-semibold text-white"
            >
              Meet.AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
      >
        By clicking continue, you agree to our{" "}
        <Link
          href={Routers.Home}
        >
          Terms of Service
        </Link>
        and{" "}
        <Link
          href={Routers.Home}
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}

export { SignInView }