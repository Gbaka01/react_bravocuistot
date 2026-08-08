import { useEffect, useState } from "react";
import api from "../lib/axios";
import "../css/accueil.css";

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  "https://node-bravocuistot-2.onrender.com";

const DEFAULT_IMAGE = "/images/recette-default.jpg";

function getImageUrl(image) {
  if (!image || typeof image !== "string") {
    return DEFAULT_IMAGE;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const cleanServerUrl = SERVER_URL.replace(/\/+$/, "");
  const cleanImagePath = image.replace(/^\/+/, "");

  if (cleanImagePath.startsWith("uploads/")) {
    return `${cleanServerUrl}/${cleanImagePath}`;
  }

  return `${cleanServerUrl}/uploads/${cleanImagePath}`;
}

function getRecetteIdFromNote(note) {
  if (!note?.recetty) {
    return null;
  }

  // recetty contient une recette peuplée
  if (
    typeof note.recetty === "object" &&
    note.recetty._id
  ) {
    return String(note.recetty._id);
  }

  // recetty contient directement un ObjectId
  return String(note.recetty);
}

function getErrorMessage(error) {
  const responseData = error.response?.data;

  if (typeof responseData === "string") {
    return responseData;
  }

  if (typeof responseData?.message === "string") {
    return responseData.message;
  }

  if (typeof error.message === "string") {
    return error.message;
  }

  return "Une erreur inattendue est survenue.";
}

export default function Recettes() {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notesError, setNotesError] = useState("");
  const [showScrollTop, setShowScrollTop] =
    useState(false);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    let componentMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        setNotesError("");

        /*
         * allSettled permet de continuer à afficher
         * les recettes même si /note/all échoue.
         */
        const [recettesResult, notesResult] =
          await Promise.allSettled([
            api.get("/recette/all"),
            api.get("/note/all"),
          ]);

        if (recettesResult.status === "rejected") {
          throw recettesResult.reason;
        }

        const recettesResponse =
          recettesResult.value;

        const recettesData =
          recettesResponse.data?.recettes ??
          recettesResponse.data;

        if (!Array.isArray(recettesData)) {
          throw new Error(
            "Le format des recettes est invalide."
          );
        }

        let notesData = [];

        if (notesResult.status === "fulfilled") {
          const notesResponse = notesResult.value;

          const receivedNotes =
            notesResponse.data?.notes ??
            notesResponse.data;

          if (Array.isArray(receivedNotes)) {
            notesData = receivedNotes;
          } else {
            setNotesError(
              "Le format des avis est invalide."
            );
          }
        } else {
          console.error(
            "Erreur de chargement des avis :",
            notesResult.reason?.response?.data ||
              notesResult.reason
          );

          setNotesError(
            `Les avis ne peuvent pas être chargés : ${getErrorMessage(
              notesResult.reason
            )}`
          );
        }

        const recettesAvecNotes = recettesData.map(
          (recette) => {
            const recetteId = String(recette._id);

            const notesDeLaRecette =
              notesData.filter((note) => {
                const noteRecetteId =
                  getRecetteIdFromNote(note);

                return noteRecetteId === recetteId;
              });

            return {
              ...recette,
              notes: notesDeLaRecette,
            };
          }
        );

        console.log("Recettes reçues :", recettesData);
        console.log("Avis reçus :", notesData);
        console.log(
          "Recettes avec avis :",
          recettesAvecNotes
        );

        if (componentMounted) {
          setRecettes(recettesAvecNotes);
        }
      } catch (error) {
        console.error(
          "Erreur de chargement des recettes :",
          error.response?.data || error
        );

        if (componentMounted) {
          setRecettes([]);
          setError(getErrorMessage(error));
        }
      } finally {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">
            Chargement...
          </span>
        </div>

        <p className="mt-3">
          Chargement des recettes…
        </p>
      </main>
    );
  }

  return (
    <main className="container py-5" id="top">
      {showScrollTop && (
        <button
          type="button"
          className="scrollTop"
          onClick={handleScrollTop}
          aria-label="Retour en haut de la page"
          title="Retour en haut"
        >
          ↑
        </button>
      )}

      <h1 className="text-center text-decoration-underline mb-5 text-light">
        Toutes les recettes
      </h1>

      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}

      {!error && notesError && (
        <div
          className="alert alert-warning"
          role="alert"
        >
          {notesError}
        </div>
      )}

      {!error && recettes.length === 0 && (
        <div
          className="alert alert-info"
          role="alert"
        >
          Aucune recette n’est disponible.
        </div>
      )}

      {!error && recettes.length > 0 && (
        <div className="row g-4">
          {recettes.map((recette) => (
            <div
              key={recette._id}
              className="col-12 col-md-6 col-lg-4"
            >
              <article className="card h-100 shadow-sm">
                <img
                  src={getImageUrl(recette.image)}
                  className="card-img-top"
                  alt={
                    recette.fiche
                      ? `Recette : ${recette.fiche}`
                      : "Image de la recette"
                  }
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      DEFAULT_IMAGE;
                  }}
                />

                <div className="card-body">
                  <h2 className="card-title h4">
                    {recette.fiche ||
                      "Recette sans titre"}
                  </h2>

                  <p className="card-text">
                    {recette.description3 ||
                      "Aucune description disponible."}
                  </p>

                  {recette.category?.description2 && (
                    <p className="mb-2">
                      <strong>Catégorie :</strong>{" "}
                      {recette.category.description2}
                    </p>
                  )}

                  {Array.isArray(
                    recette.ingredients
                  ) &&
                    recette.ingredients.length > 0 && (
                      <div className="mb-3">
                        <strong>Ingrédients :</strong>

                        <ul className="mb-0 ps-4">
                          {recette.ingredients.map(
                            (ingredient, index) => (
                              <li
                                key={
                                  ingredient?._id ||
                                  index
                                }
                              >
                                {typeof ingredient ===
                                "string"
                                  ? ingredient
                                  : ingredient?.description ||
                                    "Ingrédient sans description"}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {Array.isArray(recette.notes) &&
                  recette.notes.length > 0 ? (
                    <div className="mb-3">
                      <strong>Note :</strong>

                      <ul className="mb-0 ps-4">
                        {recette.notes.map(
                          (note, index) => (
                            <li
                              key={note?._id || index}
                              className="mb-2"
                            >
                              <span>
                                {note?.description1?.trim() ||
                                  "Aucun commentaire"}
                              </span>

                              {note?.author && (
                                <small className="d-block text-muted">
                                  Par{" "}
                                  {[
                                    note.author.prenom,
                                    note.author.nom,
                                  ]
                                    .filter(Boolean)
                                    .join(" ") ||
                                    "Utilisateur inconnu"}
                                </small>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : (
                    <p className="mb-3 text-muted">
                      Aucun avis pour cette recette.
                    </p>
                  )}

                  {recette.author && (
                    <p className="mb-0 text-muted">
                      <strong>Auteur :</strong>{" "}
                      {[
                        recette.author.prenom,
                        recette.author.nom,
                      ]
                        .filter(Boolean)
                        .join(" ") ||
                        "Auteur inconnu"}
                    </p>
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