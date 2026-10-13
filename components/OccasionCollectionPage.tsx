import Link from "next/link";
import type { OccasionCollection } from "@/data/occasionData";
import "./OccasionCollection.css";

type Props = {
  collection: OccasionCollection;
};

export default function OccasionCollectionPage({
  collection,
}: Props) {
  return (
    <section className="collection-page">
      <div className="collection-hero">
        <Link
          href="/occasions"
          className="collection-back"
        >
          ← All occasions
        </Link>

        <p className="collection-eyebrow">
          {collection.eyebrow}
        </p>

        <h1>{collection.title}</h1>

        <p className="collection-intro">
          {collection.intro}
        </p>
      </div>

      <div className="collection-content">
        <div className="collection-heading">
          <h2>Explore the collection</h2>
          <p>{collection.description}</p>
        </div>

        <div className="collection-grid">
          {collection.products.map(
            (product, index) => (
              <article
                className="digital-product"
                key={product.id}
              >
                <div
                  className={`digital-product-art digital-product-art--${product.design}`}
                >
                  <div className="digital-product-paper">
                    <span className="digital-product-flower">
                      {index === 0
                        ? "✿"
                        : index === 1
                          ? "♡"
                          : "❀"}
                    </span>

                    <span className="digital-product-label">
                      {product.label}
                    </span>

                    <span className="digital-product-brand">
                      Little Moments
                    </span>
                  </div>

                  <span className="digital-product-tag">
                    Digital
                  </span>
                </div>

                <div className="digital-product-info">
                  <h3>
                    <Link
                      href={`/occasions/${collection.slug}/${product.id}`}
                      className="hover:text-[#B9795F]"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p>{product.description}</p>

                  <div className="digital-product-footer">
                    <span className="digital-product-price">
                      ${product.price.toFixed(2)}
                    </span>

                    <span className="digital-product-status">
                      Coming soon
                    </span>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>

        <div className="collection-bottom">
          <p>
            Made with care for life’s little
            moments.
          </p>

          <Link href="/occasions">
            Explore other occasions →
          </Link>
        </div>
      </div>
    </section>
  );
}
