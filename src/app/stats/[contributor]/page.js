import Card from "@/app/(components)/card";
import Image from "next/image";

import styles from "./styles.module.css"
import { getPullRequestInfo, getReviewersCommentsInfo } from "../../service";
import CommentsCount from "./(comments_count)";


export default async function ContributorStats({params}) {
  const contributorId = (await params).contributor

  const pullRequestInfo = await getPullRequestInfo();

  return (
    <div>
      <CommentsCount contributorId={contributorId} />
    </div>
  );
}
