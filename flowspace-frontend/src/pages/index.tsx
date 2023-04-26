import Image from 'next/image';
import Navbar from '@/Components/Navbar/Navbar';
import { useEffect } from 'react';
import { useUsers } from '@/hooks/User';
import { useAuth } from '@/Context/Context';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '@/services/user/api';

export default function Home() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJlbWFpbCI6Im1iZW50YWhlcjE5OThAZ21haWwuY29tIiwiaWF0IjoxNjgyNDQyODk3LCJleHAiOjE2ODI0NDM3OTd9.-WCi3kzV0b_vP8sbgn8q8DI7Rq90jUFNyQoWBLqAf2c';
      if (token) {
        const loggedUser = await getAuthenticatedUser(token);
        if (loggedUser) {
          console.log('reached');
          console.log('user', loggedUser);
          setUser(loggedUser);
        }
      }
    }

    if (!user) {
      fetchUser();
    }
  }, []);

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
