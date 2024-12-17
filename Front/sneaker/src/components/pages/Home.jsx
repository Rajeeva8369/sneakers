import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      

      <div className="relative isolate px-6 pt-32 pb-16 lg:px-8 lg:pt-48 lg:pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 sm:text-7xl">
            Découvrez le Luxe <em>By Rajeeva</em> 
          </h1>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Explorez notre collection de sacs luxueux, fabriqués avec les matériaux les plus raffinés et un savoir-faire exceptionnel.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/products"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition"
            >
              Explorer la Collection
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-300 transition"
            >
              Créer un Compte
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-20rem]"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
