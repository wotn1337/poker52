import { AddScoreButton } from "@/components/Leaderboard/AddScoreButton";
import { DeleteUserButton } from "@/components/Leaderboard/DeleteUserButton";
import s from "@/components/Leaderboard/leaderbord.module.scss";
import { getPlaceCellContent } from "@/lib/getPlaceCellContent";
import { BaseUser } from "@/models/User";
import { FireFilled } from "@ant-design/icons";
import { Space, TableProps, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const useLeaderboardColumns = () => {
  const { data: session } = useSession();

  const columns: TableProps<BaseUser>["columns"] = [
    {
      key: "place",
      render: (_, __, index) => getPlaceCellContent(index),
      align: "center",
      width: "7%",
      onCell: (_, index) => ({
        className:
          index && index >= 0 && index <= 2 ? s.placeIconCell : undefined,
      }),
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      render: (name, user) => (
        <Space align="center">
          <Link href={`users/${user._id}`}>{name}</Link>
          {user.currentWinStreak >= 5 && (
            <Tooltip title={`Винстрик: ${user.currentWinStreak}`}>
              <FireFilled style={{ color: "#fa8c16", fontSize: 22 }} />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: "Залутано / Слито",
      dataIndex: "totalScore",
      key: "totalScore",
    },
  ];

  if (session?.user.isAdmin) {
    columns.push({
      key: "action",
      render: (_, user) => (
        <Space size="middle">
          <AddScoreButton userId={user._id} />
          {user._id !== session?.user.id && (
            <DeleteUserButton userId={user._id} />
          )}
        </Space>
      ),
    });
  }

  return columns;
};
