import React, { useContext, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { Product } from "./Products";
import api from "../api/api";
import { UserContext } from "../context/UserContextProvider";

type Props = {
  data: Product;
};

function Card(props: Props) {
  const userContext = useContext(UserContext);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage the visibility of the success message

  function addToCart(pid: number) {
    api
      .post(`/api/products/add-to-cart/${pid}`, {}, {
        headers: {
          Authorization: `Bearer ${userContext?.token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setShowSuccessMessage(true); // Show the success message when the request is successful
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide the success message after a delay
        }, 3000); // Hide after 3 seconds (adjust as needed)
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
      });
  }

  return (
    <div className='border border-grey-300 flex flex-col max-h-[500px] bg-white shadow-2xl'>
      <img
        className='object-cover object-top h-2/3'
        src={`http://localhost:3000/uploads/${props.data.image}`}
        alt=''
      />
      <div className='px-3 py-4'>
        <div className='flex justify-between font-medium text-lg'>
          <p>{props.data.title}</p>
        </div>
        <div className='flex justify-between mt-4'>
          <p className='font-bold text-xl'>Rs.{props.data.price}</p>
          <div className='flex items-center bg-black text-white justify-center px-2 py-1'>
            <MdOutlineAdd />
            <button
              onClick={() => {
                addToCart(props.data.id);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {/* Success message */}
      {showSuccessMessage && (
        <div className="bg-green-500 text-white text-center py-2">
          Successfully added to cart!
        </div>
      )}
    </div>
  );
}

export default Card;
