"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ScoreHistoryBarChart } from "@/components/ScoreHistoryBarChart";
import { ScoreHistoryLineChart } from "@/components/ScoreHistoryLineChart";
import { useGetUserQuery } from "@/store/api";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import s from "./style.module.scss";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isFetching } = useGetUserQuery(id);
  const loading = isFetching || isLoading;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "По играм",
      children: (
        <ScoreHistoryBarChart scoreHistory={user?.scoreHistory ?? []} />
      ),
    },
    {
      key: "2",
      label: "Общий",
      children: (
        <ScoreHistoryLineChart
          scoreHistory={user?.scoreHistory ?? []}
          userCreatedAt={user?.createdAt}
        />
      ),
    },
  ];
  return (
    <ProtectedRoute>
      <Link href="/">
        <Button icon={<ArrowLeftOutlined />} className={s.backButton}>
          На главную
        </Button>
      </Link>
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
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
        <Card style={{ width: "100%" }} loading={loading}>
          <Typography.Title level={2} style={{ marginTop: 0 }}>
            Винстрик я иду без поражений
          </Typography.Title>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </Space>
    </ProtectedRoute>
  );
}
