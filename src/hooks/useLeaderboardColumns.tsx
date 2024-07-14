import { AddScore } from "@/components/AddScore";
import { getPlaceCellContent } from "@/lib/getPlaceCellContent";
import { BaseUser } from "@/models/User";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, TableProps, Tooltip } from "antd";
import { useSession } from "next-auth/react";

export const useLeaderboardColumns = () => {
  const { data: session } = useSession();
  const columns: TableProps<BaseUser>["columns"] = [
    {
      key: "place",
      render: (_, __, index) => getPlaceCellContent(index),
      align: "center",
      width: "7%",
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
          {user._id !== session.user.id && (
            <Tooltip title="Удалить игрока">
              <Button
                icon={<DeleteOutlined />}
                // onClick={() => handleDeletePlayer(player._id)}
                // loading={deletingIds.includes(player._id)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    });
  }
  return columns;
};
