import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosConfig";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./features/auth/authSlice";
import { AppDispatch } from "./store/store";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const fetchUserDetails = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/user-detail");

      if (response.data.success) {
        dispatch(setUserDetails(response.data.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="bg-white/80">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
