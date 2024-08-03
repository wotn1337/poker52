import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import SftpClient from "ssh2-sftp-client";
import { v4 as uuid } from "uuid";

const config = {
  host: process.env.IMAGE_STORAGE_HOST,
  port: 22,
  username: process.env.IMAGE_STORAGE_USERNAME,
  password: process.env.IMAGE_STORAGE_PASSWORD,
};

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

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueFileName = `${uuid()}${file.name.slice(
      file.name.lastIndexOf(".")
    )}`;
    const remoteFilePath = `/datastorage/${process.env.IMAGE_STORAGE_USERNAME}/${uniqueFileName}`;

    const sftp = new SftpClient();
    await sftp.connect(config);
    await sftp.put(buffer, remoteFilePath);
    await sftp.end();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: `${process.env.IMAGE_STORAGE_URI}/${uniqueFileName}` },
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
    const avatarFileName = user.avatar.split("/").slice(-1);

    const sftp = new SftpClient();
    await sftp.connect(config);
    await sftp.delete(
      `/datastorage/${process.env.IMAGE_STORAGE_USERNAME}/${avatarFileName}`
    );
    await sftp.end();

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
