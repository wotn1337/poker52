"use server";
import dbConnect from "@/lib/mongodb";
import LoseConsalation from "@/models/LoseConsalation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const count = await LoseConsalation.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomLoseConsalation = await LoseConsalation.findOne()
      .skip(random)
      .limit(1);
    return NextResponse.json(randomLoseConsalation);
  } catch (error) {
    return NextResponse.json({ error: "Cannot get quote" }, { status: 400 });
  }
}
