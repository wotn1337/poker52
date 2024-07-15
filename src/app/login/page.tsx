"use client";

import { Button, Flex, Form, FormProps, Input } from "antd";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();

  const onLogin: FormProps["onFinish"] = async (values) => {
    await signIn("credentials", {
      name: values.name,
      password: values.password,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [session]);

  return (
    <Flex justify="center" align="center" style={{ flex: 1 }}>
      <Form layout="vertical" size="large" form={form} onFinish={onLogin}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
