import Image from 'next/image';
import Navbar from '@/Components/Navbar/Navbar';
import { useEffect } from 'react';
import { useUsers } from '@/hooks/User';
import { useAuth } from '@/Context/Context';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '@/services/user/api';
import { log } from 'console';

export default function Home() {
  const { user, setUser } = useAuth();


    if (!user) {
     const user =useQuery(['user'], () => getAuthenticatedUser());
     console.log(user.data)
     setUser(user.data)
    }
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">Home Page</div>
        <div>{user?.email}</div>
      </main>
    </>
  );
}
