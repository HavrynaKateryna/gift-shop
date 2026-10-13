import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getOccasionCollection } from "@/data/occasionData";

type Props = {
  params: Promise<{
    collection: string;
    product: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { collection: slug, product: productId } =
    await params;
  const collection = getOccasionCollection(slug);

  if (!collection) {
    notFound();
  }

  const product = collection.products.find(
    (item) => item.id === productId,
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FCFAF6] text-[#51453B]">
      <Header />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:py-20">
        <div
          className={`flex min-h-[420px] items-center justify-center bg-[#F0E4D4] p-8 digital-product-art--${product.design}`}
        >
          <div className="flex min-h-[300px] w-full max-w-sm flex-col items-center justify-center bg-[#FCFAF6] p-8 text-center shadow-sm">
            <span className="mb-6 text-4xl text-[#B9795F]">
              ✿
            </span>
            <span className="font-serif text-2xl">
              {product.label}
            </span>
            <span className="mt-8 text-sm italic text-[#817367]">
              Little Moments
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Link
            href={`/occasions/${collection.slug}`}
            className="mb-8 text-sm text-[#68745B] hover:text-[#B9795F]"
          >
            ← Back to {collection.title}
          </Link>

          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#68745B]">
            Digital download
          </p>

          <h1 className="font-serif text-4xl font-normal">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-5 leading-7 text-[#817367]">
            {product.description}
          </p>

          <div className="mt-8 border-y border-[#E8DED0] py-5 text-sm leading-7">
            <p>
              • Digital product — no physical item
              shipped
            </p>
            <p>
              • Designed for thoughtful moments
            </p>
            <p>• Printable file coming soon</p>
          </div>

          <button
            type="button"
            disabled
            className="mt-8 cursor-not-allowed bg-[#68745B] px-6 py-4 text-sm text-white opacity-70"
          >
            Coming soon
          </button>

          <p className="mt-3 text-xs leading-5 text-[#817367]">
            This product is not available to
            purchase yet.
          </p>
        </div>
      </section>
    </main>
  );
}
