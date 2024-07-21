import { FullUser } from "@/models/User";
import { Typography } from "antd";
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";
import { getChartOptions } from "./options";
import { useMediaQuery } from "react-responsive";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  zoomPlugin
);

type Props = {
  scoreHistory: FullUser["scoreHistory"];
  userCreatedAt?: Date;
};

export const ScoreHistoryLineChart: React.FC<Props> = ({
  scoreHistory,
  userCreatedAt,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const data: ChartData<"line"> = {
    labels: [
      moment(userCreatedAt).format("DD.MM.YYYY"),
      ...scoreHistory.map((item) => moment(item.date).format("DD.MM.YYYY")),
    ].sort((a, b) => moment(a).diff(moment(b))),
    datasets: [
      {
        data: [0, ...scoreHistory.map((item) => item.totalScoreAfterValue)],
        fill: false,
        borderColor: "#cf1322",
        tension: 0,
        pointRadius: 5,
        pointBackgroundColor: "#cf1322",
      },
    ],
  };

  return (
    <>
      <Typography.Title level={2}>График выигрышей/проигрышей</Typography.Title>
      <Line data={data} options={getChartOptions(scoreHistory, isMobile)} />
    </>
  );
};
