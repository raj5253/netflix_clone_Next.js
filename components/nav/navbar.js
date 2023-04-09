import styles from "./navbar.module.css";

import { useRouter } from "next/router"; //routing part was done after return of this component was done.
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const NavBar = (props) => {
  const { username } = props;

  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={36}
            />
          </div>
        </a>
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
                alt="expand icon"
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login" legacyBehavior>
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
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
