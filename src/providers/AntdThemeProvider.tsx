import FlipCoinLoadingIcon from "@/components/FlipCoinLoadingIcon";
import { ConfigProvider, Spin } from "antd";
import { FC, PropsWithChildren } from "react";

Spin.setDefaultIndicator(<FlipCoinLoadingIcon />);

export const AntdThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#cf1322",
          colorLink: "#cf1322",
        },
        components: {
          Spin: {
            dotSize: 40,
            dotSizeSM: 30,
            dotSizeLG: 50,
          },
          Layout: {
            headerBg: "black",
            headerColor: "white",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
