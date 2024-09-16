
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
        <main className="bg-white/80 p-4">
          <Outlet />
        </main>
      <Footer />
    </>
  );
}

export default App;
