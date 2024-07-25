"use client";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/global";
import theme from "@/styles/theme";
import { AuthProvider } from "@/context/auth";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Meta Leitura</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <GlobalStyle />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
