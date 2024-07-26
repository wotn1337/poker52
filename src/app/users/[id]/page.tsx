"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ScoreHistoryBarChart } from "@/components/ScoreHistoryBarChart";
import { ScoreHistoryLineChart } from "@/components/ScoreHistoryLineChart";
import { UserStatistics } from "@/components/UserStatistics";
import { useGetUserQuery } from "@/store/api";
import {
  ArrowLeftOutlined,
  BarChartOutlined,
  LineChartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import { useParams } from "next/navigation";
import s from "./style.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  ChartDataLabels,
  LineElement,
  PointElement
);

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isFetching } = useGetUserQuery(id);
  const loading = isFetching || isLoading;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "По играм",
      icon: <BarChartOutlined />,
      children: user?.scoreHistory.length ? (
        <ScoreHistoryBarChart scoreHistory={user?.scoreHistory ?? []} />
      ) : (
        <Empty
          description="Ни одной игры не сыграно"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ),
    },
    {
      key: "2",
      label: "Общий",
      icon: <LineChartOutlined />,
      children: user?.scoreHistory.length ? (
        <ScoreHistoryLineChart
          scoreHistory={user?.scoreHistory ?? []}
          userCreatedAt={user?.createdAt}
        />
      ) : (
        <Empty
          description="Ни одной игры не сыграно"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ),
    },
  ];
  return (
    <ProtectedRoute>
      <Button icon={<ArrowLeftOutlined />} className={s.backButton} href="/">
        На главную
      </Button>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Card loading={loading}>
          <Space size="middle" align="center">
            <SmileOutlined style={{ color: "#fa8c16", fontSize: 30 }} />
            <Typography.Title level={2} style={{ margin: 0 }}>
              {user?.name}
            </Typography.Title>
          </Space>
        </Card>
        <UserStatistics loading={loading} user={user} />
        <Card loading={loading}>
          <Typography.Title level={2} style={{ marginTop: 0 }}>
            Винстрик я иду без поражений
          </Typography.Title>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </Space>
    </ProtectedRoute>
  );
}
