"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ScoreHistoryBarChart } from "@/components/ScoreHistoryBarChart";
import { ScoreHistoryLineChart } from "@/components/ScoreHistoryLineChart";
import { UserProfileTitle } from "@/components/UserProfileTitle";
import { UserStatistics } from "@/components/UserStatistics";
import { useGetUserQuery } from "@/store/api";
import {
  ArrowLeftOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  FloatButton,
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
import Image from "next/image";

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
        <UserProfileTitle user={user} loading={loading} />
        <UserStatistics loading={loading} user={user} />
        <Card loading={loading}>
          <Typography.Title level={2} style={{ marginTop: 0 }}>
            Винстрик я иду без поражений
          </Typography.Title>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </Space>
      {user?.bonus.card && (
        <FloatButton
          icon={
            <Image
              src={`/card_icons/${user.bonus.card.value}_${user.bonus.card.kind}.svg`}
              alt="Твоя персональная карта дня"
              style={{ width: "100%" }}
              width={50}
              height={60}
            />
          }
          className={s.dailyBonusFloatButton}
          shape="square"
          type="default"
          tooltip="Это твоя персональная карта дня. Если ты выиграешь раздачу, собрав комбинацию с ней, каждый игрок должен подарить тебе 50 рублей"
        />
      )}
    </ProtectedRoute>
  );
}
