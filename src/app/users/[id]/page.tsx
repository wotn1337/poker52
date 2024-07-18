"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetUserQuery } from "@/store/api";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Space, Tag, Typography } from "antd";
import { useParams } from "next/navigation";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isFetching } = useGetUserQuery(id);
  return (
    <ProtectedRoute>
      <Card style={{ width: "100%" }} loading={isFetching || isLoading}>
        <Card.Meta
          avatar={<Avatar icon={<UserOutlined />} size="large" />}
          title={user?.name}
          description={
            user?.score ? (
              <Space size="small" align="center">
                <Typography.Text>
                  Общий {user.score >= 0 ? "выигрыш" : "проигрыш"}:
                </Typography.Text>
                <Tag color={user.score >= 0 ? "green" : "red"}>
                  {user.score}
                </Tag>
              </Space>
            ) : undefined
          }
        />
      </Card>
    </ProtectedRoute>
  );
}
