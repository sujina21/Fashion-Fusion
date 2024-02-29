import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { UserContext } from "../context/UserContextProvider";
import CartItem from "../components/CartItem";
import Navigation from "../components/Navigation";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

type Cart = {
  totalPrice: number;
  id: number;
  user: object;
};

type CItem = {
  id: number;
  quantity: number;
  cart: Cart;
  product: Product;
};

function CartPage() {
  const userContext = useContext(UserContext);
  const [cartItems, setCartItems] = useState<CItem[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getCartProducts(token: string) {
    setLoading(true);
    api
      .get("/getCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setCartItems(res.data);
        if (res.data.length > 0) {
          setTotal(res.data[0].cart.totalPrice);
        }
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        if (isAxiosError(e)) {
          console.log(e.response);
        }
        console.log(e);
        setError(true);
        setLoading(false);
      });
  }

  function deleteCartItem(prodId: number) {
    api
      .delete(`/api/cart/${prodId}`, {
        headers: {
          Authorization: `Bearer ${userContext?.token}`,
        },
      })
      .then(res => {
        console.log(res);
        if (userContext?.token) {
          getCartProducts(userContext?.token);
        }
      })
      .catch(e => {
        if (isAxiosError(e)) {
          console.log(e.response);
        }
      });
  }

  useEffect(() => {
    // console.log("Use effect inside cart page running");
    if (userContext?.token) {
      getCartProducts(userContext?.token);
    }
  }, [userContext?.token]);

  return (
    <main className='min-h-screen bg-slate-200 bg-background' >
      <Navigation />

      {loading && <h1 className='text-3xl mt-12 text-center'> Loading...</h1>}

      {!loading && !error && (
        <>
          {cartItems.length > 0 ? (
            <>
              <div className='mt-16'>
                {cartItems.map(item => {
                  return (
                    <CartItem
                      onItemDelete={deleteCartItem}
                      key={item.id}
                      item={item}
                    />
                  );
                })}
              </div>
              <h1 className='text-center mt-6 text-2xl font-bold'>
                Total Price
                <span className='ml-2 bg-red-400 px-3 py-2 text-white'>
                  Rs. {total}
                </span>
              </h1>
              <div className='text-center'>
                <Link to='/CheckoutConfirmation'> {/* Link to CheckoutConfirmation */}
                  <button className='mt-12 text-lg px-6 py-3 bg-green-300 font-bold'>
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className='mt-16'>
              <h1 className='font-semibold text-3xl text-center'>
                No Items to show. Go here to{" "}
                <Link to='/products/all' className=' font-normal underline'>
                  Add Items
                </Link>
              </h1>
            </div>
          )}
        </>
      )}
      {error && (
        <h1 className='text-3xl mt-12 text-center'>
          {" "}
          Error loading the cart. Please try again!
        </h1>
      )}
    </main>
  );
}

export default CartPage;
