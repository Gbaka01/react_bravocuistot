import api from '../lib/axios'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  })
  const [messages, setMessages] = useState([])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessages([]) // 🔄 reset avant chaque tentative
    try {
    const res = await api.post("/user/register", // ✅ propre avec .env
        formData
      )
      console.log(res.data)
      navigate("/login", { state: { flash: "Inscription réussie" } })
    } catch (err) {
      console.error(err.response?.data)
      if (err.response?.data?.messages) {
        setMessages(err.response.data.messages.map(m => m.details))
      } else {
        setMessages([err.response?.data?.message || "Erreur inconnue"])
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nom" className="form-label text-light">Nom</label>
        <input
          name="nom"
          type="text"
          className="form-control"
          id="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>
            <div className="mb-3">
        <label htmlFor="prenom" className="form-label text-light">Prenom</label>
        <input
          name="prenom"
          type="text"
          className="form-control"
          id="nom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-light">Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div id="emailHelp" className="form-text text-light">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-light">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Envoyer</button>

      {messages.length > 0 && (
        <div className="mt-2">
          {messages.map((msg, index) => (
            <p key={index} className="text-danger">{msg}</p>
          ))}
        </div>
      )}
    </form>
  )
}

