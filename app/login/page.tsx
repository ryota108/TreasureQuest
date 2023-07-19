"use client";
import { useUserStore } from "@/store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const logIn = useUserStore((state) => state.logIn);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => toast.error(err.toString()));
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
      <div className="flex flex-col justify-center items-center w-96 h-fit bg-slate-100 overflow-hidden box-border gap-8 pt-8 pb-8">
        <h1 className="text-2xl -top-20">Log In</h1>
        <form
          className="flex flex-col gap-8 -mt-5 w-full p-4"
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4"
            type="email"
            placeholder="Email"
          />
          <input
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
            Log In
          </button>
        </form>
        <div className="flex mt-2">
          <p className="text-sm">New user?</p>
          <Link
            className="text-sm underline pl-1 hover:text-blue-600"
            href={"/signup"}
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;