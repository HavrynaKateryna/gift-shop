export interface GiftBox {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  productIds: string[];
  occasions: string[];
  featured?: boolean;
}
