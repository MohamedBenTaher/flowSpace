import Image from 'next/image';
import Navbar from '@/Components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useUsers } from '@/hooks/User';
import { useAuth } from '@/Context/Context';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '@/services/user/api';
import { log } from 'console';
import Posts from '@/Components/Post/Posts/Posts';
import NewPostForm from '@/Components/Post/Form/NewPostForm';
import NewPostHeader from '@/Components/Post/NewPostHeader/NewPostHeader';

export default function Home() {
  const { user, setUser } = useAuth();
  const [created,setCreated]=useState(false)

     const logedUser =useQuery(['user'], () => getAuthenticatedUser());
     console.log(logedUser.data)
     setUser(logedUser.data)
    return (
    <div className='bg-slate-100'>
      <Navbar />
      <main className="flex w-scren flex-col items-center justify-between p-4">
        <NewPostHeader/>
        <Posts />
      </main>
    </div>
  );
}
