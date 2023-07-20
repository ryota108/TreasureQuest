"use client";
import { useUserStore } from "@/store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const register = useUserStore((state) => state.register);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, password, name, image).then((res) => {toast("Signed Up Successfully!");
    router.push('/login')
  }).catch((err) => toast.error(err.toString()));   
  };
  return (
    <div
      className="bg-fixed bg-no-repeat bg-cover bg-center h-screen w-screen flex justify-center items-center"
      style={{ backgroundImage: "url(background.jpg)" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col justify-center items-center w-96 h-fit bg-slate-100 overflow-hidden box-border gap-4 pt-8 pb-8">
        <h1 className="text-2xl">Sign Up</h1>
        <form
          className="flex flex-col gap-4 -mt-5 w-full p-4"
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4"
            type="text"
            placeholder="Name"
          />
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4"
            type="email"
            placeholder="Email"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="position: relative top-8 bg-blue-500 w-2/4 m-auto rounded-md p-3 text-yellow-100 hover:shadow-2xl hover:ring-1 border-none"
          >
            Sign Up
          </button>
        </form>
        <div className="flex mt-2">
          <p className="text-sm">Already a user?</p>
          <Link
            className="text-sm underline pl-1 hover:text-blue-600"
            href={"/login"}
          >
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;