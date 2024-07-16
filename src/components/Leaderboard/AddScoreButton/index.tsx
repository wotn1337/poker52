import { BaseUser } from "@/models/User";
import { useAppDispatch } from "@/store/hooks";
import { setAddScoreModal } from "@/store/users";
import { DollarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

type Props = {
  userId: BaseUser["_id"];
};

export const AddScoreButton: FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setAddScoreModal({ open: true, userId }));
  };

  return (
    <Button
      icon={<DollarOutlined style={{ color: "#52c41a" }} />}
      onClick={handleClick}
    />
  );
};
