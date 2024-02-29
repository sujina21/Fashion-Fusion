import React, { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import api from "../api/api";
import { isAxiosError } from "axios";
import Navigation from "../components/Navigation";
import { FaRegEdit } from "react-icons/fa";

function UserProfile() {
  const userContext = useContext(UserContext);

  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [newPass, setNewPass] = useState("");
  const [username, setUsername] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  function getUser(token: string) {
    api
      .get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setId(res.data.id);
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .catch(e => {
        if (isAxiosError(e)) {
          console.log(e.response);
        }
        console.log(e);
      });
  }

  useEffect(() => {
    if (userContext?.token) {
      getUser(userContext.token);
    }
  }, [userContext?.token]);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setNewPass(val);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setUsername(val);
  }

  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setPhoneNumber(val);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: newPass,
      phone_number: phone_number,
    };

    api.patch(`/api/user/profile/update/${id}`, user, {
      headers: {
        Authorization: `Bearer ${userContext?.token}`,
      },
    });
  }

  return (
    <main className="bg-background" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/paper-background_53876-147734.jpg')" }}>
      <Navigation />
      <h1 className='font-bold text-3xl text-center mt-8'>User Profile</h1>
      <div className='container mt-12 font-bold'>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
          }}
          type='button'
          className='flex items-center gap-2'
        >
          <span>Edit</span>
          <FaRegEdit />
        </button>
      </div>
      <form
        className='flex flex-col gap-6 border-black border-2 mt-4 px-6 py-8 container'
        onSubmit={handleFormSubmit}
      >
        <div className='flex flex-col '>
          <label htmlFor='username'>Username</label>

          <input
            disabled={!isEditing}
            onChange={handleUsernameChange}
            value={username}
            className={`${
              isEditing ? "bg-slate-200" : "bg-slate-400"
            }  px-4 py-2 ${isEditing ? "" : " cursor-not-allowed"}`}
            type='text'
            name='username'
          />
        </div>
        <div className='flex flex-col '>
          <label htmlFor='email'>Email</label>

          <input
            disabled={!isEditing}
            onChange={handleEmailChange}
            value={email}
            className={`${
              isEditing ? "bg-slate-200" : "bg-slate-400"
            }  px-4 py-2 ${isEditing ? "" : " cursor-not-allowed"}`}
            type='email'
            name='email'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>New Password</label>

          <input
            disabled={!isEditing}
            onChange={handlePasswordChange}
            value={newPass}
            className={`${
              isEditing ? "bg-slate-200" : "bg-slate-400"
            }  px-4 py-2 ${isEditing ? "" : " cursor-not-allowed"}`}
            type='password'
            name='password'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='phone_number'>Phone Number</label>

          <input
            disabled={!isEditing}
            onChange={handlePhoneNumberChange}
            value={phone_number}
            className={`${
              isEditing ? "bg-slate-200" : "bg-slate-400"
            }  px-4 py-2 ${isEditing ? "" : " cursor-not-allowed"}`}
            type='text'
            name='phone_number'
          />
        </div>
        <div className='text-center'>
          <button
            disabled={!isEditing}
            className={` font-bold px-3 py-1 ${
              isEditing ? "bg-red-900 text-white" : "cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      </form>
    </main>
  );
}

export default UserProfile;
