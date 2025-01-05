import ContributorsList from "./(contributorsList)/page";

import "../globals.css";
import styles from "./styles.module.css";

export default function RootLayout({ children }) {
  return (
        <div className={styles.viewPortWrapper}>
            <div className={styles.headerContainer}>Header</div>
            <div className={styles.layoutContainer}>
                <ContributorsList />
                {children}
            </div>
        </div>
  );
}
