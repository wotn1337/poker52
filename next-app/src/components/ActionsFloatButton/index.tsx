import { useAppDispatch } from "@/store/hooks";
import { setAddScoreModal } from "@/store/users";
import { DollarOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useSession } from "next-auth/react";
import { AdminActionButtonsGroup } from "./AdminActionButtonsGroup";
import s from "./style.module.scss";

export const ActionsFloatButton = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session?.user.id) {
      dispatch(setAddScoreModal({ open: true, userId: session.user.id }));
    }
  };

  const addScoreButtonNode = (
    <FloatButton
      icon={<DollarOutlined className={s.buttonIcon} />}
      onClick={handleClick}
      className={s.actionFloatButton}
      type="primary"
      tooltip="Изменить счет"
    />
  );

  if (session?.user.isAdmin) {
    return <AdminActionButtonsGroup addScoreButtonNode={addScoreButtonNode} />;
  }

  return addScoreButtonNode;
};
