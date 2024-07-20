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
import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";
import { getChartOptions } from "./options";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

type Props = {
  scoreHistory?: FullUser["scoreHistory"];
};

export const ScoreHistoryLineChart: React.FC<Props> = ({ scoreHistory }) => {
  const data: ChartData<"line"> = {
    labels: scoreHistory?.map((item) => moment(item.date).format("DD.MM.YYYY")),
    datasets: [
      {
        data: scoreHistory?.map((item) => item.totalScoreAfterValue) ?? [],
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
      <Line
        data={data}
        options={getChartOptions(scoreHistory)}
        style={{ width: "100%" }}
      />
    </>
  );
};
