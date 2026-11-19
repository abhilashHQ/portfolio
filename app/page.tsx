import { Portfolio } from "@/components/portfolio";
import { getContributions } from "@/lib/github";
import { getPosts } from "@/lib/posts";
import { profile } from "@/lib/content";

export default async function Home() {
  const contributions = await getContributions(profile.github);
  return <Portfolio posts={getPosts()} contributions={contributions} />;
}
