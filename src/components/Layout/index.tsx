"use client";
import {
  Layout as AntdLayout,
  Button,
  Flex,
  Space,
  Spin,
  Typography,
} from "antd";
import s from "./layout.module.scss";
import { FC, PropsWithChildren } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import CardsIcon from "../../../public/cards.svg";
import { useGetRandomQuoteQuery } from "@/store/api";
const package_json = require("../../../package.json");

const { Header, Content, Footer } = AntdLayout;

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { data: session, status } = useSession();
  const { data: quoteData, isLoading, isFetching } = useGetRandomQuoteQuery();
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
              <Button type="primary" onClick={() => signOut()}>
                Выйти
              </Button>
            ) : (
              <Button
                type="primary"
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
      <Footer className={s.footer}>
        <Spin spinning={isLoading || isFetching}>
          <Typography.Paragraph className={s.footer__quote} italic>
            "{quoteData?.quote}"
            <Typography.Text className={s.quoteAutor}>
              {" "}
              — {quoteData?.author}
            </Typography.Text>
          </Typography.Paragraph>
        </Spin>
        <Typography.Text className={s.footer__version}>
          v{package_json.version}
        </Typography.Text>
      </Footer>
    </AntdLayout>
  );
};
