"use client";
import { Layout as AntdLayout } from "antd";
import { FC, PropsWithChildren } from "react";
import { Header } from "./Header";
import s from "./layout.module.scss";
import { Footer } from "./Footer";

const { Content } = AntdLayout;

export const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AntdLayout className={s.layout}>
      <Header />
      <Content className={s.content}>{children}</Content>
      <Footer />
    </AntdLayout>
  );
};
