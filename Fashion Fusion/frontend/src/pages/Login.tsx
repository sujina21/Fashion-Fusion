import React, { ChangeEvent, FormEvent, useState } from "react";
import user from "../assets/user.svg";
import lock from "../assets/lock.svg";
import mail from "../assets/email.svg";

import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import useAuthentication from "../hooks/useAuthentication";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUrl } = useAuthentication();

  const navigate = useNavigate();

  function emailChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function loginHandler(e: FormEvent) {
    e.preventDefault();

    const userInfo = { email: email, password: password };
    loginUrl(userInfo);
  }

  return (
    <main className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://social.massimodutti.com/paper/wp-content/uploads/2023/05/OP_08.jpg')` }}>
      <h1 className='uppercase font-bubble font-black text-center pt-24 text-4xl'>
        Fashion Fusion.
      </h1>
      <form
        method='post'
        className='flex flex-col justify-center items-center mt-16 space-y-5'
        onSubmit={loginHandler}
      >
        <div className='bg-primary flex focus-within:border-black focus-within:border-2 border'>
          <img src={mail} alt='' className='ml-6' />
          <input
            placeholder='Email'
            onChange={emailChangeHandler}
            type='text'
            className='bg-transparent outline-none px-12 py-4 w-full'
          />
        </div>
        <div className='bg-primary flex focus-within:border-black focus-within:border-2 border'>
          <img src={lock} alt='' className='ml-6' />
          <input
            placeholder='Password'
            onChange={passwordChangeHandler}
            type='password'
            className='bg-transparent py-4 px-12 w-full outline-none'
          />
        </div>
        <button className='uppercase bg-black font-semibold text-white px-8 py-3'>
          Log in
        </button>
      </form>
      <div className='text-center mt-8'>
  <div className="flex items-center justify-center">
    <div className="bg-white rounded-full px-4 py-2 mr-2">
      <p className="m-0">Don't have an account?</p>
    </div>
    <div className="bg-white rounded-full px-4 py-2">
      <span className='underline text-Black-400 cursor-pointer'>
        <Link to={"/signup"} className="font-bold">Signup</Link>
      </span>
    </div>
  </div>
</div>

    </main>
  );
}

export default Login;
