import { useUserStore } from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import {toast} from "react-toastify";

type Props = {
    email:string,
}
function UserModal({email}: Props) {
  const router = useRouter();
    const logout = useUserStore(state => state.logout);
    const handleClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        logout().then(() => router.push("/login")).catch((err) => toast.error(err.toString()));
    }
  return (
    <div className='flex flex-col p-4 position: absolute bg-black  backdrop-blur-xl h-auto w-auto border border-gray-700 rounded-md -right-4 top-20 gap-2'>
    <h1 className='text-white'>{email}</h1>
      <button onClick={handleClick} className='text-white w-20 border text-sm p-2 m-auto rounded-md mt-2'>Log Out</button>
    </div>
  )
}

export default UserModal