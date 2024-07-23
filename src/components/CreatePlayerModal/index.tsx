"use client";
import { copyToClipboard } from "@/lib/copyToClipboard";
import {
  CreateUserParams,
  CreateUserResponse,
  UpdateUserParams,
} from "@/models/User";
import { useCreateUserMutation } from "@/store/api";
import { isErrorWithMessage } from "@/typeGuard";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  ModalProps,
  Space,
  Typography,
} from "antd";
import { FC, useState } from "react";

const { Text } = Typography;

export const CreatePlayerModal: FC<ModalProps> = (props) => {
  const [form] = Form.useForm<CreateUserParams>();
  const [newUserData, setNewUserData] = useState<CreateUserResponse>();
  const [createUser, { isLoading, reset }] = useCreateUserMutation();

  const handleCancel: ModalProps["onCancel"] = (e) => {
    props.onCancel?.(e);
    reset();
    form.resetFields();
    setNewUserData(undefined);
  };

  const handleCopyNewUserData = () => {
    copyToClipboard(
      `Логин: ${newUserData?.name}\nПароль: ${newUserData?.password}`
    ).then(() => {
      message.success("Данные нового пользователя скопированы");
    });
  };

  const onFinish: FormProps<CreateUserParams>["onFinish"] = (values) => {
    createUser(values).then((res) => {
      if (!res.error) {
        message.success("Пользователь успешно создан");
        setNewUserData(res.data);
      } else if (isErrorWithMessage(res.error)) {
        message.error(res.error.message);
      }
    });
  };

  return (
    <Modal
      {...props}
      title="Добавить игрока"
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
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: "100%" }}
            >
              Добавить
            </Button>
            <Button
              onClick={handleCopyNewUserData}
              onTouchStart={handleCopyNewUserData}
              style={{ width: "100%" }}
              disabled={!newUserData}
            >
              Скопировать данные
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
