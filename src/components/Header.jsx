import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const { authUser, logout } = useAuthContext();

  const handleLogout = async () => {
    logout();
    toast.success("You have successfully logged out");
  };

  return (
    <header id="header" className="flex w-full justify-between mt-10 flex-row gap-5 text-xl">
      <div className="ml-10">
        <a className="text-bluePastel transition-colors duration-300 cursor-pointer">Fredrik</a>
      </div>
      <div className="mr-10">
        <a className="text-black transition-colors duration-300 cursor-pointer">Pakpahan</a>
      </div>
      {authUser && (
        <button
          onClick={handleLogout}
          disabled={!authUser}
          className="flex items-center text-black hover:text-customYellow transition-colors duration-300 mr-10">
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
