import { notFound } from "next/navigation";
import Header from "@/components/Header";
import OccasionCollectionPage from "@/components/OccasionCollectionPage";
import {
  getOccasionCollection,
  occasionCollections,
} from "@/data/occasionData";

type Props = {
  params: Promise<{
    collection: string;
  }>;
};

export function generateStaticParams() {
  return occasionCollections.map(
    (collection) => ({
      collection: collection.slug,
    }),
  );
}

export default async function CollectionPage({
  params,
}: Props) {
  const { collection: slug } = await params;
  const collection = getOccasionCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6]">
      <Header />
      <OccasionCollectionPage
        collection={collection}
      />
    </main>
  );
}
