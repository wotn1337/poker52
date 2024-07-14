"use client";

import {
  Layout as AntdLayout,
  Button,
  Divider,
  Flex,
  Space,
  Typography,
} from "antd";
import s from "./layout.module.scss";
import { FC, PropsWithChildren } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import CardsIcon from "../../../public/cards.svg";

const { Header, Content } = AntdLayout;

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { data: session, status } = useSession();
  return (
    <AntdLayout className={s.layout}>
      <Header className={s.header}>
        <Flex
          align="center"
          justify="space-between"
          className={s.header__inner}
        >
          <Space size="small" align="center">
            <Image
              src={CardsIcon}
              alt="cards icon"
              width={50}
              height={50}
              className={s.cardsIcon}
            />
            <Typography.Title level={1} className={s.title}>
              Покер 52
            </Typography.Title>
          </Space>
          <Space>
            {session ? (
              <Button type="link" onClick={() => signOut()}>
                Выйти
              </Button>
            ) : (
              <Button
                type="link"
                onClick={() => signIn()}
                loading={status === "loading"}
              >
                Войти
              </Button>
            )}
          </Space>
        </Flex>
      </Header>
      <Content className={s.content}>{children}</Content>
    </AntdLayout>
  );
};
