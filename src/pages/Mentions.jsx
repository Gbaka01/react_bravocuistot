import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
const SITE_URL = "https://www.bravocuistot-goli.fr";
const EMAIL = "gore.goli@gmail.com";
const PHONE_DISPLAY = "07 60 23 29 63";
const PHONE_LINK = "+33760232963";
const ADDRESS = "16 rue de Châtillon, 91260 Juvisy-sur-Orge, France";
 
export default function Mentions() {
  const { hash } = useLocation();
 
  // Défile jusqu'à la section demandée (ex. /mentions#cookies)
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
 
  return (
    <main className="container py-5">
      <article
        className="p-4 p-md-5 rounded shadow"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          color: "white",
        }}
      >
        <header className="text-center mb-5">
          <h1>Mentions légales</h1>
 
          <p className="text-light mb-0">
            Informations légales relatives au site Bravo Cuistot
          </p>
        </header>
 
        <section className="mb-5" aria-labelledby="introduction">
          <h2 id="introduction" className="h4">
            Informations générales
          </h2>
 
          <p>
            Conformément aux dispositions de la loi n° 2004-575 du
            21 juin 2004 pour la confiance dans l’économie numérique,
            les utilisateurs du site Bravo Cuistot sont informés de
            l’identité des différents intervenants participant à sa
            réalisation et à son suivi.
          </p>
        </section>
 
        <section className="mb-5" aria-labelledby="edition">
          <h2 id="edition" className="h4">
            Édition du site
          </h2>
 
          <p>
            Le présent site, accessible à l’adresse{" "}
            <a
              href={SITE_URL}
              className="link-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_URL}
            </a>
            , est édité par :
          </p>
 
          <address className="mb-0">
            <strong>Gore Gbaka GOLI</strong>
            <br />
            {ADDRESS}
          </address>
        </section>
 
        <section className="mb-5" aria-labelledby="publication">
          <h2 id="publication" className="h4">
            Directeur de la publication
          </h2>
 
          <p>
            Le directeur de la publication du site est{" "}
            <strong>Gore Gbaka GOLI</strong>.
          </p>
        </section>
 
        <section className="mb-5" aria-labelledby="hebergement">
          <h2 id="hebergement" className="h4">
            Hébergement
          </h2>
 
          <p>Le site est hébergé par :</p>
 
          <address>
            <strong>OVH SAS</strong>
            <br />
            2 rue Kellermann
            <br />
            BP 80157
            <br />
            59053 Roubaix Cedex 1
            <br />
            France
            <br />
            Téléphone :{" "}
            <a href="tel:1007" className="link-light">
              1007
            </a>
          </address>
        </section>
 
        <section className="mb-5" aria-labelledby="contact">
          <h2 id="contact" className="h4">
            Nous contacter
          </h2>
 
          <address>
            <strong>Par téléphone :</strong>{" "}
            <a href={`tel:${PHONE_LINK}`} className="link-light">
              {PHONE_DISPLAY}
            </a>
            <br />
            <strong>Par courriel :</strong>{" "}
            <a href={`mailto:${EMAIL}`} className="link-light">
              {EMAIL}
            </a>
            <br />
            <strong>Par courrier :</strong> {ADDRESS}
          </address>
        </section>
 
        <section
          id="cookies"
          className="mb-5"
          aria-labelledby="cookies-titre"
          style={{ scrollMarginTop: "5rem" }}
        >
          <h2 id="cookies-titre" className="h4">
            Cookies
          </h2>
 
          <p>
            Un cookie est un petit fichier enregistré sur votre appareil lors de
            la visite d’un site. Bravo Cuistot en utilise trois catégories :
          </p>
 
          <ul>
            <li>
              <strong>Essentiels</strong> : nécessaires au fonctionnement du
              site, comme la connexion à votre compte et la mémorisation de vos
              choix sur les cookies. Ils ne demandent pas votre accord.
            </li>
            <li>
              <strong>Mesure d’audience</strong> : statistiques de fréquentation
              réalisées avec Google Tag Manager, pour savoir quelles recettes
              sont les plus consultées. Déposés uniquement avec votre accord.
            </li>
            <li>
              <strong>Contenus tiers</strong> : vidéos de recettes intégrées
              depuis d’autres sites (par exemple YouTube), qui peuvent déposer
              leurs propres cookies. Affichées uniquement avec votre accord.
            </li>
          </ul>
 
          <p>
            Votre choix est conservé pendant 6 mois. Vous pouvez le modifier à
            tout moment, et refuser n’empêche pas de consulter les recettes.
          </p>
 
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => window.BCConsentement?.ouvrir()}
          >
            Gérer mes cookies
          </button>
        </section>
 
        <section aria-labelledby="credits">
          <h2 id="credits" className="h4">
            Crédits
          </h2>
 
          <p className="mb-0">
            Mentions légales initialement générées à l’aide du service
            Legalstart, puis adaptées pour le site Bravo Cuistot.
          </p>
        </section>
 
        <footer className="mt-5 pt-4 border-top">
          <p className="mb-0 fst-italic text-light">
            Ce document doit être vérifié par un professionnel du droit
            avant sa publication définitive.
          </p>
        </footer>
      </article>
    </main>
  );
}