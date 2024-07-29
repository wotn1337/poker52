import { useGetCardOfTheDayQuery } from "@/store/api";
import { FloatButton, Spin } from "antd";
import s from "./CardOfTheDay.module.scss";
import Image from "next/image";

export const CardOfTheDay = () => {
  const { data: cardOfTheDay } = useGetCardOfTheDayQuery();

  return (
    <FloatButton
      icon={
        !cardOfTheDay?.image ? (
          <Spin size="small" />
        ) : (
          <Image
            src={cardOfTheDay.image}
            alt="card of the day"
            height={50}
            width={48}
          />
        )
      }
      tooltip="Карта дня"
      shape="square"
      className={s.cardOfTheDay}
    />
  );
};
