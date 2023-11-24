/* eslint-disable @next/next/no-page-custom-font */
"use client";
import "@/styles/globals.css";
import ThemeComponent from "@/theme";
import Head from "next/head";
import persistStore from "redux-persist/es/persistStore";
// import NextProgress from "nextjs-progressbar";
import { store } from "@/app/redux/state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SWRConfig } from "swr";
import martApi from "@/app/redux/state/slices/api/baseApi";
import { jsonHeader } from "../redux/state/slices/api/setAuthHeaders";
import { DataProvider } from "../context/info";
import AdminRouteGuard from "../components/HOC/adminGuard";

// ** Third Party Import
import { Toaster } from "react-hot-toast";

import ReactHotToast from "@/app/styles/react-hot-toast";
import { Box } from "@mui/material";

//👇 Import our second font
// import { Open_Sans, Roboto_Mono } from 'next/font/google'

// const openSans = Open_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   //👇 Add variable to our object
//   variable: '--font-opensans',
// })

// //👇 Configure the object for our second font
// const robotoMono = Roboto_Mono({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto-mono',
// })

const metadata = {
  title:
    "Mama-feeds | Your Trusted Source for Children, Maternity, and Layette Essentials",
  description:
    "Discover the best in children's, maternity, and layette products at Mama-feeds. We're your go-to destination for all your family's needs, offering a wide range of high-quality essentials for mothers and children. Explore our curated selection of baby clothing, maternity wear, and more, all designed with your comfort and style in mind. Shop with confidence, and experience the joy of finding the perfect products for your family at Mama-feeds.",
};

const persistor = persistStore(store);

// ** Pace Loader
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // className={`${openSans.variable} ${robotoMono.variable} font-sans`}
    >
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo/logo.png"
        />
        <link rel="shortcut icon" href="/images/logo/logo.jpg" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Discover the best in children's, maternity, and layette products at Mama-feeds. We're your go-to destination for all your family's needs, offering a wide range of high-quality essentials for mothers and children. Explore our curated selection of baby clothing, maternity wear, and more, all designed with your comfort and style in mind. Shop with confidence, and experience the joy of finding the perfect products for your family at Mama-feeds."
        />
        <meta
          name="keywords"
          keywords="Mama-feeds, children's products, maternity essentials, layette clothing, baby clothing, motherhood, family essentials, baby gear, parenting, maternity wear, newborn essentials, online baby store, quality baby products"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <meta name="author" content="Oluwasusi Stehen @stephayemmitty" />
        {/* Open Graph (OG) */}
        <meta
          property="og:title"
          content="Mama-feeds | Your Trusted Source for Children, Maternity, and Layette Essentials"
        />
        <meta
          property="og:description"
          content="Discover the best in children's, maternity, and layette products at Mama-feeds. We're your go-to destination for all your family's needs, offering a wide range of high-quality essentials for mothers and children. Explore our curated selection of baby clothing, maternity wear, and more, all designed with your comfort and style in mind. Shop with confidence, and experience the joy of finding the perfect products for your family at Mama-feeds."
        />
        <meta property="og:image" content="/images/logo/logo.png" />
        <meta property="og:url" content="https:corislo-demo.vercel.app" />
        <meta property="og:type" content="product" />
      </Head>
      <body>
        <SWRConfig
          value={{
            refreshInterval: false,
            revalidateOnFocus: true,
            fetcher: async (resource, init) => {
              const getToken = jsonHeader();
              const res = await martApi.get(resource, getToken);
              return res.data;
            },
          }}
        >
          <Provider store={store}>
            <DataProvider>
              <PersistGate loading={null} persistor={persistor}>
                <AdminRouteGuard>
                  <ThemeComponent>
                    {children}
                    <ReactHotToast>
                      <Toaster
                        position="top-right"
                        toastOptions={{ className: "react-hot-toast" }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                </AdminRouteGuard>
              </PersistGate>
            </DataProvider>
          </Provider>
        </SWRConfig>
      </body>
    </html>
  );
}
