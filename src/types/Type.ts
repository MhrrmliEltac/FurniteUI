export interface ProductUserDataType {
  _id: string;
  itemId: ProductDataType;
  userId: string;
  viewedAt: string;
}

export type Dimensions = {
  width: string;
  height: string;
};

export interface ProductDataType {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  description: string;
  stock: number;
  colors: string[];
  structureColor: string[];
  material: string[];
  size: string[];
  images: string[];
  isPopular: boolean;
  isOnSale: boolean;
  dimensions: Dimensions;
  style: string[];
}

export interface CartProductType extends ProductDataType {
  quantity: number;
}

export interface CartItemProps {
  cartProduct: CartProductType[];
}

export interface showProps {
  isVisible?: boolean;
}
