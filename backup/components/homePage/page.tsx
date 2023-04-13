import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"
import withAuth from "@/services/Authentication/withAuth"
function Homepage() {
  return (
    <>
    <Navbar/>
     <div className="h-screen">page</div>
     <Footer />
    </>
  )
}

export default withAuth(Homepage)