import Document, { Head, Html, Main, NextScript } from "next/document";

class Muy extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Muy;
