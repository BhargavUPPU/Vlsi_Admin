"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.username,
        email: values.email,
        password: values.password,
        role: "USER",
      }),
    });

    if (response.ok) {
      router.push("/signin");
      console.log("User registered successfully");
    } else {
      const errorData = await response.json();
      console.log("Failed to register user:", errorData.message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md bg-gray-100 p-8 shadow-md rounded-lg"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...form.register("username")}
            placeholder="shadcn"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {form.formState.errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...form.register("email")}
            placeholder="mail@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...form.register("password")}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...form.register("confirmPassword")}
            placeholder="Re-enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Register
      </button>

      <div className="mx-auto my-4 flex w-full items-center justify-center before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-300 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-300">
        or
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Sign up with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        If you already have an account, please{" "}
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
