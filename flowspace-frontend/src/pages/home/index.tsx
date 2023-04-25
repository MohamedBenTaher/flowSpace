import Footer from "@/Components/Footer/Footer"
import Navbar from "@/Components/Navbar/Navbar"
import { GetServerSideProps } from "next"
function Homepage() {

  return (
    <>
    <Navbar/>
     <div className="h-screen">page</div>
     <Footer />
    </>
  )
}




export default Homepage