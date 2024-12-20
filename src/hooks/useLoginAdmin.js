import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL

  const loginAdmin = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json();
      console.log('asd', data)
      if (data.errorr) {
        throw new Error(data.errorr);
      }
      login(data.data.token);
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.log(error)
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, loginAdmin };
};

export default useLoginAdmin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
