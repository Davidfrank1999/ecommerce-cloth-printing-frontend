import heroImg from "../../assets/hero1.png";

export default function Hero() {
  return (
    <section
      className="relative bg-center bg-no-repeat bg-cover h-[75vh] flex items-center justify-center" 
      // 🔑 centered horizontally
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content → Center aligned */}
      <div className="relative max-w-2xl text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Welcome to T-Shirt Prints
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Print your imagination. Wear your passion.
        </p>
        <button className="cursor-pointer mt-8 bg-primary text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-accent/80 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
