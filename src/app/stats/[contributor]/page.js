import Card from "@/app/(widgets)/card";
import Image from "next/image";

import styles from "./styles.module.css"
import { getPullRequestInfo, getPullRequestReviewInfo, getReviewersCommentsInfo } from "../../service";
import CommentsCount from "./(comments_count)";
import AssignedPullRequestCount from "./(assigned_pullrequest_count)";
import Count from "@/app/(components)/count";

function assignedPullRequestCounts(pullRequestList, contributorId){
  let assignedPullRequests = pullRequestList.filter((prInfo)=>{
    return prInfo.assignees.find((assignee)=> assignee.login === contributorId);
  })
  return assignedPullRequests.length
}

async function getUserAssignedPullRequestStateCount(pullRequestList, contributorId){
  let approvedPrCount = 0;
  let waitingForApprovalCount = 0;

  pullRequestList.forEach(async ({number: prnumber}) => {
    let prReviewInfo =  await getPullRequestReviewInfo(prnumber);
    prReviewInfo.forEach((prInfo)=> {
      if(prInfo.login === contributorId && prInfo.state === "APPROVED"){
        approvedPrCount=approvedPrCount + 1;
      }
    })
    console.log(prReviewInfo, "&&&&&&&&&& prReviewInfo &&&&&&&&&&&")
  });
  return {
    approvedCount: approvedPrCount,
    pendingCount: waitingForApprovalCount
}
}

export default async function ContributorStats({params}) {
  const contributorId = (await params).contributor

  const pullRequestList = await getPullRequestInfo();

  const reviewersList = await getUserAssignedPullRequestStateCount(pullRequestList, contributorId);

  let assignedPullRequestCount = assignedPullRequestCounts(pullRequestList, contributorId)

  console.log({pullRequestList,reviewersList}, "************ reviewersList ************")

  return (
    <div>
      <CommentsCount contributorId={contributorId} />
      <Count title={"Assigned pull request count"} count={assignedPullRequestCount} />
      <Count title={"Approved pr count"} count={reviewersList.approvedCount} />
      <Count title={"Pending approval pr count"} count={assignedPullRequestCount - reviewersList.approvedCount} />
    </div>
  );
}
