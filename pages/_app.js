import "../styles.css";
import Head from "flareact/head";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Uptime</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
