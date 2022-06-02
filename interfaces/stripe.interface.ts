export interface ResponseStrapi {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Product;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
