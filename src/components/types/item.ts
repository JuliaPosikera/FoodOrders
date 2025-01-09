export type MealType = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type CartItemType = MealType & {
  quantity: number; // Adds the `quantity` field to MealType
};
