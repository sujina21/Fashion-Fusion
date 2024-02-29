import { useEffect, useState } from "react";
import api from "../api/api";
import { isAxiosError } from "axios";
import Products from "../components/Products";
import Navigation from "../components/Navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const res = await api.get("/api/products/all");
      const products = await res.data;
      console.log(products);
      setProducts(products);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e.response);
      }
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className='min-h-screen bg-slate-200 bg-background'>

      <Navigation />
      <Products products={products} />
    </main>
  );
}

export default AllProducts;
