import { getProfileStatisticColor } from "@/lib/getProfileStatisticColor";
import { getUserWinPercent } from "@/lib/getUserWinPercent";
import { FullUser } from "@/models/User";
import {
  Card as AntdCard,
  Statistic as AntdStatistic,
  CardProps,
  Col,
  Progress,
  Row,
  StatisticProps,
} from "antd";
import cn from "classnames";
import { FC } from "react";
import s from "./UserStatistics.module.scss";

type Props = {
  loading: boolean;
  user?: FullUser;
};

const Statistic: FC<StatisticProps & { reverseColor?: boolean }> = ({
  reverseColor = false,
  ...props
}) => (
  <AntdStatistic
    className={s.statistic}
    valueStyle={{
      color: getProfileStatisticColor(Number(props.value), reverseColor),
    }}
    groupSeparator="&thinsp;"
    {...props}
  />
);

const Card: FC<CardProps> = (props) => {
  return (
    <AntdCard
      className={s.statisticCard}
      classNames={{
        body: s.cardBody,
      }}
      {...props}
    />
  );
};

const CardCol: FC<CardProps> = (props) => {
  return (
    <Col span={8} md={6}>
      <Card {...props} />
    </Col>
  );
};

export const UserStatistics: FC<Props> = ({ loading, user }) => {
  return (
    <Row gutter={[8, 8]} align="stretch">
      <Col flex="auto" span={16} md={6}>
        <Card loading={loading}>
          <Statistic
            title="Залутано / слито"
            valueStyle={{
              color: getProfileStatisticColor(Number(user?.totalScore)),
            }}
            value={user?.totalScore}
          />
        </Card>
      </Col>
      <Col flex="auto" span={16} md={6}>
        <Card loading={loading}>
          <Statistic title="Макс. лут" value={user?.maxWin} />
        </Card>
      </Col>
      <Col span={16} md={6}>
        <Card loading={loading}>
          <Statistic
            title="Процент побед"
            valueRender={() => (
              <Progress
                type="circle"
                percent={getUserWinPercent(user?.scoreHistory)}
                size={80}
                format={(percent) => `${percent}%`}
                strokeColor={{
                  "0%": "#cf1322",
                  "15%": "#ff7875",
                  "30%": "#ffc069",
                  "100%": "#52c41a",
                }}
              />
            )}
            className={cn(s.statistic, s.winPercentStatistic)}
          />
        </Card>
      </Col>
      <CardCol loading={loading}>
        <Statistic
          title="Текущий стрик"
          value={user?.currentWinStreak || user?.currentLoseStreak}
          reverseColor={!!user?.currentLoseStreak}
        />
      </CardCol>
      <CardCol loading={loading}>
        <Statistic title="Макс. слив" value={user?.maxLose} />
      </CardCol>
      <CardCol loading={loading}>
        <Statistic title="Макс. вин стрик" value={user?.maxWinStreak} />
      </CardCol>
      <CardCol loading={loading}>
        <Statistic
          title="Макс. луз стрик"
          value={user?.maxLoseStreak}
          reverseColor
        />
      </CardCol>
    </Row>
  );
};
