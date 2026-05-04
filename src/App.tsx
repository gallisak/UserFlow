import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import { Header } from "./components/layout/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />

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
