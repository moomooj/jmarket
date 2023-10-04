import useUser from "@libs/client/useUser";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  function LoginCheck() {
    const { user } = useUser();
    return null;
  }
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <LoginCheck />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
