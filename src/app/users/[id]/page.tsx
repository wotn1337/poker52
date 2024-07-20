"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ScoreHistoryLineChart } from "@/components/ScoreHistoryLineChart";
import { useGetUserQuery } from "@/store/api";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space, Spin, Tag, Typography } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isFetching } = useGetUserQuery(id);
  const loading = isFetching || isLoading;
  return (
    <ProtectedRoute>
      <Link href="/">
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ margin: "0 auto 16px 0" }}
        >
          На главную
        </Button>
      </Link>
      <Card style={{ width: "100%" }} loading={loading}>
        <Card.Meta
          avatar={<Avatar icon={<UserOutlined />} size="large" />}
          title={user?.name}
          description={
            user?.totalScore ? (
              <Space size="small" align="center">
                <Typography.Text>
                  Общий {user.totalScore >= 0 ? "выигрыш" : "проигрыш"}:
                </Typography.Text>
                <Tag color={user.totalScore >= 0 ? "green" : "red"}>
                  {user.totalScore}
                </Tag>
              </Space>
            ) : undefined
          }
        />
      </Card>
      <Spin spinning={loading}>
        <ScoreHistoryLineChart scoreHistory={user?.scoreHistory} />
      </Spin>
    </ProtectedRoute>
  );
}
