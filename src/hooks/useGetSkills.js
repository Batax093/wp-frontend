import { useEffect, useState, useCallback } from "react";

const useGetSkills = () => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL

  const getSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}api/skills`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()).then((data) => console.log(data));
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
      throw new Error(error.message || "Something went wrong!");
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
