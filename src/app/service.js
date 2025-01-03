const owner = process.env.OWNER;
const repo = process.env.REPO;
const token = process.env.GITHUB_PAT;

export async function getReviewersCommentsInfo(){
    const res =  await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
    })
    return res.json();
}

export async function getPullRequestInfo(){
    const res =  await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
    })
    return res.json();
}

export async function getPullRequestReviewInfo(pull_request_number){
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pull_request_number}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
})
return res.json();
}