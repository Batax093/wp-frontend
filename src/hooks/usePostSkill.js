import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const usePostSkill = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL

  const postSkill = async ({ name, icon, description }, resetForm, callback) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/skills/add-skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, icon, description }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Skill added successfully!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (callback) {callback}
    } catch (error) {
      throw new Error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return { loading, postSkill };
};

export default usePostSkill;
