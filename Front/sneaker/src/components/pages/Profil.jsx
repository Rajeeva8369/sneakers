import React, { useEffect, useState } from "react";

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

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
          method: "PUT",
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
        setFormData({ username: data.username, email: data.email });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      setError("");

      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token JWT manquant. Veuillez vous connecter.");
      }

      const response = await fetch("http://localhost:1337/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil.");
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      setError(err.message);
    }
  };

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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-center text-white">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold">
            {userData?.username ? userData.username.charAt(0).toUpperCase() : "?"}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{userData?.username || "Nom non spécifié"}</h2>
          <p className="text-sm text-gray-200">{userData?.email || "Email non spécifié"}</p>
        </div>

        <div className="p-6 space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {!isEditing && (
          <div className="p-6 text-center">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700"
            >
              Modifier le profil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
