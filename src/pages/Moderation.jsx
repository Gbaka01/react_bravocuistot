import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import "../css/accueil.css";

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  "https://node-bravocuistot.onrender.com";

const DEFAULT_IMAGE = "/images/recette-default.jpg";

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return DEFAULT_IMAGE;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const serverUrl = SERVER_URL.replace(/\/+$/, "");
  const imagePath = image.replace(/^\/+/, "");

  return imagePath.startsWith("uploads/")
    ? `${serverUrl}/${imagePath}`
    : `${serverUrl}/uploads/${imagePath}`;
};

const getToken = () => localStorage.getItem("token");

export default function Moderation() {
  const navigate = useNavigate();

  const [recettes, setRecettes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [processingId, setProcessingId] =
    useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [editForm, setEditForm] = useState({
    fiche: "",
    description3: "",
    status: "pending",
    moderationReason: "",
  });
  const [editImage, setEditImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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

const loadRecettes = useCallback(async () => {
  const token = getToken();

  if (!token) {
    setLoading(false);
    navigate("/login", { replace: true });
    return;
  }

  try {
    setLoading(true);
    setMessage("");

    const response = await api.get("/moderation/recettes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data?.recettes ?? response.data;

    if (!Array.isArray(data)) {
      throw new Error("Format de réponse invalide");
    }

    setRecettes(data);
  } catch (error) {
    console.error(error.response?.data || error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
      return;
    }

    if (error.response?.status === 403) {
      setMessage(
        "Accès refusé : votre compte n'est pas modérateur."
      );
      return;
    }

    setMessage(
      error.response?.data?.message ||
        error.message ||
        "Impossible de charger les recettes."
    );
  } finally {
    setLoading(false);
  }
}, [navigate]);

useEffect(() => {
  loadRecettes();
}, [loadRecettes]);

  function startEditing(recette) {
    setEditingId(recette._id);
    setEditImage(null);
    setImagePreview(getImageUrl(recette.image));

    setEditForm({
      fiche: recette.fiche || "",
      description3: recette.description3 || "",
      status: recette.status || "pending",
      moderationReason:
        recette.moderationReason || "",
    });
  }

  function cancelEditing() {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditingId(null);
    setEditImage(null);
    setImagePreview("");
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      event.target.value = "";
      setMessage("Formats autorisés : JPEG, PNG ou WebP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setMessage("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditImage(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage("");
  }

async function saveUpdate(recetteId) {
  const token = getToken();

  if (!token) {
    navigate("/login", { replace: true });
    return;
  }

  if (!editForm.fiche.trim() || !editForm.description3.trim()) {
    setMessage("Le titre et la description sont obligatoires.");
    return;
  }

  if (
    editForm.status === "rejected" &&
    !editForm.moderationReason.trim()
  ) {
    setMessage("Le motif du refus est obligatoire.");
    return;
  }

  try {
    setProcessingId(recetteId);
    setMessage("");

    const formData = new FormData();

    formData.append("fiche", editForm.fiche.trim());
    formData.append(
      "description3",
      editForm.description3.trim()
    );
    formData.append("status", editForm.status);
    formData.append(
      "moderationReason",
      editForm.status === "rejected"
        ? editForm.moderationReason.trim()
        : ""
    );

    // Sans nouveau fichier, l'image déjà enregistrée est conservée.
    if (editImage) {
      formData.append("image", editImage);
    }

    const response = await api.put(
      `/moderation/recettes/${recetteId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedRecette =
      response.data?.recette ?? response.data;

    setRecettes((currentRecettes) =>
      currentRecettes.map((recette) =>
        recette._id === recetteId
          ? updatedRecette
          : recette
      )
    );

    cancelEditing();
    setMessage(
      response.data?.message ||
        "Recette modifiée avec succès."
    );
  } catch (error) {
    console.error(error.response?.data || error);

    setMessage(
      error.response?.data?.message ||
        "La modification a échoué."
    );
  } finally {
    setProcessingId(null);
  }
}

  async function changeStatus(recetteId, status) {
    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    let moderationReason = "";

    if (status === "rejected") {
      moderationReason =
        window.prompt("Motif du refus :")?.trim() || "";

      if (!moderationReason) {
        setMessage(
          "Le motif est obligatoire pour refuser."
        );
        return;
      }
    }

    try {
      setProcessingId(recetteId);
      setMessage("");

      const response = await api.patch(
        `/moderation/recettes/${recetteId}/status`,
        {
          status,
          moderationReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedRecette =
        response.data?.recette ?? response.data;

      setRecettes((currentRecettes) =>
        currentRecettes.map((recette) =>
          recette._id === recetteId
            ? updatedRecette
            : recette
        )
      );

      setMessage(
        response.data?.message ||
          (status === "approved"
            ? "Recette approuvée."
            : "Recette refusée.")
      );
    } catch (error) {
      console.error(error.response?.data || error);

      setMessage(
        error.response?.data?.message ||
          "La modération a échoué."
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function deleteRecette(recetteId) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette recette ?"
    );

    if (!confirmed) {
      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setProcessingId(recetteId);
      setMessage("");

      const response = await api.delete(
        `/moderation/recettes/${recetteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecettes((currentRecettes) =>
        currentRecettes.filter(
          (recette) => recette._id !== recetteId
        )
      );

      setMessage(
        response.data?.message ||
          "Recette supprimée avec succès."
      );
    } catch (error) {
      console.error(error.response?.data || error);

      setMessage(
        error.response?.data?.message ||
          "La suppression a échoué."
      );
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return (
      <main className="container py-5">
        <p>Chargement...</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
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
      <h1 className="mb-4">
        Modération des recettes
      </h1>

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      {recettes.length === 0 ? (
        <div className="alert alert-info">
          Aucune recette.
        </div>
      ) : (
        <div className="row g-4">
          {recettes.map((recette) => (
            <div
              className="col-12 col-lg-6"
              key={recette._id}
            >
              <article className="card h-100 shadow-sm">
                <div className="card-body">
                  {editingId === recette._id ? (
                    <>
                      <input
                        className="form-control mb-3"
                        value={editForm.fiche}
                        onChange={(event) =>
                          setEditForm({
                            ...editForm,
                            fiche: event.target.value,
                          })
                        }
                      />

                      <textarea
                        className="form-control mb-3"
                        rows={5}
                        value={editForm.description3}
                        onChange={(event) =>
                          setEditForm({
                            ...editForm,
                            description3:
                              event.target.value,
                          })
                        }
                      />

                      <label
                        className="form-label"
                        htmlFor={`image-${recette._id}`}
                      >
                        Nouvelle image (facultative)
                      </label>

                      <input
                        id={`image-${recette._id}`}
                        type="file"
                        className="form-control mb-3"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                      />

                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Aperçu de la recette"
                          className="img-fluid rounded mb-3"
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      <select
                        className="form-select mb-3"
                        value={editForm.status}
                        onChange={(event) =>
                          setEditForm({
                            ...editForm,
                            status: event.target.value,
                          })
                        }
                      >
                        <option value="pending">
                          En attente
                        </option>
                        <option value="approved">
                          Approuvée
                        </option>
                        <option value="rejected">
                          Refusée
                        </option>
                      </select>

                      {editForm.status === "rejected" && (
                        <textarea
                          className="form-control mb-3"
                          placeholder="Motif du refus"
                          value={
                            editForm.moderationReason
                          }
                          onChange={(event) =>
                            setEditForm({
                              ...editForm,
                              moderationReason:
                                event.target.value,
                            })
                          }
                        />
                      )}

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            saveUpdate(recette._id)
                          }
                          disabled={processingId === recette._id}
                        >
                          Enregistrer
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={cancelEditing}
                          disabled={processingId === recette._id}
                        >
                          Annuler
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="h4">
                        {recette.fiche}
                      </h2>

                      <img
                        src={getImageUrl(recette.image)}
                        alt={recette.fiche || "Recette"}
                        className="img-fluid rounded mb-3"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            DEFAULT_IMAGE;
                        }}
                      />

                      <p>{recette.description3}</p>
                      <p>
                        <strong>Statut :</strong>{" "}
                        {recette.status}
                      </p>

                      {recette.moderationReason && (
                        <p>
                          <strong>Motif :</strong>{" "}
                          {recette.moderationReason}
                        </p>
                      )}

                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn btn-success"
                          disabled={
                            processingId === recette._id
                          }
                          onClick={() =>
                            changeStatus(
                              recette._id,
                              "approved"
                            )
                          }
                        >
                          Approuver
                        </button>

                        <button
                          type="button"
                          className="btn btn-warning"
                          disabled={
                            processingId === recette._id
                          }
                          onClick={() =>
                            changeStatus(
                              recette._id,
                              "rejected"
                            )
                          }
                        >
                          Refuser
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={
                            processingId === recette._id
                          }
                          onClick={() =>
                            startEditing(recette)
                          }
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger"
                          disabled={
                            processingId === recette._id
                          }
                          onClick={() =>
                            deleteRecette(recette._id)
                          }
                        >
                          Supprimer
                        </button>
                      </div>
                    </>
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