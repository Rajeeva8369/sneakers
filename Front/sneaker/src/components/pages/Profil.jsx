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

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <p className="text-lg">
          <strong>Nom d'utilisateur :</strong> {userData?.username || "Non spécifié"}
        </p>
        <p className="text-lg">
          <strong>Email :</strong> {userData?.email || "Non spécifié"}
        </p>
        <p className="text-lg">
          <strong>Créé le :</strong> {new Date(userData?.createdAt).toLocaleDateString() || "Non disponible"}
        </p>
        <p className="text-lg">
          <strong>Dernière mise à jour :</strong> {new Date(userData?.updatedAt).toLocaleDateString() || "Non disponible"}
        </p>
      </div>
    </div>
  );
};

export default Profil;
