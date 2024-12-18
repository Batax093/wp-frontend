import { useState } from "react";
import toast from "react-hot-toast";
import slugify from "../utils/slugify";

const useDeleteProject = () => {
    const [loading, setLoading] = useState(false);

    const deleteProject = async (slug) => {
        setLoading(true);
        try {
            const normalizedSlug = encodeURIComponent(slugify(slug));
            console.log('asd, ',normalizedSlug)
            const res = await fetch(`http://localhost:5000/api/projects/delete-project/${normalizedSlug}`, {
                method: "DELETE",
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

            toast.success("Project deleted successfully!");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            throw new Error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return { loading, deleteProject };
}

export default useDeleteProject;