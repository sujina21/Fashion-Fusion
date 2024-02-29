import { AiFillMinusCircle } from "react-icons/ai";
import heroImg from "../assets/hero.png";
import api from "../api/api";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { isAxiosError } from "axios";

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

type CartItem = {
  id: number;
  quantity: number;
  cart: Cart;
  product: Product;
};

type Props = {
  item: CartItem;
  onItemDelete: (id: number) => void;
};

function CartItem(props: Props) {
  return (
    <div className='shadow-lg bg-white px-8 py-4 max-w-3xl mx-auto flex items-center justify-between mb-8'>
      <img
        className='w-32 h-32 object-cover object-top'
        src={`http://localhost:3000/uploads/${props.item.product.image}`}
        alt=''
      />
      <div>
        <h2 className='font-bold text-lg'>{props.item.product.title}</h2>
        <p className='font-bold'>x{props.item.quantity}</p>
      </div>
      <div>
        <button
          className='font-bold'
          onClick={() => {
            props.onItemDelete(props.item.product.id);
          }}
        >
          <AiFillMinusCircle size={30} color='red' />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
