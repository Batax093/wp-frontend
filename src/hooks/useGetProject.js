import { useEffect, useState, useCallback } from "react";

const useGetProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}api/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setProjects(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      throw new Error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return { loading, projects, getProjects };
};

export default useGetProjects;
