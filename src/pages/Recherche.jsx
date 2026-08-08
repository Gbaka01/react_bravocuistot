import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function Recherche() {
  const [recettes, setRecettes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/recette/all", {
          params: {
            search: search.trim(),
          },
          signal: controller.signal,
        });

        const data =
          response.data?.recettes ?? response.data;

        if (!Array.isArray(data)) {
          throw new Error(
            "Le serveur n'a pas renvoyé une liste de recettes."
          );
        }

        setRecettes(data);
      } catch (error) {
        const requestCancelled =
          error.name === "CanceledError" ||
          error.code === "ERR_CANCELED";

        if (!requestCancelled) {
          console.error(
            "Erreur de recherche :",
            error
          );

          if (error.response?.status === 404) {
            setError(
              "Route introuvable. Vérifiez l'adresse de l'API."
            );
          } else if (error.response?.status >= 500) {
            setError(
              "Le serveur rencontre une erreur."
            );
          } else if (!error.response) {
            setError(
              "Impossible de contacter le serveur. Vérifiez CORS et l'adresse de l'API."
            );
          } else {
            setError(
              error.response?.data?.message ||
                error.message ||
                "La recherche des recettes a échoué."
            );
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <main className="container py-5">
      <h1 className="mb-4 text-light">
        Rechercher une recette
      </h1>

      <div className="mb-4 text-light">
        <label
          htmlFor="search"
          className="form-label"
        >
          Mot-clé
        </label>

        <input
          id="search"
          type="search"
          className="form-control"
          placeholder="Exemple : poulet, salade, chocolat…"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      {loading && <p>Recherche en cours…</p>}

      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        recettes.length === 0 && (
          <div className="alert alert-info">
            Aucune recette trouvée.
          </div>
        )}

      {!loading && !error && (
        <div className="row g-4">
          {recettes.map((recette) => (
            <div
              className="col-md-6 col-lg-4"
              key={recette._id}
            >
              <article className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5">
                    {recette.fiche}
                  </h2>

                  <p>{recette.description3}</p>

                  {recette.category && (
                    <span className="badge bg-danger">
                      {recette.category.description2}
                    </span>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}