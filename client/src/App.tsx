import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosConfig";

function App() {
  const fetchUserDetails = async () => {
    const response = await axiosInstance.get("/user-detail");
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="bg-white/80 p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
