import { useContext, useEffect, useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import api from "../api/api";
import { isAxiosError } from "axios";
import Products from "../components/Products";
import Navigation from "../components/Navigation";
import { UserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

function AdminProducts() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

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

  function onProductDelete(id: number) {
    api
      .delete(`/admin/api/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${userContext?.token}`,
        },
      })
      .then(res => {
        getProducts();
      });
  }

  function onUpdateProduct(id: number) {
    navigate(`/admin/edit-product/${id}`);
  }

  return (
    <main className='min-h-screen bg-orange-100'>
      <Navigation />
      <ul>
        {products.map(prod => {
          return (
            <li className='mb-12'>
              <div className='shadow-lg bg-white px-8 py-4 max-w-3xl mx-auto flex items-center justify-between'>
                <img
                  className='w-32 h-32 object-cover'
                  src={`http://localhost:3000/uploads/${prod.image}`}
                  alt=''
                />
                <div>
                  <h2>{prod.title}</h2>
                </div>
                <div className='flex gap-3'>
                  <button
                    className='px-3 py-1 bg-red-300 font-bold'
                    onClick={() => onProductDelete(prod.id)}
                  >
                    Delete
                  </button>
                  <button
                    className='px-3 py-1 bg-green-500 font-bold'
                    onClick={() => onUpdateProduct(prod.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default AdminProducts;
