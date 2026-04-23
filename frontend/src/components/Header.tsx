import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <header className="text-end">
      <button
        onClick={toggleTheme}
        className="text-black dark:text-white cursor-pointer pt-5 pr-5"
      >
        {theme === "dark" ? <Sun size={30} className="hover:text-yellow-500 transition" /> : <Moon size={30} className="hover:text-blue-500 transition" />}
      </button>
      <h1 className="text-center text-black dark:text-white text-3xl font-semibold">My Tasks</h1>
    </header>
  );
};

export default Header;
