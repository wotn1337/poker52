"use client";
import { ActionsFloatButton } from "@/components/ActionsFloatButton";
import { AddScoreModal } from "@/components/AddScoreModal";
import { Leaderboard } from "@/components/Leaderboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Leaderboard />
      <ActionsFloatButton />
      <AddScoreModal />
    </ProtectedRoute>
  );
}
