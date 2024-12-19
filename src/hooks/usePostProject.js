import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const usePostProject = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext()

  const postProject = async ({ title, description, image, github }, resetForm, callback) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/projects/add-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, image, github }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success("Project added successfully!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (callback) {callback}
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return { loading, postProject };
};

export default usePostProject;
