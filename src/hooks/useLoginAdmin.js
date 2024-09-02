import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import apiProvider from "../config/handleAPI";

const useLoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const loginAdmin = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await apiProvider.LoginAdmin(email, password);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.errorr) {
        throw new Error(data.errorr);
      }
      toast.success("Login successful");
      localStorage.setItem("AdminUser", JSON.stringify(data));
      setAuthUser(data);
      return true;
    } catch (error) {
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
