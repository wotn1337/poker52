"use client";
import { useGetRandomQuoteQuery } from "@/store/api";
import { Layout, Skeleton, Typography } from "antd";
import s from "./layout.module.scss";
const package_json = require("../../../package.json");

const { Footer: AntdFooter } = Layout;

export const Footer = () => {
  const { data: quoteData, isLoading, isFetching } = useGetRandomQuoteQuery();

  return (
    <AntdFooter className={s.footer}>
      <Skeleton
        loading={isLoading || isFetching}
        paragraph={{ rows: 2 }}
        title={false}
        active
        className={s.quoteSkeleton}
      >
        <Typography.Paragraph className={s.footer__quote} italic>
          &ldquo;{quoteData?.quote}&rdquo;
          <Typography.Text className={s.quoteAutor}>
            {" "}
            — {quoteData?.author}
          </Typography.Text>
        </Typography.Paragraph>
      </Skeleton>
      <Typography.Text className={s.footer__version}>
        v{package_json.version}
      </Typography.Text>
    </AntdFooter>
  );
};

export default Footer;
