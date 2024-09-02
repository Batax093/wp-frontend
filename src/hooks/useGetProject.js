import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const useGetProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        console.log(data);
        
        if (data.error) {
          throw new Error(data.error);
        }
        setProjects(data);
      } else {
        const text = await res.text(); 
        console.error("Received non-JSON response:", text);
        throw new Error("Invalid JSON response");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      toast.error(error.message);
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
