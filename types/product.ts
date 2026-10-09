export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  occasions: string[];
  featured?: boolean;
}
