import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/Components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <><Navbar />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="">Home Page</div>
    </main></>
  )
}
