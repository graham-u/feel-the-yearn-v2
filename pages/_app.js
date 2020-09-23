import NoSSR from 'react-no-ssr';

function MyApp({Component, pageProps}) {
  return (
    <NoSSR>
      <Component {...pageProps} />
    </NoSSR>
  );
}

export default MyApp
