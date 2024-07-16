import { Button, Flex, Layout, Space, Typography } from "antd";
import Image from "next/image";
import CardsIcon from "../../../public/cards.svg";
import s from "./layout.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";

const { Header: AntdHeader } = Layout;
export const Header = () => {
  const { data: session, status } = useSession();

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
    </AntdHeader>
  );
};
