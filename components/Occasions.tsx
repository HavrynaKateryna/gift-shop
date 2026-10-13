import Link from "next/link";
import "./occasions.css";
import { occasionCollections } from "@/data/occasionData";

const collectionStyles: Record<string, string> = {
  birthday: "birthday",
  "thank-you": "thank-you",
  "thinking-of-you": "thinking",
  "self-care": "self-care",
};

const collectionSymbols: Record<string, string> =
  {
    birthday: "✿",
    "thank-you": "♡",
    "thinking-of-you": "❀",
    "self-care": "✧",
  };

export default function Occasions() {
  return (
    <section className="occasions">
      <div className="occasions-hero">
        <p className="occasions-eyebrow">
          THE DIGITAL COLLECTION
        </p>

        <h1 className="occasions-title">
          Little Things,
          <br />
          <span>Meaningful Moments</span>
        </h1>

        <p className="occasions-description">
          Thoughtful cards and printables for
          life’s meaningful moments. Find
          something special, download, print, and
          share a little joy.
        </p>
      </div>

      <div className="occasions-content">
        <div className="occasions-heading">
          <h2>Find Something Meaningful</h2>
          <p>
            Little details can make the biggest
            difference.
          </p>
        </div>

        <div className="occasions-grid">
          {occasionCollections.map(
            (collection) => (
              <Link
                key={collection.slug}
                href={`/occasions/${collection.slug}`}
                className="occasion-card"
              >
                <div
                  className={`occasion-art occasion-art--${
                    collectionStyles[
                      collection.slug
                    ]
                  }`}
                >
                  <div className="occasion-art-frame" />

                  <div className="occasion-paper">
                    <span className="occasion-symbol">
                      {
                        collectionSymbols[
                          collection.slug
                        ]
                      }
                    </span>

                    <span className="occasion-label">
                      {collection.eyebrow}
                    </span>

                    <span className="occasion-art-title">
                      {collection.title}
                    </span>

                    <span className="occasion-divider" />

                    <span className="occasion-signature">
                      With love, Little Moments
                    </span>
                  </div>

                  <span className="occasion-digital-tag">
                    Digital
                  </span>
                </div>

                <div className="occasion-card-body">
                  <p className="occasion-category">
                    DIGITAL COLLECTION
                  </p>

                  <h2 className="occasion-card-title">
                    {collection.title}
                  </h2>

                  <p className="occasion-card-description">
                    {collection.description}
                  </p>

                  <div className="occasion-card-footer">
                    <span>
                      {collection.products.length}{" "}
                      designs
                    </span>
                    <span className="occasion-explore">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>

        <div className="occasions-note">
          <span className="occasions-note-symbol">
            ✧
          </span>
          <h2>
            A little something, made with love
          </h2>

          <p>
            Thoughtful digital gifts for
            birthdays, heartfelt thank-yous, and
            everyday moments worth celebrating.
          </p>

          <div className="occasions-note-features">
            <span>Digital designs</span>
            <span>Thoughtful details</span>
            <span>Made with love</span>
          </div>
        </div>
      </div>
    </section>
  );
}
