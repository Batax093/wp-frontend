import Home from "./pages/home/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import { ParallaxProvider } from "react-scroll-parallax";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <ParallaxProvider>
        <div className="h-full flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/theemarloes" element={<AdminLogin />} />
          </Routes>
        </div>
      </ParallaxProvider>
    </>
  );
}

export default App;
