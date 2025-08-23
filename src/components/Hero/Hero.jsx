
export default function Hero() {
  return (
    <section className="bg-gray-100 py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
          Welcome to T-Shirt Prints
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Print your imagination. Wear your passion.
        </p>
        <button className="cursor-pointer mt-8 bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-accent/80 transition duration-1000">
          Get Started
        </button>
      </div>
    </section>
  );
}
