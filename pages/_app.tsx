import type { AppProps } from "next/app";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import { FC } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Layout } from "../core/components/global/layout";
import { wrapper } from "../core/store";
import "../styles/main.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pathname } = useRouter();

  return (
    <Provider store={store}>
      <Head>
        <title>Io Dash</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#040724" />
        <link rel="shortcut icon" href="/img/favicon.ico" />
      </Head>
      <ToastContainer />

      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
};

export default wrapper.withRedux(App);
