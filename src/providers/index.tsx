"use client";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./StoreProvider";
import { AntdThemeProvider } from "./AntdThemeProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <StoreProvider>
        <AntdThemeProvider>{children}</AntdThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
