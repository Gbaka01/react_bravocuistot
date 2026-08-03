import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function Formulaire() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fiche: "",
    description3: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger les catégories
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get("/categorie/all");
        const data =
          response.data?.categories ?? response.data;

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Erreur catégories :",
          error.response?.data || error
        );

        setSuccess(false);
        setMessage("Impossible de charger les catégories.");
      }
    }

    getCategories();
  }, []);

  // Nettoyer l'URL temporaire de l'aperçu
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

function handleImageChange(event) {
  const selectedFile = event.target.files?.[0];

  if (!selectedFile) {
    setImage(null);
    setPreview(null);
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(selectedFile.type)) {
    setSuccess(false);
    setMessage("Formats acceptés : JPEG, PNG et WebP.");
    setImage(null);
    setPreview(null);
    event.target.value = "";
    return;
  }

  const maximumSize = 5 * 1024 * 1024;

  if (selectedFile.size > maximumSize) {
    setSuccess(false);
    setMessage("L’image ne doit pas dépasser 5 Mo.");
    setImage(null);
    setPreview(null);
    event.target.value = "";
    return;
  }

  setSuccess(false);
  setMessage("");
  setImage(selectedFile);
  setPreview(URL.createObjectURL(selectedFile));
}

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (!form.fiche.trim()) {
      setSuccess(false);
      setMessage("Le nom de la recette est obligatoire.");
      return;
    }

    if (!form.description3.trim()) {
      setSuccess(false);
      setMessage("La description est obligatoire.");
      return;
    }

    if (!/^[a-fA-F0-9]{24}$/.test(form.category)) {
      setSuccess(false);
      setMessage("Veuillez sélectionner une catégorie valide.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("fiche", form.fiche.trim());
      formData.append(
        "description3",
        form.description3.trim()
      );
      formData.append("category", form.category);

      if (image instanceof File) {
        formData.append("image", image, image.name);
      }

      const response = await api.post(
        "/recette/new",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setMessage(
        response.data?.message ||
          "Recette créée avec succès."
      );

      setForm({
        fiche: "",
        description3: "",
        category: "",
      });

      setImage(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      const responseData = error.response?.data;

      console.error(
        "Erreur création recette :",
        responseData || error
      );

      setSuccess(false);
      setMessage(
        responseData?.errors?.join(" — ") ||
          responseData?.message ||
          "Impossible de créer la recette."
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("nom");
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <h1 className="mb-4 text-light">
            Créer une recette
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

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label
                htmlFor="fiche"
                className="form-label text-light"
              >
                Nom de la recette
              </label>

              <input
                type="text"
                className="form-control"
                id="fiche"
                name="fiche"
                value={form.fiche}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="description3"
                className="form-label text-light"
              >
                Description
              </label>

              <textarea
                className="form-control"
                id="description3"
                name="description3"
                rows={5}
                value={form.description3}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="category"
                className="form-label text-light"
              >
                Catégorie
              </label>

              <select
                className="form-select"
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Choisissez une catégorie
                </option>

                {categories.map((categorie) => (
                  <option
                    key={categorie._id}
                    value={categorie._id}
                  >
                    {categorie.description2}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label
                htmlFor="image"
                className="form-label text-light"
              >
                Image
              </label>

              <input
                ref={fileInputRef}
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
              />
            </div>

            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Aperçu de la recette"
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Création en cours..."
                : "Créer la recette"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}