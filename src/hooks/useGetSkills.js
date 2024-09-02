import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const useGetSkills = () => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  const getSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://wp-backend-ashy.vercel.app/api/skill/get-skill", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setSkills(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  return { loading, skills, getSkills };
};

export default useGetSkills;
