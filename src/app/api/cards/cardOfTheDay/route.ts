"use server";
import dbConnect from "@/lib/mongodb";
import Card from "@/models/Card";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const cardOfTheDay = await Card.findOne({ cardOfTheDay: true });
    return NextResponse.json(cardOfTheDay);
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot get card of the day" },
      { status: 500 }
    );
  }
}
