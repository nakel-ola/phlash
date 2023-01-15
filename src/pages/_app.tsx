import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { Provider } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import store from "../redux/store";
import "../styles/globals.css";
import { ThemeProvider } from "../utils/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/color-logo.png" />
      </Head>
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        storageKey="phlash-theme"
      >
        <Provider store={store}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </ThemeProvider>
    </Fragment>
  );
}
