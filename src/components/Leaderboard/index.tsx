"use client";
import { Space, Table, TableProps, Typography } from "antd";
import s from "./leaderbord.module.scss";
import { useGetUsersQuery } from "@/store/api";
import { useLeaderboardColumns } from "@/hooks/useLeaderboardColumns";
import { useSession } from "next-auth/react";

type Props = {
  players: any[];
};

export const Leaderboard = () => {
  const { data: users, isLoading, isFetching } = useGetUsersQuery();
  const { data: session } = useSession();

  const columns = useLeaderboardColumns();

  return (
    <Space direction="vertical" className={s.playersTableWrapper}>
      <Typography.Title level={2} className={s.title}>
        Топ самых влиятельных лиц НБП
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={users}
        pagination={false}
        loading={isLoading || isFetching}
        rowKey="_id"
        onRow={(record) => ({
          className:
            record._id === session?.user.id ? s.currentUserRow : undefined,
        })}
        scroll={{ x: "100%" }}
      />
    </Space>
  );
};
