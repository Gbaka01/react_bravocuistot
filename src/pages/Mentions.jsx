import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
/*
 * Mentions légales — bravocuistot-goli.fr (GOLI Gore Gbaka)
 * En vigueur au 25/09/2026 — rédigé à partir d'un modèle LegalPlace.
 */
 
const SITE_URL = "https://www.bravocuistot-goli.fr";
const SITE_NAME = "bravocuistot-goli.fr";
const EDITOR = "GOLI Gore Gbaka";
const EMAIL = "gore.goli@gmail.com";
const PHONE_DISPLAY = "07 60 29 23 63";
const PHONE_LINK = "+33760292363";
const ADDRESS = "16 rue de Châtillon, 91260 Juvisy-sur-Orge, France";
 
const lienExterne = { target: "_blank", rel: "noopener noreferrer" };
 
export default function Mentions() {
  const { hash } = useLocation();
 
  // Titre de l'onglet propre à cette page
  useEffect(() => {
    const ancienTitre = document.title;
    document.title = "Mentions légales | Bravo Cuistot";
    return () => {
      document.title = ancienTitre;
    };
  }, []);
 
  // Défile jusqu'à la section demandée (ex. /mentions#cookies)
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
 
  return (
    <main className="container py-5">
      <article
        className="p-4 p-md-5 rounded shadow mx-auto"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          color: "white",
          maxWidth: "800px",
          lineHeight: 1.6,
        }}
        aria-labelledby="mentions-titre"
      >
        <header className="text-center mb-5">
          <h1 id="mentions-titre">Mentions légales</h1>
          <p className="text-light mb-0">En vigueur au 25 septembre 2026</p>
        </header>
 
        <p>
          Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour
          la confiance dans l’économie numérique (LCEN), voici l’identité des
          personnes intervenant dans la réalisation et le suivi du site{" "}
          <a className="link-light fw-bold" href={SITE_URL}>
            {SITE_NAME}
          </a>{" "}
          (le « Site »).
        </p>
 
        <section id="edition" aria-labelledby="edition-titre">
          <h2 id="edition-titre" className="h4 mt-4">Édition du site</h2>
          <p className="mb-2">Le Site est édité à titre personnel par :</p>
          <address>
            {EDITOR}
            <br />
            {ADDRESS}
            <br />
            Téléphone :{" "}
            <a className="link-light" href={`tel:${PHONE_LINK}`}>
              {PHONE_DISPLAY}
            </a>
            <br />
            E-mail :{" "}
            <a className="link-light" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </address>
          <p>Directeur de la publication : {EDITOR}.</p>
        </section>
 
        <section id="hebergement" aria-labelledby="hebergement-titre">
          <h2 id="hebergement-titre" className="h4 mt-4">Hébergement</h2>
          <address>
            OVH SAS
            <br />
            2 rue Kellermann, 59100 Roubaix, France
            <br />
            Téléphone : 1007 (depuis la France) ou +33 9 72 10 10 07
            <br />
            Site :{" "}
            <a className="link-light" href="https://www.ovhcloud.com/fr/" {...lienExterne}>
              www.ovhcloud.com
            </a>
          </address>
        </section>
 
        <section id="acces" aria-labelledby="acces-titre">
          <h2 id="acces-titre" className="h4 mt-4">Accès au site</h2>
          <p>
            Le Site est normalement accessible à tout moment. L’éditeur peut
            toutefois le suspendre, le limiter ou l’interrompre, notamment pour
            des mises à jour ou des modifications de son contenu. Il ne pourra
            être tenu responsable des conséquences éventuelles de cette
            indisponibilité.
          </p>
        </section>
 
        <section id="propriete" aria-labelledby="propriete-titre">
          <h2 id="propriete-titre" className="h4 mt-4">Propriété intellectuelle</h2>
          <p>
            Les recettes, textes, photographies et le code du Site sont la
            propriété de {EDITOR}, sauf mention contraire. Toute utilisation,
            reproduction, diffusion, commercialisation ou modification de tout
            ou partie du Site sans autorisation expresse est interdite et pourra
            entraîner des poursuites judiciaires.
          </p>
        </section>
 
        <section id="donnees" aria-labelledby="donnees-titre">
          <h2 id="donnees-titre" className="h4 mt-4">Données personnelles</h2>
          <p>
            Le responsable du traitement est {EDITOR} (coordonnées ci-dessus).
            Les informations que vous envoyez via le formulaire de contact ou
            par e-mail (nom, adresse e-mail, message) servent uniquement à vous
            répondre. Elles ne sont ni vendues ni transmises à des tiers, et
            sont conservées au maximum 3 ans après notre dernier échange.
          </p>
          <p className="mb-2">
            Conformément au Règlement général sur la protection des données
            (RGPD, règlement UE 2016/679) et à la loi « Informatique et
            Libertés » n° 78-17 du 6 janvier 1978, vous disposez d’un droit
            d’accès, de rectification, d’effacement, d’opposition et de
            limitation du traitement de vos données. Vous pouvez l’exercer :
          </p>
          <ul>
            <li>
              par e-mail à{" "}
              <a className="link-light" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>{" "}
              ;
            </li>
            <li>depuis le formulaire de contact du Site.</li>
          </ul>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            adresser une réclamation à la{" "}
            <a className="link-light" href="https://www.cnil.fr/fr/plaintes" {...lienExterne}>
              CNIL
            </a>
            .
          </p>
        </section>
 
        <section id="cookies" aria-labelledby="cookies-titre">
          <h2 id="cookies-titre" className="h4 mt-4">Cookies</h2>
          <p>
            Lors de votre première visite, un bandeau vous demande votre accord.
            Aucun cookie de mesure d’audience n’est déposé avant votre choix, et
            refuser est aussi simple qu’accepter. Votre choix est conservé
            6 mois.
          </p>
 
          <div className="table-responsive">
            <table className="table table-dark table-bordered align-top">
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th>Service</th>
                  <th>Finalité</th>
                  <th>Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Essentiels (toujours actifs)</td>
                  <td>Site {SITE_NAME} (stockage local du navigateur)</td>
                  <td>Mémoriser votre choix concernant les cookies</td>
                  <td>6 mois</td>
                </tr>
                <tr>
                  <td>Mesure d’audience (avec votre accord)</td>
                  <td>Google Tag Manager / Google Analytics (Google Ireland Ltd)</td>
                  <td>Statistiques de fréquentation pour améliorer le Site</td>
                  <td>13 mois maximum</td>
                </tr>
              </tbody>
            </table>
          </div>
 
          <p>
            Les données collectées par Google peuvent être transférées hors de
            l’Union européenne, notamment aux États-Unis. Voir les{" "}
            <a className="link-light" href="https://policies.google.com/privacy?hl=fr" {...lienExterne}>
              règles de confidentialité de Google
            </a>
            .
          </p>
          <p>
            Vous pouvez modifier ou retirer votre accord à tout moment :{" "}
            <a
              className="link-light"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.SiteConsent?.open();
              }}
            >
              gérer les cookies
            </a>
            .
          </p>
        </section>
 
        <p className="mt-5 mb-0">
          <small>
            Rédigé à partir d’un modèle{" "}
            <a className="link-light" href="https://www.legalplace.fr/" {...lienExterne}>
              LegalPlace
            </a>
            .
          </small>
        </p>
      </article>
    </main>
  );
}
 