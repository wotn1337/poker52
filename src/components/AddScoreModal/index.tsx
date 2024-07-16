import { UpdateUserParams } from "@/models/User";
import {
  useLazyGetRandomLoseConsalationQuery,
  useLazyGetRandomWinCongratulationQuery,
  useUpdateUserMutation,
} from "@/store/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAddScoreModal } from "@/store/users";
import { FrownFilled, TrophyFilled } from "@ant-design/icons";
import { Button, Form, FormProps, InputNumber, message, Modal } from "antd";
import { useSession } from "next-auth/react";
import { FC } from "react";

type Props = {};

export const AddScoreModal: FC<Props> = () => {
  const [form] = Form.useForm<UpdateUserParams>();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: session } = useSession();
  const [getLoseConsalation, { data: loseConsalation }] =
    useLazyGetRandomLoseConsalationQuery();
  const [getWinCongratulation, { data: winCongratulation }] =
    useLazyGetRandomWinCongratulationQuery();
  const dispatch = useAppDispatch();
  const { addScoreModal } = useAppSelector((state) => state.users);

  const handleCancel = () => {
    dispatch(setAddScoreModal({ open: false, userId: undefined }));
    form.resetFields();
  };

  const onFinish: FormProps<UpdateUserParams>["onFinish"] = async (values) => {
    if (values.score !== undefined && addScoreModal.userId) {
      const result = await updateUser({
        _id: addScoreModal.userId,
        score: values.score,
      });
      if (!result.error) {
        if (session?.user.id === addScoreModal.userId) {
          if (values.score > 0) {
            getWinCongratulation().then((res) =>
              message.open({
                content: res.data?.text,
                icon: <TrophyFilled style={{ color: "#faad14" }} />,
              })
            );
          } else {
            getLoseConsalation().then((res) =>
              message.open({
                content: res.data?.text,
                icon: <FrownFilled style={{ color: "#2f54eb" }} />,
              })
            );
          }
        }
        handleCancel();
      }
    }
  };

  return (
    <Modal
      title="Добавить выигрыш"
      open={addScoreModal.open}
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
          <InputNumber
            style={{ width: "100%" }}
            inputMode="numeric"
            type="tel"
          />
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
  );
};
