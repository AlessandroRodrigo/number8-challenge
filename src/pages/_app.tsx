import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
