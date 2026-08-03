import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
  const navigate = useNavigate();

  const [nom, setNom] = useState(() => localStorage.getItem("nom"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nom");

    setNom(null);
    setToken(null);

    navigate("/login");
  }

  return (
    <section className="container py-5">
      <h1 className="mb-3 text-light">Accueil</h1>

      <h2 className="h4 mb-4 text-light">
        Bienvenue sur le site de partage de recettes Bravo Cuistot
      </h2>

      {token && nom ? (
        <div className="alert alert-success">
          <p>
            Bonjour, <strong>{nom}</strong> 👋 Vous êtes connecté sur le site
            de partage de recettes Bravo Cuistot.
          </p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div className="alert alert-info">
          <p>Connectez-vous pour publier et partager vos recettes.</p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </button>
        </div>
      )}
    </section>
  );
}
