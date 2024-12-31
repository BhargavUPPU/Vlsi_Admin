"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(signInData);
    if (signInData.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Successfully signed in");
      router.refresh();
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
            Email
          </label>
          <input
            type="email"
            {...form.register("email", { required: "Email is required" })}
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
            {...form.register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Sign in
      </button>

      <div className="mx-auto my-4 flex w-full items-center justify-center before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-300 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-300">
        or
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Sign in with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        If you don&apos;t have an account, please{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
      <ToastContainer />
    </form>
  );
};

export default SignIn;
