import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
};

function HighlightCard(props: Props) {
  return (
    <>
      <div className='py-48 bg-info-men bg-center bg-no-repeat bg-black bg-blend-overlay bg-opacity-50 bg-cover flex items-center justify-center hover:bg-opacity-0 transition-all duration-700'>
        <h2 className='font-semibold bg-white px-8 py-3 text-xl letter tracking-wide cursor-pointer '>
          <Link to={"/products/men"}>MEN</Link>
        </h2>
      </div>
      <div className='py-48 bg-info-women bg-center bg-no-repeat bg-black bg-blend-overlay bg-opacity-50 bg-cover flex justify-center items-center hover:bg-opacity-0 transition-all duration-700'>
        <h2 className='font-semibold bg-white px-8 py-3 text-xl letter tracking-wide cursor-pointer'>
          <Link to={"/products/women"}> WOMEN </Link>
        </h2>
      </div>
    </>
  );
  // return (
  //   <div>
  //     <h1>{props.title}</h1>
  //     <div>
  //       <p className='font-bold'>{props.title}</p>
  //       <p className=' uppercase'>price 20% off</p>
  //       <p>DISCOUNT CODE - VATR3920</p>
  //     </div>
  //   </div>
  // );
}

export default HighlightCard;
