import React, { useEffect, useState } from "react";

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("Token JWT manquant. Veuillez vous connecter.");
        }

        const response = await fetch("http://localhost:1337/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations utilisateur.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-lg font-semibold text-blue-600">Chargement...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500 text-lg font-semibold">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Mon Profil</h1>
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-white p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">
              {userData?.username ? userData.username.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData?.username || "Nom non spécifié"}
              </h2>
              <p className="text-gray-500 text-lg">{userData?.email || "Email non spécifié"}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm font-medium text-gray-500">Créé le</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(userData?.createdAt).toLocaleDateString() || "Non disponible"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm font-medium text-gray-500">Dernière mise à jour</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(userData?.updatedAt).toLocaleDateString() || "Non disponible"}
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition">
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
