"use client";
import { Flex, Spin } from "antd";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status: sessionStatus, data: session } = useSession();

  useEffect(() => {
    if (sessionStatus === "unauthenticated" && !session) {
      redirect("/login");
    }
  }, [sessionStatus, session]);

  if (sessionStatus === "loading") {
    return (
      <Flex justify="center" align="center" style={{ flex: 1 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
