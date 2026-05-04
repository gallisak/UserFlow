import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="flex justify-center gap-6 p-6 border-gray-900 border-b-2">
      <NavLink
        to="/edit"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#C4C4C4]" : "bg-[#ffffff]"
          } border-2 border-[#C4C4C4] text-[14px] px-28 py-3.5 hover:bg-[#C4C4C4] transition-colors`
        }
      >
        Edit Users
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#C4C4C4]" : "bg-[#ffffff]"
          } border-2 border-[#C4C4C4] text-[14px] px-28 py-3.5 hover:bg-[#C4C4C4] transition-colors`
        }
      >
        Users
      </NavLink>
    </nav>
  );
};
