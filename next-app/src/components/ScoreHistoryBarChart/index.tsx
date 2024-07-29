import { FullUser } from "@/models/User";
import { ChartData } from "chart.js";
import moment from "moment";
import React from "react";
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";
import { getChartOptions } from "./options";

type Props = {
  scoreHistory: FullUser["scoreHistory"];
};

export const ScoreHistoryBarChart: React.FC<Props> = ({ scoreHistory }) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const redColor = "rgba(205, 19, 35, 0.5)";
  const greenColor = "rgba(82, 196, 26, 0.5)";
  const data: ChartData<"bar"> = {
    labels: scoreHistory
      .map((item) => moment(item.date).format("DD.MM.YYYY"))
      .sort((a, b) => moment(a).diff(moment(b))),
    datasets: [
      {
        data: scoreHistory.map((item) => item.changeScoreValue),
        backgroundColor: scoreHistory.map((item) =>
          item.changeScoreValue >= 0 ? greenColor : redColor
        ),
        borderWidth: 0,
        borderRadius: isMobile ? 5 : 10,
        barPercentage: 1.1,
      },
    ],
  };

  return <Bar data={data} options={getChartOptions(scoreHistory, isMobile)} />;
};
