"use server";
import dbConnect from "@/lib/mongodb";
import Quote from "@/models/Quote";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("random-quote");
  try {
    await dbConnect();
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random).limit(1);
    return NextResponse.json(randomQuote);
  } catch (error) {
    return NextResponse.json({ error: "Cannot get quote" }, { status: 400 });
  }
}
