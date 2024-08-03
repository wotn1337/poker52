import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { unlink, writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname: path } = new URL(req.url);
    const id = path.split("/").slice(-2, -1)[0];

    if (!id) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const bufferArray = new Uint8Array(buffer);

    const uniqueFileName = `${uuid()}${file.name.slice(
      file.name.lastIndexOf(".")
    )}`;
    const filePath = join(process.cwd(), "public", "uploads", uniqueFileName);

    await writeFile(filePath, bufferArray);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: `/uploads/${uniqueFileName}` },
      { new: true }
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
    const id = path.split("/").slice(-2, -1)[0];

    if (!id) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(id);
    const avatarFileName = user.avatar.replace("/uploads", "");

    // Определение полного пути к файлу
    const filePath = join(process.cwd(), "public", "uploads", avatarFileName);

    // Удаление файла
    await unlink(filePath);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: null },
      { new: true }
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
