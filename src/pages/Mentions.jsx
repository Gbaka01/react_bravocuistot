import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
/*
 * Mentions légales — bravocuistot-goli.fr (GOLI Gore Gbaka)
 * Dernière mise à jour : 20/10/2026
 */
 
const SITE = {
  nom: "Bravo Cuistot",
  url: "https://www.bravocuistot-goli.fr",
  domaine: "www.bravocuistot-goli.fr",
};
 
const EDITEUR = {
  nom: "Gore Gbaka GOLI",
  ville: "Juvisy-sur-Orge (91260), France",
  email: "gore.goli@gmail.com",
};
 
// À ADAPTER si le site n'est pas hébergé chez OVH.
const HEBERGEUR = {
  nom: "OVH SAS",
  adresse: "2 rue Kellermann, 59100 Roubaix, France",
  tel: "1007",
  site: "https://www.ovhcloud.com/fr/",
  siteAffiche: "ovhcloud.com",
};
 
const MISE_A_JOUR = "20 octobre 2026";
 
const lienExterne = { target: "_blank", rel: "noopener noreferrer" };
 
export default function Mentions() {
  const { hash } = useLocation();
 
  // Titre de l'onglet propre à cette page
  useEffect(() => {
    const ancienTitre = document.title;
    document.title = `Mentions légales | ${SITE.nom}`;
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
          <p className="text-light mb-0">Dernière mise à jour : {MISE_A_JOUR}</p>
        </header>
 
        <p>
          Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour
          la confiance dans l'économie numérique (LCEN), voici l'identité des
          personnes intervenant dans la réalisation et le suivi du site{" "}
          <strong>{SITE.domaine}</strong> (le « Site »). La navigation sur le
          Site vaut acceptation des présentes mentions légales.
        </p>
 
        <section id="edition" aria-labelledby="edition-titre">
          <h2 id="edition-titre" className="h4 mt-4">
            Édition du site
          </h2>
          <p>
            Le Site est un site personnel non professionnel. L'édition et la
            direction de la publication sont assurées par :
          </p>
          <address style={{ fontStyle: "normal" }}>
            <strong>{EDITEUR.nom}</strong>
            <br />
            {EDITEUR.ville}
            <br />
            E-mail :{" "}
            <a href={`mailto:${EDITEUR.email}`} className="link-light">
              {EDITEUR.email}
            </a>
          </address>
          <p>
            Conformément à l'article 6-III-2 de la LCEN, l'adresse postale et le
            numéro de téléphone de l'éditeur ont été communiqués à l'hébergeur.
          </p>
        </section>
 
        <section id="hebergement" aria-labelledby="hebergement-titre">
          <h2 id="hebergement-titre" className="h4 mt-4">
            Hébergement
          </h2>
          <address style={{ fontStyle: "normal" }}>
            <strong>{HEBERGEUR.nom}</strong>
            <br />
            {HEBERGEUR.adresse}
            <br />
            Téléphone : {HEBERGEUR.tel}
            <br />
            Site :{" "}
            <a href={HEBERGEUR.site} className="link-light" {...lienExterne}>
              {HEBERGEUR.siteAffiche}
            </a>
          </address>
        </section>
 
        <section id="acces" aria-labelledby="acces-titre">
          <h2 id="acces-titre" className="h4 mt-4">
            Accès au site
          </h2>
          <p>
            Le Site est normalement accessible à tout moment. L'éditeur peut
            toutefois le suspendre, le limiter ou l'interrompre, notamment pour
            des mises à jour ou des modifications de son contenu, sans pouvoir
            être tenu responsable des conséquences de cette indisponibilité.
          </p>
        </section>
 
        <section id="propriete" aria-labelledby="propriete-titre">
          <h2 id="propriete-titre" className="h4 mt-4">
            Propriété intellectuelle
          </h2>
          <p>
            L'ensemble des contenus du Site (recettes, textes, photos, mise en
            page) est la propriété de l'éditeur, sauf mention contraire. Toute
            reproduction, diffusion, modification ou exploitation commerciale,
            totale ou partielle, sans autorisation écrite préalable est
            interdite et peut donner lieu à des poursuites.
          </p>
        </section>
 
        <section id="donnees" aria-labelledby="donnees-titre">
          <h2 id="donnees-titre" className="h4 mt-4">
            Données personnelles
          </h2>
          <p>
            Les données que vous transmettez sur le Site (par exemple lors d'une
            prise de contact) sont utilisées uniquement pour vous répondre. Elles
            ne sont ni vendues ni cédées à des tiers, et ne sont pas conservées
            au-delà de ce qui est nécessaire.
          </p>
          <p>
            Conformément au règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17
            du 6 janvier 1978 relative à l'informatique, aux fichiers et aux
            libertés, vous disposez d'un droit d'accès, de rectification,
            d'effacement, de limitation, de portabilité et d'opposition au
            traitement de vos données. Pour l'exercer, écrivez à{" "}
            <a href={`mailto:${EDITEUR.email}`} className="link-light">
              {EDITEUR.email}
            </a>
            .
          </p>
          <p>
            Vous pouvez également adresser une réclamation à la{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              className="link-light"
              {...lienExterne}
            >
              CNIL
            </a>
            .
          </p>
        </section>
 
        <section id="cookies" aria-labelledby="cookies-titre">
          <h2 id="cookies-titre" className="h4 mt-4">
            Cookies
          </h2>
          <p>
            Le Site utilise uniquement les cookies ou le stockage local
            strictement nécessaires à son fonctionnement. Ils ne nécessitent pas
            votre consentement, et aucun cookie de mesure d'audience ou
            publicitaire n'est déposé.
          </p>
        </section>
      </article>
    </main>
  );
}

 