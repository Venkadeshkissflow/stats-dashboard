import { getReviewersCommentsInfo } from "@/app/service";

import Count from "@/app/(components)/count";

export default async function CommentsCount({contributorId}){

      const reviewCommentsList = await getReviewersCommentsInfo();


      const userCommentsInfo = reviewCommentsList.filter((contributorInfo)=>{
      const {user,state, body } = contributorInfo;
        return body === "check this requester venkadesh"
      })
    return (
        <Count title={"Total comments count"} count={userCommentsInfo.length} />
    )
}