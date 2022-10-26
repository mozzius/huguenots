import type { AppType } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

// sorry for hotlinking!
// copied from the huguenots.co.uk homepage

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Huguenots</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-57x57_ba7pJDb.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-60x60_fkt07FK.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-72x72_LBvykAR.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-76x76_2Gxt0cR.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-152x152_cQxOU7q.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-114x114_7nG9xyR.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-152x152_4.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://huguenots.co.uk/static/icons/additional/apple-icon-180x180_DfzvmPW.png"
        />
        <link
          rel="icon"
          sizes="16x16"
          href="https://huguenots.co.uk/static/icons/additional/favicon-16x16_Righvjb.png"
        />
        <link
          rel="icon"
          sizes="32x32"
          href="https://huguenots.co.uk/static/icons/additional/favicon-32x32_HJOKNcH.png"
        />
        <link
          rel="icon"
          sizes="96x96"
          href="https://huguenots.co.uk/static/icons/additional/favicon-96x96_eoFr3oG.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#004890" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
