"use client";
import { Flex, Layout, Space, Typography } from "antd";
import Image from "next/image";
import CardsIcon from "../../../public/cards.svg";
import s from "./layout.module.scss";
import { Menu } from "./Menu";

const { Header: AntdHeader } = Layout;
export const Header = () => {
  return (
    <AntdHeader className={s.header}>
      <Flex align="center" justify="space-between" className={s.header__inner}>
        <Space size="small" align="center">
          <Image
            src={CardsIcon}
            alt="cards icon"
            width={50}
            height={50}
            className={s.cardsIcon}
          />
          <Typography.Title level={1} className="header-title">
            Покер 52
          </Typography.Title>
        </Space>
        <Menu />
      </Flex>
    </AntdHeader>
  );
};
