import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <header className="bg-[#1a1a1a]">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo or title */}
        <h2 className="text-white text-lg font-semibold">Dashboard</h2>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="hidden md:inline-block rounded bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
