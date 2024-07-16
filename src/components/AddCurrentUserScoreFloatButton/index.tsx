import { useAppDispatch } from "@/store/hooks";
import { setAddScoreModal } from "@/store/users";
import { DollarOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useSession } from "next-auth/react";
import s from "./style.module.scss";

export const AddCurrentUserScoreFloatButton = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session?.user.id) {
      dispatch(setAddScoreModal({ open: true, userId: session.user.id }));
    }
  };

  return (
    <FloatButton
      icon={<DollarOutlined style={{ fontSize: 30 }} />}
      onClick={handleClick}
      className={s.addCurrentUserScoreFloatButton}
      type="primary"
    />
  );
};
