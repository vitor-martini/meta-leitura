"use client";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/global";
import theme from "@/styles/theme";
import { AuthProvider } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Meta Leitura</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <AuthProvider>
            <GlobalStyle />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
