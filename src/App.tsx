import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <nav className="flex justify-center gap-6 p-6 border-gray-900 border-b-2">
          <Link
            to="/edit"
            className="bg-[#C4C4C4] text-[14px] px-28 py-3.5 hover:text-blue-600 transition-colors"
          >
            Edit Users
          </Link>
          <Link
            to="/users"
            className="bg-[#C4C4C4] text-[14px] px-28 py-3.5 hover:text-blue-600 transition-colors"
          >
            Users
          </Link>
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
