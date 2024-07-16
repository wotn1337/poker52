import dbConnect from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname: path } = new URL(req.url);
    const id = path.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const body = await req.json();
    const { score, ...paramsToUpdate } = body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...paramsToUpdate, $inc: { score } },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname: path } = new URL(req.url);
    const id = path.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
