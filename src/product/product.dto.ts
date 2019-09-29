export interface CreateProductDTO{
  title: string;
  description: string;
  image: string;
  price: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
