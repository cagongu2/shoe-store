import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function App() {
  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <main className="py-[120px]">
          <Outlet />
        </main>

        <footer>Footer</footer>
      </div>
    </>
  );
}

export default App;
