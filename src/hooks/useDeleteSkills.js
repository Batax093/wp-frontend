import { useState } from "react";
import toast from "react-hot-toast";
import slugify from "../utils/slugify";

const useDeleteSkills = () => {
    const [loading, setLoading] = useState(false);

    const deleteSkill = async (slug) => {
        setLoading(true);
        try {
            const normalizedSlug = encodeURIComponent(slugify(slug));
            const res = await fetch(`https://localhost:5000/api/skills/delete-skill/${normalizedSlug}`, {
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

            toast.success("Skill deleted successfully!");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            throw new Error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return { loading, deleteSkill };
}

export default useDeleteSkills;