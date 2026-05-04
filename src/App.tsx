import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <nav className="flex justify-center gap-6 p-6 border-gray-900 border-b-2">
          <NavLink
            to="/edit"
            className={({ isActive }) =>
              `${
                isActive ? "bg-[#C4C4C4]" : "bg-[#ffffff]"
              } border-2 border-[#C4C4C4] text-[14px] px-28 py-3.5 hover:text-blue-600 transition-colors`
            }
          >
            Edit Users
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${
                isActive ? "bg-[#C4C4C4]" : "bg-[#ffffff]"
              } border-2 border-[#C4C4C4] text-[14px] px-28 py-3.5 hover:text-blue-600 transition-colors`
            }
          >
            Users
          </NavLink>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/edit" element={<EditUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
