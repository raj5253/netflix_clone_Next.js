import styles from "./navbar.module.css";

import { useRouter } from "next/router"; //routing part was done after return of this component was done.
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "@/lib/magic-client";
const NavBar = () => {
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getUsername() {
      try {
        const { issuer, email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken(); //for serverless func -api  to connet hasura to database

        if (email) {
        }
      } catch (error) {}
    }
    getUsername();
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/"); //if already on home page,then no reload.good
  };
  const handleOnClickMylist = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown); //simple react logic. no hooks
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={36}
            />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem} onClick={handleOnClickMylist}>
            My list
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>

              {/* expand for more icons */}
              <Image
                src="/static/icon_expandbelow.svg"
                alt="expand dropdown"
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  {/* <Link href="/login" legacyBehavior> */}
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  {/* </Link> */}
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
