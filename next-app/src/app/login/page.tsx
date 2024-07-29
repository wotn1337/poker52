"use client";

import { Button, Flex, Form, FormProps, Input, message, Spin } from "antd";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();

  const onLogin: FormProps["onFinish"] = async (values) => {
    await signIn("credentials", {
      name: values.name,
      password: values.password,
      redirect: false,
    }).then((res) => {
      const getErrorText = (error: string) => {
        switch (error) {
          case "CredentialsSignin": {
            return "Неверные имя или пароль";
          }
          default: {
            return "Ошибка авторизации";
          }
        }
      };
      if (res?.error) {
        message.error(getErrorText(res.error));
      }
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" style={{ flex: 1 }}>
        <Spin size="large" />
      </Flex>
    );
  }

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
