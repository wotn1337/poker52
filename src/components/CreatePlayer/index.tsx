"use client";
import { FC, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
  Typography,
} from "antd";
import { useCreateUserMutation } from "@/store/users/api";
import { CreateUserParams, UpdateUserParams } from "@/models/User";

type Props = {
  onCreate: (player: any) => void;
};

const { Text } = Typography;

export const CreatePlayer: FC<Props> = () => {
  const [form] = Form.useForm<CreateUserParams>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createUser, { isLoading, data: createdUser, reset }] =
    useCreateUserMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
    form.resetFields();
  };

  const onFinish: FormProps<CreateUserParams>["onFinish"] = (values) => {
    createUser(values);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginLeft: "auto", display: "block" }}
      >
        Добавить игрока
      </Button>
      <Modal
        title="Добавить игрока"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          name="create-player"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item<UpdateUserParams>
            name="name"
            label="Имя"
            rules={[{ required: true, message: "Обязательное поле" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item<UpdateUserParams> name="isAdmin" valuePropName="checked">
            <Checkbox>Админ</Checkbox>
          </Form.Item>
          <Form.Item style={{ margin: 0 }}>
            <Flex justify="space-between" align="center">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Добавить
              </Button>
              {createdUser?.password && (
                <Text>
                  Пароль:&nbsp;
                  <Text copyable style={{ fontSize: 16 }} onCopy={handleCancel}>
                    {createdUser?.password}
                  </Text>
                </Text>
              )}
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
