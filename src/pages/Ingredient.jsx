import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function Ingredient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    recetty: "",
  });

  const [recettes, setRecettes] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRecettes, setLoadingRecettes] =
    useState(true);

  // Charger la liste des recettes
  useEffect(() => {
    async function getRecettes() {
      try {
        setLoadingRecettes(true);

        const response = await api.get("/recette/all");
        const data =
          response.data?.recettes ?? response.data;

        setRecettes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Erreur chargement recettes :",
          error.response?.data || error
        );

        setSuccess(false);
        setMessage("Impossible de charger les recettes.");
      } finally {
        setLoadingRecettes(false);
      }
    }

    getRecettes();
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
      navigate("/login", { replace: true });
      return;
    }

    if (!formData.description.trim()) {
      setSuccess(false);
      setMessage("La description est obligatoire.");
      return;
    }

    if (!/^[a-fA-F0-9]{24}$/.test(formData.recetty)) {
      setSuccess(false);
      setMessage("Veuillez sélectionner une recette valide.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const response = await api.post(
        "/ingredient/new",
        {
          description: formData.description.trim(),
          recetty: formData.recetty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setSuccess(true);
      setMessage(
        response.data?.message ||
          "Ingrédient créé avec succès !"
      );

      setFormData({
        description: "",
        recetty: "",
      });
    } catch (error) {
      const responseData = error.response?.data;

      console.error(
        "Erreur création ingrédient :",
        responseData || error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("nom");
        navigate("/login", { replace: true });
        return;
      }

      setSuccess(false);
      setMessage(
        responseData?.message ||
          "Erreur lors de la création de l’ingrédient."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <h1 className="mb-4 text-light">
            Créer un ingrédient
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
                htmlFor="description"
                className="form-label text-light"
              >
                Description de l’ingrédient
              </label>

              <textarea
                className="form-control"
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="recetty"
                className="form-label text-light"
              >
                Recette
              </label>

              <select
                className="form-select"
                id="recetty"
                name="recetty"
                value={formData.recetty}
                onChange={handleChange}
                disabled={loadingRecettes}
                required
              >
                <option value="">
                  {loadingRecettes
                    ? "Chargement des recettes..."
                    : "Choisissez une recette"}
                </option>

                {recettes.map((recette) => (
                  <option
                    key={recette._id}
                    value={recette._id}
                  >
                    {recette.fiche ||
                      recette.description3}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || loadingRecettes}
            >
              {loading
                ? "Création en cours..."
                : "Créer l’ingrédient"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}