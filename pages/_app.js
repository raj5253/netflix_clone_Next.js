import Loading from "@/components/loading/loader";
import { magic } from "@/lib/magic-client";
// import "@/styles/globals.css";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // route to /
        // setIsLoading(false);
        router.push("/");
      } else {
        // route to /login
        // setIsLoading(false);
        router.push("/login");
      }
    };
    handleLoggedIn();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

// Note : useEffect should return a fucntion, else error:: destroy is not a function
//
// Loading page should be visible before both magic has fetched the data , and the routing for typed url has completed.
// Once urlChnage is completed then only routing should be set false.
