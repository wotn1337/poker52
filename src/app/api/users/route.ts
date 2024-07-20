"use server";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import generator from "generate-password";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await User.find().sort({ score: -1, name: 1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Users get error" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, isAdmin } = body;
    const user = await User.findOne({ name });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const password = generator.generate({
      length: 4,
      numbers: true,
      symbols: false,
      uppercase: false,
      lowercase: false,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = new User({
      name,
      isAdmin,
      password: hashedPassword,
    });
    await savedUser.save();
    return NextResponse.json({ ...savedUser._doc, password });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
