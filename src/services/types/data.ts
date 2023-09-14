export type TIngredientItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  index?: number;
  amount?: number;
};

export type TUserInfo = {
  email: string;
  name: string;
  password?: string;
};

export type TOrder = {
  _id: string;
  number: string;
  createdAt: string;
  name: string;
  status: "created" | "pending" | "done";
  ingredients: string[] | Array<TIngredientItem>;
};
