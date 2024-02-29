import React from "react";
import Card from "./Card";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

type Props = {
  products: Product[];
};

function Products(props: Props) {
  return (
    <div className='mt-6 grid grid-cols-responsive gap-2 container'>
      {props.products.map(prod => {
        return <Card key={prod.id} data={prod} />;
      })}
    </div>
  );
}

export default Products;
