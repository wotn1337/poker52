"use server";
import dbConnect from "@/lib/mongodb";
import Combination, { CombinationType } from "@/models/Combination";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("combination-of-the-day");
  try {
    await dbConnect();
    const combinationOfTheDay = await Combination.findOne<CombinationType>({
      combinationOfTheDay: true,
    });

    return NextResponse.json(combinationOfTheDay);
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot get combination of the day" },
      { status: 500 }
    );
  }
}
