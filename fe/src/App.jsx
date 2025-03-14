import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <main className="py-[120px]">
          <Outlet />
        </main>

        <Footer/>
      </div>
    </>
  );
}

export default App;
