
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
        <main className="bg-gray-100">
          <Outlet />
        </main>
      <Footer />
    </>
  );
}

export default App;
