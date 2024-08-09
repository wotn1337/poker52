"use server";
import dbConnect from "@/lib/mongodb";
import Modification, { ModificationType } from "@/models/Modification";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("modification-of-the-day");
  try {
    await dbConnect();
    const modificationOfTheDay = await Modification.findOne<ModificationType>({
      modificationOfTheDay: true,
    });

    return NextResponse.json(modificationOfTheDay);
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot get modification of the day" },
      { status: 500 }
    );
  }
}
