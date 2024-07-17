import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { Layout } from "@/components/Layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Head from "next/head";
import Favicon from "../../public/cards.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Покер 52",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head>
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className={inter.className}>
        <Providers>
          <AntdRegistry>
            <Layout>{children}</Layout>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
