import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function Note() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description1: "",
    recetty: "",
  });

  const [recettes, setRecettes] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRecettes, setLoadingRecettes] =
    useState(true);

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        setLoadingRecettes(true);
        setMessage("");

        const response = await api.get("/recette/all");

        const data =
          response.data?.recettes ?? response.data;

        if (!Array.isArray(data)) {
          setRecettes([]);
          setMessage(
            "Le format des recettes est invalide."
          );
          setSuccess(false);
          return;
        }

        setRecettes(data);
      } catch (error) {
        console.error(
          "Erreur de chargement des recettes :",
          error.response?.data || error
        );

        setRecettes([]);

        setMessage(
          error.response?.data?.message ||
            "Impossible de charger les recettes."
        );

        setSuccess(false);
      } finally {
        setLoadingRecettes(false);
      }
    };

    fetchRecettes();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!formData.recetty) {
      setMessage("Veuillez sélectionner une recette.");
      setSuccess(false);
      return;
    }

    if (!formData.description1.trim()) {
      setMessage("Veuillez saisir une note.");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const response = await api.post(
        "/note/new",
        {
          description1:
            formData.description1.trim(),
          recetty: formData.recetty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data?.message ||
          "Note créé avec succès !"
      );

      setSuccess(true);

      setFormData({
        description1: "",
        recetty: "",
      });
    } catch (error) {
      console.error(error.response?.data || error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("nom");
        navigate("/login");
        return;
      }

      const errorData = error.response?.data;

      setMessage(
        errorData?.message ||
          (typeof errorData === "string"
            ? errorData
            : "Erreur lors de la création de la note.")
      );

      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <h1 className="mb-4 text-light">
            Ajouter une note
          </h1>

          {message && (
            <div
              className={`alert ${
                success
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="recetty"
                className="form-label text-light"
              >
                Recette
              </label>

              <select
                id="recetty"
                name="recetty"
                className="form-select"
                value={formData.recetty}
                onChange={handleChange}
                disabled={loadingRecettes}
                required
              >
                <option value="">
                  {loadingRecettes
                    ? "Chargement des recettes..."
                    : "Sélectionnez une recette"}
                </option>

                {recettes.map((recette) => (
                  <option
                    key={recette._id}
                    value={recette._id}
                  >
                    {recette.fiche ||
                      recette.description3 ||
                      "Recette sans titre"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="description1"
                className="form-label text-light"
              >
                Note
              </label>

              <textarea
                className="form-control"
                id="description1"
                name="description1"
                rows="4"
                value={formData.description1}
                onChange={handleChange}
                placeholder="Donnez votre note/5"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                loading ||
                loadingRecettes ||
                recettes.length === 0
              }
            >
              {loading
                ? "Création en cours..."
                : "Ajouter la note"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}