"use client";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu as AntdMenu, Button, Dropdown } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import s from "./layout.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

export const Menu: FC = () => {
  const path = usePathname();
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const items: MenuItem[] = [
    {
      label: <Link href="/">Главная</Link>,
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href={`/users/${session?.user.id}`}>Профиль</Link>,
      key: `/users/${session?.user.id}`,
      icon: <UserOutlined />,
    },
    {
      label: "Выйти",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => signOut(),
    },
  ];

  if (!session) {
    return <></>;
  }

  if (isMobile) {
    return (
      <Dropdown
        menu={{ items, activeKey: path, selectable: false }}
        trigger={["click"]}
        overlayStyle={{ width: 200 }}
        getPopupContainer={(node) => node}
        className={s.menuDropdown}
      >
        <Button icon={<MenuOutlined />} type="primary" size="large" />
      </Dropdown>
    );
  }

  return (
    <AntdMenu
      activeKey={path}
      items={items}
      mode="horizontal"
      selectable={false}
      style={{ flex: 1, justifyContent: "end" }}
      overflowedIndicator={<MenuOutlined />}
    />
  );
};
