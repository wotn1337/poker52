import { BaseUser } from "@/models/User";
import { useDeleteUserMutation } from "@/store/api";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";

type Props = {
  userId: BaseUser["_id"];
};

export const DeleteUserButton: FC<Props> = ({ userId }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = () => {
    deleteUser(userId);
  };

  return (
    <Popconfirm
      title="Удалить пользователя"
      description="Действительно удалить?"
      onConfirm={handleDeleteUser}
      okText="Да"
      cancelText="Нет"
    >
      <Button icon={<DeleteOutlined />} loading={isLoading} />
    </Popconfirm>
  );
};
