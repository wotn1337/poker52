"use client";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { CreateUserParams, UpdateUserParams } from "@/models/User";
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
  Typography,
} from "antd";
import { FC, useState } from "react";

const { Text } = Typography;

export const CreatePlayerModal: FC<ModalProps> = (props) => {
  const [form] = Form.useForm<CreateUserParams>();
  const [password, setPassword] = useState<string>();
  const [createUser, { isLoading, reset }] = useCreateUserMutation();

  const handleCancel: ModalProps["onCancel"] = (e) => {
    props.onCancel?.(e);
    reset();
    form.resetFields();
    setPassword(undefined);
  };

  const onFinish: FormProps<CreateUserParams>["onFinish"] = (values) => {
    createUser(values).then((res) => {
      if (!res.error) {
        setPassword(res.data.password);
        copyToClipboard(
          `Логин: ${res.data.name}\nПароль: ${res.data.password}`
        ).then(() => {
          message.success("Данные нового пользователя скопированы");
          // handleCancel();
        });
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
  );
};
