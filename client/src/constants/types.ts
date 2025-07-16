export interface Category {
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