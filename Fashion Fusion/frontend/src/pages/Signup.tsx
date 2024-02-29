import React, { ChangeEvent, FormEvent, useState } from "react";
import user from "../assets/user.svg";
import lock from "../assets/lock.svg";
import mail from "../assets/email.svg";
import phoneIcon from "../assets/telephone.svg";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const { addUser, error, message } = useSignup();

  function usernameChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function emailChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function phoneChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.target.value);
  }

  function signupHandler(e: FormEvent) {
    e.preventDefault();

    const userInfo = { username, email, password, phone_number };
    addUser(userInfo);
  }

  return (
    <main
      style={{
        backgroundImage: 'url("https://social.massimodutti.com/paper/wp-content/uploads/2023/05/OP_08.jpg")', // Add the background image URL here
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h1 className='uppercase font-bubble font-black text-center pt-24 text-4xl'>
        Fashion Fusion.
      </h1>
      <form
        className='flex flex-col justify-center items-center mt-16 space-y-5'
        onSubmit={signupHandler}
      >
        {error && <p className='text-center bg-red-300 px-4 py-2'>{message}</p>}
        <div className='bg-primary flex focus-within:border-black focus-within:border-2 border'>
          <img src={user} alt='' className='ml-6' />
          <input
            placeholder='Username'
            value={username}
            onChange={usernameChangeHandler}
            type='text'
            className='bg-transparent outline-none px-12 py-4 w-full'
          />
        </div>
        <div className='bg-primary flex focus-within:border-black focus-within:border-2 border'>
          <img src={mail} alt='' className='ml-6' />
          <input
            placeholder='Email'
            value={email}
            onChange={emailChangeHandler}
            type='text'
            className='bg-transparent outline-none px-12 py-4 w-full'
          />
        </div>
      
        <div className='bg-primary flex focus-within:border-black focus-within:border-2 border'>
          <img src={phoneIcon} alt='' className='mt-4 ml-4 h-6 w-6' /> 
          <input
            placeholder='Phone Number'
            value={phone_number}
            onChange={phoneChangeHandler}
            type='text'
            className='bg-transparent outline-none px-12 py-4 w-full'
          />
        </div>
        <div className='bg-primary flex focus-within:border-black focus-within:border-2 border'>
          <img src={lock} alt='' className='ml-6' />
          <input
            placeholder='Password'
            value={password}
            onChange={passwordChangeHandler}
            type='password'
            className='bg-transparent py-4 px-12 w-full outline-none'
          />
        </div>
      
        <button className='uppercase bg-black font-semibold text-white px-8 py-3'>
          Sign up
        </button>
      </form>
      <div className='text-center mt-8 flex items-center justify-center'>
  <div className="bg-white rounded-full px-4 py-2 mr-2">
    <p>Already have an account?</p>
  </div>
  <div className="bg-white rounded-full px-4 py-2">
    <span className='underline text-Black-400 cursor-pointer font-bold'>
      <Link to='/login'>LOGIN</Link>
    </span>
  </div>
</div>

    </main>
  );
}

export default Signup;
