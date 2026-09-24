import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Accueil from "./pages/Accueil.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Formulaire from "./pages/Formulaire.jsx";
import Recettes from "./pages/Recettes.jsx";
import Ingredient from "./pages/Ingredient.jsx";
import Categorie from "./pages/Categorie.jsx";
import Recherche from "./pages/Recherche.jsx";
import Moderation from "./pages/Moderation.jsx";
import DeleteAccountButton from "./pages/DeleteAccountButton.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Mentions from "./pages/Mentions.jsx";
import Note from "./pages/Note.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recette/new" element={<Formulaire />} />
          <Route path="/mesrecettes" element={<Recettes />} />
          <Route path="/ingredient/new" element={<Ingredient />} />
          <Route path="/note/new" element={<Note />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/delete-account" element={ <DeleteAccountButton />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/moderation" element={<ProtectedRoute allowedRoles={["moderateur"]}>
      <Moderation />
      </ProtectedRoute>} />
         <Route path="/categorie/new" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Categorie />
    </ProtectedRoute>} />
        </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App;
