"use server";
import { signIn } from "@/auth";
import db from "@/db/database";
import { getErrorMessage, generateToken } from "@/lib/utils";
import { SignInFormSchema } from "@/lib/zodschema/signin-schema";
import { SignUpFormSchema } from "@/lib/zodschema/signup-schema";
import { SignInFormType, SignUpFormType } from "@/types/index";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const RegisterAction = async (value: SignUpFormType) => {
  const { data, success, error } = SignUpFormSchema.safeParse(value);

  if (!success) {
    return { data: null, error: error.issues, success: false };
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userexists = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (userexists) {
    return { data: null, error: "User already Exists", success: false };
  }
  try {
    const user = await db.user.create({
      data: {
        email: data.email,
        firstName: data.name,
        password: hashedPassword,
      },
    });

    const existverificationToken = await db.verificationToken.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (existverificationToken) {
      await db.verificationToken.delete({
        where: {
          userId: user.id,
        },
      });
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        userId: user.id,
        token: generateToken(16),
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      },
    });

    //send email with verification token link   eg: https://localhost:3000/auth/verifyemail

    return { data: user, error: null, success: true };
  } catch (error) {
    const errormes = getErrorMessage(error);
    return { data: null, error: errormes, success: false };
  }
};

export const signinAction = async (values: SignInFormType) => {
  const Validation = SignInFormSchema.safeParse(values);
  if (!Validation.success) {
    return {
      data: null,
      error: getErrorMessage(Validation.error.issues),
      success: false,
    };
  }
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    revalidatePath("/signin");
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { data: null, error: error.cause?.err?.message, success: false };
    }
    console.log(error);
    return { data: null, error: "internal server error", success: false };
  }
};

export const getUser = async (userid: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userid,
      },
    });
    return { data: user, error: null, success: true };
  } catch (error) {
    return { data: null, error: error, success: false };
  }
};
