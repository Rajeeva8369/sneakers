import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative isolate px-6 pt-32 pb-16 lg:px-8 lg:pt-48 lg:pb-32">
        
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

       
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 sm:text-8xl drop-shadow-lg">
            Découvrez le Luxe <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">By Rajeeva</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 sm:text-xl">
            Explorez notre collection de sacs luxueux, fabriqués avec les matériaux les plus raffinés et un savoir-faire
            exceptionnel.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-pink-400 transition"
            >
              Explorer la Collection
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="rounded-full border-2 border-gray-300 px-8 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                Créer un Compte
              </Link>
            )}
          </div>
        </div>

        
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
};

export default Home;
