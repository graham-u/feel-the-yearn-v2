import Document, { Html, Head, Main, NextScript } from "next/document";

// Analytics tracking.
const clickyId = process.env.NEXT_PUBLIC_CLICKY_ID;
const clickyAnalyticsCode = `var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(${clickyId});`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script dangerouslySetInnerHTML={{ __html: clickyAnalyticsCode }} />
          <script async src="//static.getclicky.com/js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
