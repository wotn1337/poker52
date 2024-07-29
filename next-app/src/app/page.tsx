"use client";
import { ActionsFloatButton } from "@/components/ActionsFloatButton";
import { AddScoreModal } from "@/components/AddScoreModal";
import { CardOfTheDay } from "@/components/CardOfTheDay";
import { Leaderboard } from "@/components/Leaderboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Leaderboard />
      <ActionsFloatButton />
      <CardOfTheDay />
      <AddScoreModal />
    </ProtectedRoute>
  );
}
