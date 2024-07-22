import { AppstoreOutlined, UserAddOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { FC, useState } from "react";
import { CreatePlayerModal } from "../CreatePlayerModal";
import s from "./style.module.scss";

type Props = {
  addScoreButtonNode: JSX.Element;
};

export const AdminActionButtonsGroup: FC<Props> = ({ addScoreButtonNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FloatButton.Group
        trigger="click"
        icon={<AppstoreOutlined className={s.buttonIcon} />}
        rootClassName={s.actionFloatButton}
        className={s.adminActionButtonsGroup}
      >
        <FloatButton
          icon={<UserAddOutlined className={s.buttonIcon} />}
          onClick={() => setIsModalOpen(true)}
          className={s.actionFloatButton}
          tooltip="Добавить игрока"
        />
        {addScoreButtonNode}
      </FloatButton.Group>
      <CreatePlayerModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};
