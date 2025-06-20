import Discography from "@/app/components/discography/discography";
import DiscographySkeleton from "@/app/components/discography/skeleton";
import { Suspense } from "react";

type DiscographyPageProps = {
  params: Promise<{ artist: string }>;
  searchParams: Promise<{ page?: string }>;
};

async function DiscographyPage(props: DiscographyPageProps) {
  const { artist } = await props.params;
  const { page } = await props.searchParams;

  return (
    <main className="content-wrapper px-5 py-6 xl:px-0">
      <Suspense fallback={<DiscographySkeleton />}>
        <Discography artistName={artist} page={page} />
      </Suspense>
    </main>
  );
}

export default DiscographyPage;
