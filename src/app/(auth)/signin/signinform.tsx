"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { SignInFormSchema } from "@/lib/zodschema/signin-schema";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signinAction } from "@/actions/auth/auth-action";
import AlertMessage from "@/components/alert-message";
import { Session } from "next-auth";

// interface Props {
//   session: Session | null;
// }

const SignInForm = () => {
  const searchParams = useSearchParams();
  const redirecturl = searchParams.get("redirect");

  // console.log(redirecturl);
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    const result = await signinAction(values);
    if (!result.success) {
      setError(result.error || null);
    }

    toast.success("You are signed In successfully");
    fetch(`${process.env.HOST}/api/auth/session`)
      .then((res) => res.json())
      .then((res) => {
        if (res.user.role === "Admin") {
          router.push("/admin");
        } else {
          router.push(redirecturl || "/dashboard");
        }
      })
      .catch((error) => {
        router.push(redirecturl || "/");
      });
  }

  return (
    <Card className="w-full max-w-[560px]">
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome Back to COA Quiz</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E-mail"
                      {...field}
                      autoComplete="false"
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
                      placeholder="Password"
                      {...field}
                      type="password"
                      autoComplete="false"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <div className="flex gap-3">
                  <Loader2 className="w-4 h-4 animate-spin mr-3" />
                  <span>Sign In...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
            <Button asChild variant={"link"}>
              <Link href={"/signup"}>Not yet Register? click here</Link>
            </Button>
            <Button asChild variant={"link"}>
              <Link href={"/"}>Home</Link>
            </Button>
            {error && <AlertMessage error={error} />}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
