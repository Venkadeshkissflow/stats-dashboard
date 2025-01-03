import Card from "@/app/(widgets)/card";

import styles from "./styles.module.css"

export default function Count({title, count}){
    return (
        <Card className={styles.cardContainer}>
            <span className={styles.title}>{title}</span>
            <span className={styles.value}>
                {count}
            </span>
        </Card>
    )
}