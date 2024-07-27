import { FullUser } from "@/models/User";
import { useUpdateUserMutation } from "@/store/api";
import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, message, Space, Typography, Upload } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { useSession } from "next-auth/react";
import { FC } from "react";

type Props = {
  user?: FullUser;
  loading: boolean;
};

const acceptFileTypes = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/svg",
  "image/gif",
];

export const UserProfileTitle: FC<Props> = ({ loading, user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: session } = useSession();
  const showUploadAvatar =
    session?.user.id === user?._id || session?.user.isAdmin;
  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isFileTypeAccepted = acceptFileTypes.includes(file.type);
    if (!isFileTypeAccepted) {
      message.error("Картинку нормальную загрузи, дурик");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Картинка должна весить меньше 2МБ");
    }
    return isFileTypeAccepted && isLt5M;
  };

  const customRequest: UploadProps["customRequest"] = async (options) => {
    const { file } = options;

    const reader = new FileReader();
    reader.readAsDataURL(file as RcFile);
    reader.onload = async () => {
      const avatar = reader.result as string;

      try {
        if (user?._id) {
          updateUser({ _id: user._id, avatar })
            .then(() => {
              message.success("Аватар успешно изменен");
            })
            .catch(() => {
              message.error("Failed to upload avatar!");
            });
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <Card loading={loading || isLoading}>
      <Space size="middle" align="center">
        <Avatar
          size={100}
          icon={<SmileOutlined style={{ color: "#fa8c16", fontSize: 30 }} />}
          src={user?.avatar}
        />
        <Space direction="vertical" size="small">
          <Typography.Title level={2} style={{ margin: 0 }}>
            {user?.name}
          </Typography.Title>
          {showUploadAvatar && (
            <Upload
              showUploadList={false}
              accept={acceptFileTypes.join(",")}
              maxCount={1}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
            >
              <Button>Сменить аватар</Button>
            </Upload>
          )}
        </Space>
      </Space>
    </Card>
  );
};
