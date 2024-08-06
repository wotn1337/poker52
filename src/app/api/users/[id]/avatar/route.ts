import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import fs from "fs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").slice(-2, -1)[0];

    if (!id) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }
    const user = await User.findById(id);

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (user.avatar) {
      const oldAvatarPath = path.join(process.cwd(), "uploads", user.avatar);
      fs.unlink(oldAvatarPath, (error) => {
        if (error) {
          return NextResponse.json(
            { message: "Ошибка удаления старого аватара" },
            { status: 500 }
          );
        }
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFileName = `${uuid()}${file.name.slice(
      file.name.lastIndexOf(".")
    )}`;

    const filePath = path.join(process.cwd(), "uploads", uniqueFileName);
    fs.writeFile(filePath, buffer, (error) => {
      if (error) {
        return NextResponse.json(
          { message: "Ошибка сохранения файла" },
          { status: 500 }
        );
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: uniqueFileName },
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

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").slice(-2, -1)[0];

    if (!id) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(id);

    if (user.avatar) {
      const oldAvatarPath = path.join(process.cwd(), "uploads", user.avatar);
      fs.unlink(oldAvatarPath, (error) => {
        if (error) {
          return NextResponse.json(
            { message: "Ошибка удаления старого аватара" },
            { status: 500 }
          );
        }
      });
    }

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
