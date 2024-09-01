import { useState } from "react";
import toast from "react-hot-toast";

const usePostContact = () => {
  const [loading, setLoading] = useState(false);

  const postContact = async (name, email, message, resetForm) => {
    const success = handleInputErrors(name, email, message);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/feedback/add-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Thank you for contacting me!");

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return { loading, postContact };
};

export default usePostContact;

function handleInputErrors(name, email, message) {
  if (!name || !email || !message) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
