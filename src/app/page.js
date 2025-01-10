import { permanentRedirect } from 'next/navigation'

export default function Home() {
  permanentRedirect(`/stats/dashboard`);
  return (
    <div>
      iam from page1
    </div>
  );
}
