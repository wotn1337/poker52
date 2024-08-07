import { useGetCardOfTheDayQuery } from "@/store/api";
import { FloatButton, Spin } from "antd";
import Image from "next/image";
import s from "./CardOfTheDay.module.scss";

export const CardOfTheDay = () => {
  const {
    data: cardOfTheDay,
    isFetching,
    isLoading,
  } = useGetCardOfTheDayQuery();

  return (
    <FloatButton
      icon={
        <Spin size="small" spinning={isFetching || isLoading}>
          {cardOfTheDay?.image && (
            <Image
              src={cardOfTheDay.image}
              alt="card of the day"
              height={50}
              width={48}
            />
          )}
        </Spin>
      }
      tooltip="Карта дня"
      shape="square"
      className={s.cardOfTheDay}
    />
  );
};
