import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nom");
    navigate("/login");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Bravo cuistot
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Afficher la navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Accueil
                </NavLink>
              </li>
               <li className="nav-item">
                <NavLink className="nav-link" to="/mesrecettes">
                  Recettes
                </NavLink>
              </li>
                   <li className="nav-item">
                <NavLink className="nav-link" to="/mentions">
                  Mentions légales    
                </NavLink>
              </li>
                      <li className="nav-item">
                <NavLink className="nav-link" to="/recherche">
                  Rechercher une recette    
                </NavLink>
              </li>
     
              

              {isLoggedIn ? (
                <>
                                   <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/profile"
                    >
                      Supprimer son compte
                    </NavLink>
                  </li>
       

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/recette/new">
                      Publier une recette
                    </NavLink>
                  </li>
                     <li className="nav-item">
                    <NavLink className="nav-link" to="/categorie/new">
                      Publier une categorie
                    </NavLink>
                  </li>
                     <li className="nav-item">
                    <NavLink className="nav-link" to="/ingredient/new">
                      Ingredient
                    </NavLink>
                  </li>
                               
                     <li className="nav-item">
                    <NavLink className="nav-link" to="/note/new">
                      Note
                    </NavLink>
                  </li>
                                       <li className="nav-item">
                    <NavLink className="nav-link" to="/moderation">
                      Moderation        
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                    >
                      Se déconnecter
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Se connecter
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      S’inscrire
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}