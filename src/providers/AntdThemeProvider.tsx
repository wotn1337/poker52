import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

export const AntdThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#cf1322",
          colorLink: "#cf1322",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
