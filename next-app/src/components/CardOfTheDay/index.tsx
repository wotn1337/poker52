import { useGetCardOfTheDayQuery } from "@/store/api";
import { FloatButton } from "antd";
import s from "./CardOfTheDay.module.scss";

export const CardOfTheDay = () => {
  const { data: cardOfTheDay } = useGetCardOfTheDayQuery();

  return (
    <FloatButton
      icon={
        <img
          src={cardOfTheDay?.image}
          alt="card of the day"
          height={50}
          width={48}
        />
      }
      tooltip="Карта дня"
      shape="square"
      className={s.cardOfTheDay}
    />
  );
};
