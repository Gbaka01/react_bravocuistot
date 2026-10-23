import { Link } from "react-router-dom";
import "../css/accueil.css";
 
// Mets ta propre image (libre de droits ou à toi) dans public/images/
const IMAGE_FOND = "/images/hero-cuisine.jpg";
 
const atouts = [
  { icon: "🍲", titre: "Des recettes", texte: "Découvrez les recettes partagées par la communauté." },
  { icon: "✍️", titre: "Partagez", texte: "Publiez vos propres recettes avec photos et étapes." },
  { icon: "⭐", titre: "Notez", texte: "Donnez votre avis et trouvez les meilleures recettes." },
];
 
export default function Accueil({ utilisateur }) {
  return (
    <div className="bc-accueil">
      <section className="bc-hero" style={{ backgroundImage: `url(${IMAGE_FOND})` }}>
        <div className="bc-hero-voile">
          <div className="container text-center">
            <h1 className="bc-titre">Bravo Cuistot</h1>
            <p className="bc-sous-titre">
              Le site de partage de recettes : découvrez, publiez et notez vos plats préférés.
            </p>
 
            <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
              <Link to="/mesrecettes" className="btn btn-warning btn-lg">Voir les recettes</Link>
              {utilisateur ? (
                <Link to="/recette/new" className="btn btn-outline-light btn-lg">Publier une recette</Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light btn-lg">Se connecter</Link>
                  <Link to="/register" className="btn btn-outline-light btn-lg">S’inscrire</Link>
                </>
              )}
            </div>
 
            <form className="bc-recherche mt-4" action="/recherche" role="search">
              <input
                type="search"
                name="q"
                className="form-control form-control-lg"
                placeholder="Rechercher une recette (ex. poulet yassa)"
                aria-label="Rechercher une recette"
              />
            </form>
          </div>
        </div>
      </section>
 
      <section className="container py-5">
        <div className="row g-4">
          {atouts.map((a) => (
            <div key={a.titre} className="col-12 col-md-4">
              <article className="bc-carte h-100">
                <div className="bc-carte-icone" aria-hidden="true">{a.icon}</div>
                <h2 className="h5 mt-2">{a.titre}</h2>
                <p className="mb-0 text-muted">{a.texte}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
 
