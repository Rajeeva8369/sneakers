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
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl font-semibold">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl font-semibold">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
        Bienvenue {userData?.username || "Utilisateur"}
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-center text-white">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold">
            {userData?.username ? userData.username.charAt(0).toUpperCase() : "?"}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{userData?.username || "Nom non spécifié"}</h2>
          <p className="text-sm text-gray-200">{userData?.email || "Email non spécifié"}</p>
        </div>

        {/* Body section */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-sm font-medium text-gray-500">Créé le</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(userData?.createdAt).toLocaleDateString() || "Non disponible"}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-sm font-medium text-gray-500">Dernière mise à jour</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(userData?.updatedAt).toLocaleDateString() || "Non disponible"}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Email vérifié</p>
            <p className="text-lg font-semibold text-gray-800">
              {userData?.confirmed ? "Oui" : "Non"}
            </p>
          </div>
        </div>

        {/* Action section */}
        <div className="p-6 text-center">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition">
            Modifier le profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;

