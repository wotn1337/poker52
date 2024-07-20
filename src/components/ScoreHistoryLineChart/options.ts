import { FullUser } from "@/models/User";
import { ChartOptions } from "chart.js";

export const getChartOptions = (
  scoreHistory?: FullUser["scoreHistory"]
): ChartOptions<"line"> => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const index = tooltipItem.dataIndex;
          const changeScoreValue = scoreHistory?.[index].changeScoreValue;
          const totalScoreAfterValue =
            scoreHistory?.[index].totalScoreAfterValue;
          const changeScoreLabel =
            changeScoreValue && changeScoreValue >= 0 ? "Выигрыш" : "Проигрыш";
          const totalScoreLabel =
            totalScoreAfterValue && totalScoreAfterValue > 0
              ? "выигрыш"
              : "проигрыш";
          return `${changeScoreLabel}: ${changeScoreValue} | Общий ${totalScoreLabel}: ${totalScoreAfterValue}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Даты игр",
      },
    },
    y: {
      title: {
        display: true,
        text: "Сумма выигрыша",
      },
    },
  },
});
