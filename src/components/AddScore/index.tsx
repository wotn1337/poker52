import { FC, useState } from "react";
import { Button, Form, FormProps, InputNumber, Modal, Tooltip } from "antd";
import { DollarOutlined, PlusOutlined } from "@ant-design/icons";
import { BaseUser, UpdateUserParams } from "@/models/User";
import { useUpdateUserMutation } from "@/store/users/api";

type Props = {
  user: BaseUser;
};

export const AddScore: FC<Props> = ({ user }) => {
  const [form] = Form.useForm<UpdateUserParams>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps<UpdateUserParams>["onFinish"] = async (values) => {
    if (values.score !== undefined) {
      const result = await updateUser({
        _id: user._id,
        score: values.score + user.score,
      });
      if (!result.error) {
        handleCancel();
      }
    }
  };

  return (
    <>
      <Tooltip title="Добавить выигрыш">
        <Button
          icon={<DollarOutlined style={{ color: "#52c41a" }} />}
          onClick={handleOpenModal}
        />
      </Tooltip>
      <Modal
        title="Добавить выигрыш"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
      >
        <Form form={form} name="add-score" onFinish={onFinish}>
          <Form.Item<UpdateUserParams>
            name="score"
            label="Выигрыш"
            rules={[{ required: true, message: "Обязательное поле" }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <InputNumber style={{ width: "100%" }} />
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
        </Form>
      </Modal>
    </>
  );
};
