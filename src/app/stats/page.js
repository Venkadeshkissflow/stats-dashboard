import Image from "next/image";

import styles from "./styles.module.css";

export default async function Home() {

  const owner = process.env.OWNER;
  const repo = process.env.REPO;
  const token = process.env.GITHUB_PAT;

  const userInfoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  })

  const userInfo = await userInfoRes.json();

  console.log(userInfo, "***************  userInfo  *****************");

  return (
    <div className={styles.bodyContainer}>
      iam from page
    </div>
  );
}
