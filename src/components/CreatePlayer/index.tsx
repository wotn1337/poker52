"use client";
import { FC, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Typography,
} from "antd";
import { useCreateUserMutation } from "@/store/api";
import { CreateUserParams, UpdateUserParams } from "@/models/User";

type Props = {
  onCreate: (player: any) => void;
};

const { Text } = Typography;

export const CreatePlayer: FC<Props> = () => {
  const [form] = Form.useForm<CreateUserParams>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState<string>();
  const [createUser, { isLoading, reset }] = useCreateUserMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
    form.resetFields();
    setPassword(undefined);
  };

  const onFinish: FormProps<CreateUserParams>["onFinish"] = (values) => {
    createUser(values).then((res) => {
      setPassword(res.data?.password);
      navigator.clipboard
        .writeText(`Логин: ${res.data?.name}\nПароль: ${res.data?.password}`)
        .then(() => {
          message.success("Данные нового пользователя скопированы");
          // handleCancel();
        });
    });
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
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Добавить
            </Button>
          </Form.Item>
          {password && <Text copyable>{password}</Text>}
        </Form>
      </Modal>
    </>
  );
};
