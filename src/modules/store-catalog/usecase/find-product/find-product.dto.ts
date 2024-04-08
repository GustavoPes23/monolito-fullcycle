export interface FindProductInputDto {
  readonly id: string;
}

export interface FindProductOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
