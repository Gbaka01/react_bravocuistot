import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container text-center py-5">
      {/* React 19 place automatiquement ces balises dans le <head> */}
      <title>Page introuvable | Bravo Cuistot</title>
      <meta name="robots" content="noindex" />

      <h1 className="display-1">404</h1>
      <p className="lead">Oups, cette recette a dû brûler… Cette page n'existe pas.</p>
      <Link to="/" className="btn btn-warning me-2">Retour à l'accueil</Link>
      <Link to="/recettes" className="btn btn-outline-dark">Voir les recettes</Link>
    </main>
  );
}