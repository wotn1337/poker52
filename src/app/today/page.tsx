"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TodayInfo } from "@/components/TodayInfo";
import { Divider, Space, Typography } from "antd";
import moment from "moment";
import "moment/locale/ru";
import s from "./style.module.scss";

export default function UserPage() {
  return (
    <ProtectedRoute>
      <Space align="center" className={s.titleWrapper}>
        <Typography.Title level={2} className={s.title}>
          Сегодня
        </Typography.Title>
        <Divider type="vertical" />
        <Typography.Title level={2} type="secondary" className={s.title}>
          {moment(new Date()).locale("ru").format("D MMMM")}
        </Typography.Title>
      </Space>
      <TodayInfo />
    </ProtectedRoute>
  );
}
