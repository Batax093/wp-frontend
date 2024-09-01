import { useState } from "react";
import toast from "react-hot-toast";

const usePostProject = () => {
  const [loading, setLoading] = useState(false);

  const postProject = async ({ title, description, image, github }, resetForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
