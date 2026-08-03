import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function Categorie() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description2: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const res = await api.post(
        "/categorie/new",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setMessage(
        res.data.message || "Ingrédient créé avec succès !"
      );

      setSuccess(true);

      setFormData({
        description2: "",
      });
    } catch (error) {
      console.error(error.response?.data || error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("nom");
        navigate("/login");
        return;
      }

      setMessage(
        error.response?.data?.message ||
          "Erreur lors de la création de l’ingrédient."
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
          <h1 className="mb-4 text-light">Créer une categorie</h1>

          {message && (
            <div
              className={`alert ${
                success ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="description2"
                className="form-label text-light"
              >
                Description de la categorie
              </label>

  <input
            type="text"
            className="form-control"
            id="description2"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
          />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Création en cours..."
                : "Créer la categorie"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}