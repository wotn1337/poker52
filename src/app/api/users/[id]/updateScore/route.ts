import dbConnect from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import User, { FullUser, ScoreHistoryItem } from "@/models/User";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req: NextRequest) {
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

    const score = await req.json();
    const user = await User.findById(id);
    const {
      totalScore,
      currentWinStreak,
      currentLoseStreak,
      maxWinStreak,
      maxLoseStreak,
      maxLose,
      maxWin,
    } = user as FullUser;
    let newWinStreak = 0;
    let newLoseStreak = 0;
    let newMaxWin = 0;
    let newMaxLose = 0;

    const today = new Date().toISOString().split("T")[0];

    const existingEntry = user.scoreHistory.find(
      (entry: ScoreHistoryItem) =>
        entry.date.toISOString().split("T")[0] === today
    );

    if (existingEntry) {
      existingEntry.changeScoreValue += score;
      newWinStreak = existingEntry.changeScoreValue > 0 ? currentWinStreak : 0;
      newLoseStreak =
        existingEntry.changeScoreValue < 0 ? currentLoseStreak : 0;
      newMaxWin = Math.max(existingEntry.changeScoreValue, maxWin);
      newMaxLose = Math.min(existingEntry.changeScoreValue, maxLose);
      existingEntry.totalScoreAfterValue += score;
    } else {
      newWinStreak = score > 0 ? currentWinStreak + 1 : 0;
      newLoseStreak = score < 0 ? currentLoseStreak + 1 : 0;
      newMaxWin = Math.max(score, maxWin);
      newMaxLose = Math.min(score, maxLose);
      user.scoreHistory.push({
        changeScoreValue: score,
        totalScoreAfterValue: score + totalScore,
      });
    }

    const newMaxWinStreak = Math.max(newWinStreak, maxWinStreak);
    const newMaxLoseStreak = Math.max(newLoseStreak, maxLoseStreak);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        currentWinStreak: newWinStreak,
        maxWinStreak: newMaxWinStreak,
        currentLoseStreak: newLoseStreak,
        maxLoseStreak: newMaxLoseStreak,
        maxWin: newMaxWin,
        maxLose: newMaxLose,
        scoreHistory: user.scoreHistory,
        $inc: {
          totalScore: score,
        },
      },
      {
        new: true,
      }
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
