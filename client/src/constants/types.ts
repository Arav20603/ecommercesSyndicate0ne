export interface Category {
  category: string
  _id: string,
  name: string,
  description: string,
  image: string
}

export interface CreateCategoryProps {
  name: string
  description: string
  image: string
}

export interface CreateCategoryState {
  newData: CreateCategoryProps,
  isCreating: boolean
  error: null | any
}

export interface ProductStateProps {
  items: ProductProps[],
  loading: boolean;
  error: any | null
}

export interface ProductProps {
  _id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  category: string,
  count: number
}

export interface UserProps {
  name: string,
  email: string,
  phoneNo: number
}

export interface UserStateProps {
  items: UserProps | null,
  loading: boolean,
  error: null | any;
}