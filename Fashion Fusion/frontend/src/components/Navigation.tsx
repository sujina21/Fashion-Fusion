import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { UserContext } from "../context/UserContextProvider";

function Navigation() {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const userContext = useContext(UserContext);

  function navToggle() {
    setNavOpen(prev => !prev);
  }

  return (
    <header className='container flex justify-between py-2 items-center'>
      <h1 className='text-5xl font-bubble'>
        <NavLink to='/home'>Fashion Fusion</NavLink>
      </h1>
      <nav className='hidden md:flex'>
        <ul className='flex items-center gap-4 text-xl'>
          <li className='cursor-pointer'>
            <NavLink to='/products/all'> All Products</NavLink>
          </li>
          <li className='cursor-pointer'>
            <NavLink to='/products/men'> Men </NavLink>
          </li>
          <li className='cursor-pointer'>
            <NavLink to='/products/women'>Women</NavLink>
          </li>
          <li className='cursor-pointer'>
           <Link to='/user/profile'>User Profile</Link>
           </li>
        </ul>
      </nav>
      <nav
        className={`flex justify-center items-center md:hidden fixed inset-0 bg-orange-100 z-10  ${
          navOpen ? "translate-y-0" : "-translate-y-full"
        } duration-300 ease-in`}
      >
        <ul className='flex flex-col items-center gap-4 text-2xl'>
          <li className='cursor-pointer'>
            <NavLink to='/products/all'> All Products</NavLink>
          </li>
          <li className='cursor-pointer'>
            <NavLink to='/products/men'> Men </NavLink>
          </li>
          <li className='cursor-pointer'>
            <NavLink to='/products/women'>Women</NavLink>
          </li>
          <li className='cursor-pointer'>Sale</li>
        </ul>
      </nav>

      <div className='flex items-center gap-2'>
        <div className='mr-4'>
          {userContext?.isAuth ? (
            userContext.role === "ROLE_ADMIN" ? (
              <div
                className='bg-black text-white rounded-md px-4 py-2 flex items-center gap-2 cursor-pointer'
                onClick={() => {
                  navigate("/admin");
                }}
              >
                <AiOutlineUser size={24} />
                <p className='bg-white text-black px-1 rounded-full'>Admin</p>
              </div>
            ) : (
              <div
                className='bg-black text-white rounded-md px-4 py-2 flex items-center gap-2 cursor-pointer'
                onClick={() => {
                  navigate("/user/cart");
                }}
              >
                <AiOutlineShoppingCart size={24} />
                <p>Cart</p>
              </div>
            )
          ) : (
            <button className='bg-black text-white px-2 py-1 rounded-lg'>
              <Link to='/login'>LOGIN</Link>
            </button>
          )}
        </div>
        {userContext?.isAuth ? (
          <div>
            <button
              className='bg-red-900 text-white px-3 py-2 rounded-md font-bold'
              onClick={userContext.logoutUser}
            >
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
        <div className='md:hidden'>
          <button className='md:hidden' onClick={navToggle}>
            {navOpen ? (
              <AiOutlineClose
                size={24}
                className='cursor-pointer fixed top-5 right-5 z-20 text-black'
              />
            ) : (
              <AiOutlineMenu
                size={24}
                className='cursor-pointer absolute top-5 right-5 z-20'
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
