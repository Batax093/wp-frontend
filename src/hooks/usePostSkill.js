import { useState } from "react";
import toast from "react-hot-toast";

const usePostSkill = () => {
  const [loading, setLoading] = useState(false);

  const postSkill = async ({ name, icon }, resetForm) => {
    setLoading(true);
    try {
      const res = await fetch("https://wp-backend-ashy.vercel.app/api/skill/add-skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, icon }),
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
