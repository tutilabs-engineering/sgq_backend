class Attribute {
  id?: string;
  question: string;
  attention: boolean;
  is_enabled: boolean;
  fk_product_ana?: string;
  created_at?: Date;
  updatedAt?: Date;
}

export { Attribute };
