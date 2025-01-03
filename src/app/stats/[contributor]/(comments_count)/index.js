import { getReviewersCommentsInfo } from "@/app/service";

import Count from "@/app/(components)/count";

export default async function CommentsCount({contributorId}){
      console.log(contributorId, "************ contributorId ***********")
      const reviewCommentsList = await getReviewersCommentsInfo();

      const userCommentsInfo = reviewCommentsList.filter((contributorInfo)=>{
        return contributorInfo.user.login === contributorId
      })

    return (
        <Count title={"Total comments count"} count={userCommentsInfo.length} />
    )
}