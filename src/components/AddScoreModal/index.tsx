import { UpdateScore } from "@/models/User";
import {
  useLazyGetRandomLoseConsalationQuery,
  useLazyGetRandomWinCongratulationQuery,
  useUpdateUserScoreMutation,
} from "@/store/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAddScoreModal } from "@/store/users";
import { FrownFilled, TrophyFilled } from "@ant-design/icons";
import {
  Button,
  Form,
  FormProps,
  InputNumber,
  message,
  Modal,
  Radio,
} from "antd";
import { useSession } from "next-auth/react";
import { FC } from "react";

type Props = {};

export const AddScoreModal: FC<Props> = () => {
  const [form] = Form.useForm<UpdateScore>();
  const [updateScore, { isLoading }] = useUpdateUserScoreMutation();
  const { data: session } = useSession();
  const [getLoseConsalation] = useLazyGetRandomLoseConsalationQuery();
  const [getWinCongratulation] = useLazyGetRandomWinCongratulationQuery();
  const dispatch = useAppDispatch();
  const { addScoreModal } = useAppSelector((state) => state.users);

  const handleCancel = () => {
    dispatch(setAddScoreModal({ open: false, userId: undefined }));
    form.resetFields();
  };

  const onFinish: FormProps<UpdateScore>["onFinish"] = async ({
    score,
    isWin,
  }) => {
    if (addScoreModal.userId) {
      const result = await updateScore({
        _id: addScoreModal.userId,
        score: (isWin ? 1 : -1) * score,
      });
      if (!result.error) {
        if (session?.user.id === addScoreModal.userId) {
          if (isWin) {
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
      title="Изменить счет"
      open={addScoreModal.open}
      onCancel={handleCancel}
      footer={null}
      centered
      destroyOnClose
    >
      <Form<UpdateScore>
        form={form}
        name="add-score"
        onFinish={onFinish}
        initialValues={{ isWin: true }}
      >
        <Form.Item
          name="isWin"
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Radio.Group>
            <Radio value={true}>Выигрыш</Radio>
            <Radio value={false}>Проигрыш</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="score"
          rules={[{ required: true, message: "Обязательное поле" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            inputMode="numeric"
            type="tel"
            min={0}
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
