import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/layout/Footer"

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
