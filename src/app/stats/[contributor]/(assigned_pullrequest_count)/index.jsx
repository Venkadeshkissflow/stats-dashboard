import Count from "@/app/(components)/count";

export default async function AssignedPullRequestCount({count}){
    return (
        <Count title={"Assigned pull request count"} count={count} />
    )
}