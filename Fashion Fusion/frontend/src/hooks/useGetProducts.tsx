import { useState } from "react";
import api from "../api/api";
import { isAxiosError } from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const res = await api.get("/api/products/all");
      const products = await res.data;
      console.log(products);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e.response);
      }
      console.log(e);
    }
  };

  return { getProducts, products };
};

export default useGetProducts;
