import Card from "@/app/(components)/card";
import { getReviewersCommentsInfo } from "@/app/service";

import styles from "./styles.module.css"

export default async function CommentsCount({contributorId}){
      console.log(contributorId, "************ contributorId ***********")
      const reviewCommentsList = await getReviewersCommentsInfo();

      const userCommentsInfo = reviewCommentsList.filter((contributorInfo)=>{
        return contributorInfo.user.login === contributorId
      })

    return (
        <Card className={styles.commentsCountWrapper}>
            <span className={styles.title}>Total comments count</span>
            <span className={styles.value}>
            {userCommentsInfo.length}
            </span>
        </Card>
    )
}