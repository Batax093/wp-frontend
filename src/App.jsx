import Home from "./pages/home/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import { ParallaxProvider } from "react-scroll-parallax";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Toaster />
      <ParallaxProvider>
        <div className="h-full flex items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/theemarloes"
              element={ authUser ? <Navigate to="/" /> : <AdminLogin />}
            />
          </Routes>
        </div>
      </ParallaxProvider>
    </>
  );
}

export default App;
