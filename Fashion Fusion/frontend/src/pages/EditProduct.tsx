import React, { FormEvent, useContext, useEffect, useState } from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { isAxiosError } from "axios";
import { UserContext } from "../context/UserContextProvider";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

function EditProduct() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const params = useParams();

  const prodId = params.id;
  console.log(prodId);

  useEffect(() => {
    api
      .get(`/api/products/${prodId}`)
      .then(res => {
        console.log(res.data);
        setPrice(res.data.price);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setId(res.data.id);
      })
      .catch(e => {
        if (isAxiosError(e)) {
          console.log(e.response);
        }
      });
  }, []);

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
  }

  function onPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
  }

  function onDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setDescription(value);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0] || null;
    setImage(file);
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    api
      .patch(`/admin/api/products/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${userContext?.token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        navigate(-1);
      })
      .catch(e => {
        if (isAxiosError(e)) {
          console.log(e.response);
        }
      });
  };

  return (
    <main className='min-h-screen bg-slate-200'>
      <form
        className='w-3/4 md:max-w-3xl mx-auto flex flex-col gap-4 px-8 sm:px-16 py-8 rounded-lg'
        onSubmit={handleFormSubmit}
      >
        <input type='hidden' name='id' value={id} />
        <div className='flex flex-col'>
          <label htmlFor='title'>Product Title</label>
          <input
            onChange={onTitleChange}
            value={title}
            className=' rounded-md px-3 py-1 outline-none'
            type='text'
            name='title'
            id='title'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='price'>Product Price</label>
          <input
            onChange={onPriceChange}
            value={price}
            className=' rounded-md px-3 py-1 outline-none'
            type='number'
            name='price'
            id='price'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='image'>Product Image</label>
          <input
            onChange={onFileChange}
            className=' rounded-md px-3 py-1 outline-none'
            type='file'
            name='image'
            id='image'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='description'>Product Description</label>
          <textarea
            value={description}
            onChange={onDescriptionChange}
            className=' rounded-md px-3 py-1 outline-none'
            name='description'
            id='description'
            cols={20}
            rows={10}
          ></textarea>
        </div>
        <div className='text-center'>
          <button className='px-4 py-2 bg-green-900 text-white font-bold font-accent rounded-md'>
            Update Product
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditProduct;
