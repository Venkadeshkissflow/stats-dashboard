import { getContributorsList } from "@/app/service";

import styles from "./styles.module.css"

export default async function ContributorsList(){
    const contributorsList = await getContributorsList();

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.searchBarWrapper}>
                <input className={styles.inputBox} />
            </div>
            <div className={styles.contributorsListContainer}>
                <div className={styles.contributorsList}>
                    {
                        contributorsList.map((contributor)=>(
                            <span key={contributor.id}>{contributor.owner.login}</span>
                        ))
                    } 
                </div>
            </div>
      </div>
    )
}