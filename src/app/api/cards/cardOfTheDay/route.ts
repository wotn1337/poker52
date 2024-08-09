"use server";
import dbConnect from "@/lib/mongodb";
import Card from "@/models/Card";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("card-of-the-day");
  try {
    await dbConnect();
    const cardOfTheDay = await Card.findOne({ instanceOfTheDay: true });
    return NextResponse.json(cardOfTheDay);
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot get card of the day" },
      { status: 500 }
    );
  }
}
