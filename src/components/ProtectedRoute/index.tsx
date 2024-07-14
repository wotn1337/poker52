"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Flex, Spin } from "antd";
import { redirect } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus, data: session } = useSession();
  // const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated" && !session) {
      redirect("/login"); // Перенаправляем на страницу входа, если пользователь не авторизован
    }
  }, [sessionStatus]);

  // Если сессия загружается, показываем заглушку или спиннер загрузки
  if (sessionStatus === "loading") {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  // Если пользователь авторизован, показываем защищенный маршрут
  return <>{children}</>;
};

export default ProtectedRoute;
