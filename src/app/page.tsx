"use client";
import { CreatePlayer } from "@/components/CreatePlayer";
import { Leaderboard } from "@/components/Leaderboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Space } from "antd";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Leaderboard />
        {session?.user?.isAdmin && <CreatePlayer onCreate={() => {}} />}
      </Space>
    </ProtectedRoute>
  );
}
