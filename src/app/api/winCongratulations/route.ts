"use server";
import dbConnect from "@/lib/mongodb";
import WinCongratulation from "@/models/WinCongratulation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const count = await WinCongratulation.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomWinCongratulation = await WinCongratulation.findOne()
      .skip(random)
      .limit(1);
    return NextResponse.json(randomWinCongratulation);
  } catch (error) {
    return NextResponse.json({ error: "Cannot get quote" }, { status: 400 });
  }
}
