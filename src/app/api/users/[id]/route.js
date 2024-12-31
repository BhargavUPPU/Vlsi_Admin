import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import * as z from "zod";
export async function PATCH(request, { params }) {
  try {
    const { id } = params; // Get 'id' from params
    console.log("ID:", id);
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const body = await request.json();

    // Validate and extract the new role
    const { role } = body;
    if (!["ADMIN", "USER"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // Update the user's role in the database
    const updatedUser = await db.user.update({
      where: { id: parseInt(id) }, // Ensure id is parsed as an integer
      data: { role },
    });

    return NextResponse.json(
      { user: updatedUser, message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
