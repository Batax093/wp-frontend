import { useAuthContext } from "../context/AuthContext";
import { CgLogOut } from "react-icons/cg";
import useLogout from "../hooks/useLogout";
import toast from "react-hot-toast";

const Header = () => {
  const { authUser } = useAuthContext();
  const { logout, loading } = useLogout();

  const handleLogout = async () => {
    await logout();
    toast.success("You have successfully logged out");
  };

  return (
    <header className="flex items-center justify-between w-3/4 mt-10">
      <div className="flex items-center justify-center text-yellow-500">
        <h1 className="text-3xl">Fredrik Sahalatua Pakpahan</h1>
      </div>
      {authUser && (
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center text-white bg-yellow-500 p-2 rounded-md hover:bg-yellow-600"
        >
          <CgLogOut className="mr-2" />
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
