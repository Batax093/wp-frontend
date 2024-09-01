import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginAdmin from "../../hooks/useLoginAdmin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, loginAdmin } = useLoginAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginAdmin(email, password);
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-3/5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 shadow-lg bg-yellow-500 rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-black">Admin Login</h2>
        <div>
          <label htmlFor="email" className="block text-black font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-black font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full bg-white hover:bg-yellow-300 text-white rounded-md border-none">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
