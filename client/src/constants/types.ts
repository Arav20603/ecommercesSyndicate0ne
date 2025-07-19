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
  image: string,
  category: string,
  count: number
}