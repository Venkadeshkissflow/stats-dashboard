import Card from "@/app/(widgets)/card";
import Image from "next/image";

import styles from "./styles.module.css";
import {
  getPullRequestInfo,
  getPullRequestReviewInfo,
  getReviewersCommentsInfo,
} from "../../service";
import CommentsCount from "./(comments_count)";
import AssignedPullRequestCount from "./(assigned_pullrequest_count)";
import Count from "@/app/(components)/count";

const STATE = {
  APPROVED: "APPROVED",
  COMMENTED: "COMMENTED",
};

function assignedPullRequestCounts(pullRequestList, contributorId) {
  let assignedPullRequests = pullRequestList.filter((prInfo) => {
    return prInfo.assignees.find(
      (assignee) => assignee.login === contributorId
    );
  });
  return assignedPullRequests.length;
}

function checkIsAssignedPr(assigneeList, userId) {
  return assigneeList.some((res) => {
    return res.login === userId;
  });
}

function checkIsCurrentUserOpenedPr(user, contributorId) {
  return user.login === contributorId;
}

function checkCurrentUserState(prInfo, contributorId, userState) {
  const { user, state } = prInfo;
  return user.login === contributorId && state === userState;
}

function getUserContributionData(prReviewInfo = [], contributorId) {
  let approvedPrCount = 0;
  let commentsCount = 0;

  console.log("render 2", prReviewInfo);

  // prReviewInfo.forEach((prInfo)=> {
  //   const isCurrentUserApproved = checkCurrentUserState(prInfo, contributorId, STATE.APPROVED)
  //   if(isCurrentUserApproved){
  //     approvedPrCount=approvedPrCount + 1;
  //   }

  //   const isCurrentUserCommented = checkCurrentUserState(prInfo, contributorId, STATE.COMMENTED)
  //   if(isCurrentUserCommented){
  //     commentsCount = commentsCount + 1;
  //   }
  // })

  return {
    commentsCount: commentsCount,
    approvedCount: approvedPrCount,
  };
}

async function getUserPrState(pullRequestList, contributorId) {
  let waitingForApprovalCount = 0;
  let assignedPrCount = 0;
  let openPrCount = 0;
  let contributionData = {};

  let reviewInfoList = pullRequestList.map(async (prInfo) => {
    const { number: prnumber, assignees, user, title } = prInfo;

    let isCurrentUserOpenedPr = checkIsCurrentUserOpenedPr(user, contributorId);
    if (isCurrentUserOpenedPr) {
      openPrCount = openPrCount + 1;
    }

    let isAssignedPr = checkIsAssignedPr(assignees, contributorId);
    if (isAssignedPr) {
      assignedPrCount = assignedPrCount + 1;
    }
    return await getPullRequestReviewInfo(prnumber);
  });
  console.log("render 1");
  const resolvedInfoList = await Promise.all(reviewInfoList);

  resolvedInfoList.forEach(() => {
    contributionData = getUserContributionData(resolvedInfoList, contributorId);
  });

  return {
    ...contributionData,
    openPrCount: openPrCount,
    assignedPrCount: assignedPrCount,
    pendingCount: waitingForApprovalCount,
  };
}

export default async function ContributorStats({ params }) {
  const contributorId = (await params).contributor;

  const pullRequestInfo = await getPullRequestInfo();

  const {
    assignedPrCount,
    approvedCount,
    pendingCount,
    openPrCount,
    commentsCount,
  } = await getUserPrState(pullRequestInfo, contributorId);

  console.log("render 3", {
    assignedPrCount,
    approvedCount,
    pendingCount,
    openPrCount,
    commentsCount,
  });

  return (
    <div className={styles.userStateContainer}>
      <CommentsCount contributorId={contributorId} />
      {/* <Count title={"Assigned pull request count"} count={assignedPullRequestCount} />
      <Count title={"Approved pr count"} count={reviewersList.approvedCount} />
      <Count title={"Pending approval pr count"} count={assignedPullRequestCount - reviewersList.approvedCount} /> */}
      <Count title={"Assigned pull request count"} count={12} />
      <Count title={"Approved pr count"} count={12} />
      <Count title={"Pending approval pr count"} count={11} />
      <Count title={"Assigned pr count"} count={assignedPrCount} />
      <Count title={"Open pr count"} count={openPrCount} />
      <Count title={"Comments count"} count={commentsCount} />
    </div>
  );
}
