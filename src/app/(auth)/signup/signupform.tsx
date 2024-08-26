"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterAction } from "@/actions/auth/auth-action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignUpFormSchema } from "@/lib/zodschema/signup-schema";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      conformpassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    const result = await RegisterAction(values);
    if (!result.success) {
      toast.error("error");
    }
    const userid = result?.data?.id;
    router.push(`/signupsuccess/${userid}`);
  }
  return (
    <Card className="w-full max-w-[560px]">
      <CardHeader className="text-center">
        <CardTitle>Register</CardTitle>
        <CardDescription>Welcome</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} autoComplete="false" />
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
            <FormField
              control={form.control}
              name="conformpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
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
                <Loader2 className="w-4 h-4 animate-spin mr-3" />
              ) : (
                <span>Register</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="flex flex-wrap gap-2 items-center">
          <p> Already Registered?</p>
          <Button asChild variant={"link"} size={"sm"}>
            <Link href={"/signin"} className="text-amber-500">
              <span> Please signin</span>
            </Link>
          </Button>
          <Button asChild variant={"link"} size={"sm"}>
            <Link className="text-blue-600" href={"/"}>
              Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
