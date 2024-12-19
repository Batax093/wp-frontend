import { useState } from "react";
import toast from "react-hot-toast";
import slugify from "../utils/slugify";
import { useAuthContext } from "../context/AuthContext";

const useDeleteSkills = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useAuthContext();

    const deleteSkill = async (slug, callback) => {
        setLoading(true);
        try {
            const normalizedSlug = encodeURIComponent(slugify(slug));
            const res = await fetch(`http://localhost:5000/api/skills/delete-skill/${normalizedSlug}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
            if (callback) {callback}
        } catch (error) {
            throw new Error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return { loading, deleteSkill };
}

export default useDeleteSkills;