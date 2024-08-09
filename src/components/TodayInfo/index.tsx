import {
  useGetCardOfTheDayQuery,
  useGetCombinationOfTheDayQuery,
  useGetModificationOfTheDayQuery,
} from "@/store/api";
import { Card, Col, Divider, Flex, Row, Space, Typography } from "antd";
import Image from "next/image";
import s from "./style.module.scss";
import cn from "classnames";

export const TodayInfo = () => {
  const {
    data: card,
    isFetching: cardFetching,
    isLoading: cardLoading,
  } = useGetCardOfTheDayQuery();
  const {
    data: combination,
    isFetching: combinationFetching,
    isLoading: combinationLoading,
  } = useGetCombinationOfTheDayQuery();
  const {
    data: modification,
    isFetching: modificationFetching,
    isLoading: modificationLoading,
  } = useGetModificationOfTheDayQuery();

  return (
    <Row gutter={[8, 8]} wrap>
      <Col span={10}>
        <Card
          loading={cardFetching || cardLoading}
          className={s.card}
          classNames={{ body: cn(s.card__body, s.cardOfTheDay) }}
        >
          <Typography.Title level={3} className={s.card__title}>
            Карта дня
          </Typography.Title>
          <Flex
            justify="center"
            align="center"
            className={s.cardOfTheDayWrapper}
          >
            <Image
              src={`/card_icons/${card?.value}_${card?.kind}.svg`}
              alt="card of the day"
              height={120}
              width={100}
            />
          </Flex>
        </Card>
      </Col>
      <Col flex="auto" span={14}>
        <Card
          loading={modificationLoading || modificationFetching}
          className={s.card}
          classNames={{ body: s.card__body }}
        >
          <Space direction="vertical">
            <Typography.Title level={3} className={s.card__title}>
              Модификация дня
            </Typography.Title>
            <Typography.Paragraph className={s.modificationOfTheDay}>
              {modification?.text}
            </Typography.Paragraph>
          </Space>
        </Card>
      </Col>
      <Col flex={1} span={24}>
        <Card
          className={s.card}
          classNames={{ body: s.card__body }}
          loading={combinationFetching || combinationLoading}
        >
          <Space direction="vertical" className={s.combinationOfTheDayWrapper}>
            <Space>
              <Typography.Title level={3} className={s.card__title}>
                Комбинация дня
              </Typography.Title>
              <Divider type="vertical" />
              <Typography.Title
                level={3}
                className={cn(s.card__title, s["card__title--black"])}
              >
                {combination?.name}
              </Typography.Title>
            </Space>
            <Space
              style={{
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {combination?.example.map((card) => (
                <Image
                  src={`/card_icons/${card.value}_${card.kind}.svg`}
                  style={{ opacity: card.inCombination ? 1 : 0.4 }}
                  alt={`${card.value}_${card.kind}`}
                  height={75}
                  width={60}
                  key={`${card.value}-${card.kind}`}
                />
              ))}
            </Space>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
