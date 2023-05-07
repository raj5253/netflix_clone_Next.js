//LOGIC :  Login is itself a separate page, not a component.
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import { useEffect } from "react";
import { headers } from "@/next.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const handleOnChangeEmail = (e) => {
    // e.preventDefault();
    setUserMsg("");
    const email = e.target.value; //e is an object.
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      // if (email === "satyamraj2358@gmail.com") {
      //  log in a user by their email
      try {
        setIsLoading(true);

        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          // setIsLoading(false);  //isme bahut doubt hai, uncomment  kar dena isko yad se

          const response = await fetch("/api/login", {
            // this invokes the api/login , which was earlier invoked by POSTMAN( postman also  had to send Bearer token)
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg(" error in response from /api/login while logging in");
          }
        }
      } catch (error) {
        // Handle errors if required!
        setIsLoading(false);
        console.error("Something went wrong logging in", error);
      }
      //// router.push("/");
      // } else {
      //   setIsLoading(false);
      //   setUserMsg("email mismatch error");
      // }
    } else {
      // show user message
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Signin</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/" legacyBehavior>
            <a>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width={128}
                  height={34}
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

// aise hai ki, react and next  are directory based routing. we didn't creted any user defined router like in express.
//  the routerurl will search for route in the "pages" folder. pages is alredy defined by next.next apan kuch kuch use kar raha hai.

/* IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.
This API uses indexes to enable high-performance searches of this data

 IndexedDB API is powerful, but may seem too complicated for simple cases.
*/
