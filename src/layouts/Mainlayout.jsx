import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const Mainlayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background"> {/* ✅ use theme color */}
      <NavBar />
      <main className="flex-grow">
        <Outlet /> {/* renders the nested route component */}
      </main>
      <Footer />
    </div>
  );
};

export default Mainlayout;
