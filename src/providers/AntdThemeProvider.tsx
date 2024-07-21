import FlipCoinLoadingIcon from "@/components/FlipCoinLoadingIcon";
import { ConfigProvider, Spin } from "antd";
import { FC, PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";

Spin.setDefaultIndicator(<FlipCoinLoadingIcon />);

export const AntdThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });

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
          Typography: {
            fontSizeHeading1: isMobile ? 30 : 38,
            fontSizeHeading2: isMobile ? 22 : 30,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
