import React from "react";
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <main className="min-h-screen bg-[#FAF9F6] flex justify-center items-center">
      <section className="text-center">
        <h1 className=" font-bold text-[8rem] animate-bounce">🎅</h1>
        <p className="font-semibold text-xl">Whoops... 404 Page Not Found !!!</p>
        <p className="mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to='/'>
          <button className="mt-5 px-8 py-3 bg-black text-white font-bold tracking-wider transition duration-300 rounded-md border border-black hover:bg-transparent hover:text-black">
            Go home
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Notfound;
