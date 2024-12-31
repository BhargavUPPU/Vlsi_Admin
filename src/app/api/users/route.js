import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const { email, name, password, role } = userSchema.parse(body);

    // Check if the email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: role || "USER",
        image: null, // You can adjust this if needed
        emailVerified: null,
      },
    });

    const { password: _, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(
      { users, message: "Users fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

