import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Footer from "./components/Footer";
import { AuthProvide } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvide>
        <div className="bg-gray-50">
          <Header />
          <main className="py-[120px]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvide>
    </>
  );
}

export default App;
