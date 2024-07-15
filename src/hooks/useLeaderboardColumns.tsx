import { AddScore } from "@/components/AddScore";
import { getPlaceCellContent } from "@/lib/getPlaceCellContent";
import { BaseUser } from "@/models/User";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, TableProps, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import s from "@/components/Leaderboard/leaderbord.module.scss";
import { useDeleteUserMutation } from "@/store/users/api";
import { useState } from "react";

export const useLeaderboardColumns = () => {
  const { data: session } = useSession();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = (id: string) => {
    setDeletingIds([...deletingIds, id]);
    deleteUser(id).then(() => {
      setDeletingIds(deletingIds.filter((item) => item !== id));
    });
  };

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
    },
    {
      title: "Залутано / Слито",
      dataIndex: "score",
      key: "score",
    },
  ];

  if (session?.user.isAdmin) {
    columns.push({
      key: "action",
      render: (_, user) => (
        <Space size="middle">
          <AddScore user={user} />
          {user._id !== session?.user.id && (
            <Tooltip title="Удалить игрока">
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteUser(user._id)}
                loading={deletingIds.includes(user._id)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    });
  }

  return columns;
};
