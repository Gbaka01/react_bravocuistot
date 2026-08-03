const SITE_URL = "https://www.bravocuistot-goli.fr";
const EMAIL = "gore.goli@gmail.com";
const PHONE_DISPLAY = "07 60 23 29 63";
const PHONE_LINK = "+33760232963";

export default function Mentions() {
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
          <h1>Conditions générales d’utilisation</h1>
          <p className="text-light mb-0">
            En vigueur au <strong>1er août 2026</strong>
          </p>
        </header>

        <p>
          Les présentes conditions générales d’utilisation, dites « CGU », ont
          pour objet de définir les conditions d’accès et d’utilisation du site
          et de ses services par l’Utilisateur.
        </p>

        <p>
          Les présentes CGU sont accessibles sur le site à la rubrique « CGU ».
        </p>

        <p>
          Toute inscription ou utilisation du site implique l’acceptation sans
          réserve des présentes CGU. Lors de son inscription, chaque utilisateur
          accepte expressément les CGU en cochant la case prévue à cet effet.
        </p>

        <p>
          En cas de non-acceptation des présentes CGU, l’Utilisateur doit
          renoncer à utiliser les services proposés par le site.
        </p>

        <p>
          Le site{" "}
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-info"
          >
            {SITE_URL}
          </a>{" "}
          se réserve le droit de modifier les présentes CGU à tout moment.
        </p>

        <section>
          <h2 className="h4 mt-5">Article 1 – Mentions légales</h2>

          <p>
            L’édition et la direction de la publication du site sont assurées
            par <strong>GOLI Goré Gbaka</strong>, domicilié au 16 rue de
            Châtillon, 91260 Juvisy-sur-Orge, France.
          </p>

          <address className="mb-3">
            Téléphone :{" "}
            <a href={`tel:${PHONE_LINK}`} className="text-info">
              {PHONE_DISPLAY}
            </a>
            <br />
            Adresse électronique :{" "}
            <a href={`mailto:${EMAIL}`} className="text-info">
              {EMAIL}
            </a>
          </address>

          <p>
            Le site est hébergé par <strong>OVH SAS</strong>, 2 rue Kellermann,
            59100 Roubaix, France. Téléphone : 1007.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">Article 2 – Accès au site</h2>

          <p>
            Le site permet à l’Utilisateur d’accéder à un service de
            consultation et de partage de recettes de cuisine.
          </p>

          <p>
            Le site est accessible gratuitement à tout Utilisateur disposant
            d’un accès à Internet. Les frais liés au matériel, aux logiciels et
            à la connexion Internet restent à la charge de l’Utilisateur.
          </p>

          <p>
            Certaines fonctionnalités sont réservées aux membres inscrits.
            L’Utilisateur s’engage à fournir des informations sincères et
            exactes lors de son inscription.
          </p>

          <p>
            L’Utilisateur est responsable de la confidentialité de ses
            identifiants. Il peut demander la suppression de son compte depuis
            son espace personnel ou en contactant l’éditeur.
          </p>

          <p>
            Le site peut être temporairement interrompu pour des raisons de
            maintenance, de sécurité ou de force majeure. Ces interruptions
            n’engagent pas la responsabilité de l’éditeur.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">
            Article 3 – Données à caractère personnel
          </h2>

          <p>
            Les données personnelles sont traitées conformément à la
            réglementation applicable, notamment au Règlement général sur la
            protection des données et à la loi Informatique et Libertés.
          </p>

          <p>
            L’Utilisateur dispose notamment d’un droit d’accès, de
            rectification, d’effacement, de limitation et, dans certains cas,
            d’opposition et de portabilité de ses données.
          </p>

          <p>
            Pour exercer ses droits, l’Utilisateur peut écrire à{" "}
            <a href={`mailto:${EMAIL}`} className="text-info">
              {EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">Article 4 – Propriété intellectuelle</h2>

          <p>
            Les textes, images, logos, marques et autres contenus du site sont
            protégés par le Code de la propriété intellectuelle.
          </p>

          <p>
            Toute reproduction, représentation, publication ou adaptation de
            ces contenus nécessite l’autorisation préalable de leur titulaire,
            sauf dans les cas prévus par la loi.
          </p>

          <p>
            Toute reproduction autorisée doit mentionner l’auteur et la source
            du contenu.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">Article 5 – Responsabilité</h2>

          <p>
            L’éditeur s’efforce de fournir des informations fiables et à jour.
            Il ne garantit toutefois pas que le site soit exempt d’erreurs,
            d’omissions ou d’interruptions.
          </p>

          <p>
            Les informations relatives aux recettes sont fournies à titre
            informatif. L’Utilisateur doit notamment vérifier les ingrédients,
            les allergènes et les règles d’hygiène correspondant à sa situation.
          </p>

          <p>
            L’Utilisateur est responsable de son compte et doit conserver son
            mot de passe secret. Toute utilisation effectuée depuis son compte
            est présumée avoir été réalisée par lui, sauf preuve contraire.
          </p>

          <p>
            La responsabilité de l’éditeur ne peut être engagée en cas de force
            majeure ou de fait imprévisible et insurmontable d’un tiers.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">Article 6 – Liens hypertextes</h2>

          <p>
            Le site peut contenir des liens vers des sites externes. L’éditeur
            n’exerce aucun contrôle sur ces sites et ne peut être tenu
            responsable de leur disponibilité ou de leur contenu.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">Article 7 – Cookies</h2>

          <p>
            Le site peut utiliser des cookies nécessaires à son fonctionnement
            ainsi que, sous réserve du consentement de l’Utilisateur, des
            cookies de mesure d’audience ou provenant de services tiers.
          </p>

          <p>
            L’Utilisateur peut gérer les cookies depuis le bandeau de
            consentement proposé sur le site et depuis les paramètres de son
            navigateur.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">
            Article 8 – Publications des utilisateurs
          </h2>

          <p>
            Les membres peuvent publier des recettes, des images, des
            ingrédients, des notes et des commentaires.
          </p>

          <p>
            L’Utilisateur s’engage à ne pas publier de contenu illicite,
            injurieux, diffamatoire, haineux, violent, trompeur ou portant
            atteinte aux droits d’un tiers.
          </p>

          <p>
            L’Utilisateur garantit disposer des droits nécessaires sur les
            textes et les images qu’il publie. Il reste titulaire de ses droits
            de propriété intellectuelle.
          </p>

          <p>
            En publiant un contenu, l’Utilisateur accorde au site une
            autorisation non exclusive et gratuite de l’héberger, de le
            reproduire et de l’afficher dans la mesure nécessaire au
            fonctionnement du service.
          </p>

          <p>
            Le site peut modérer, refuser ou supprimer un contenu qui ne
            respecte pas les présentes CGU ou la législation applicable.
          </p>

          <p>
            L’Utilisateur peut signaler un contenu depuis la fonctionnalité de
            signalement prévue sur le site ou en contactant l’éditeur.
          </p>
        </section>

        <section>
          <h2 className="h4 mt-5">
            Article 9 – Droit applicable et règlement des litiges
          </h2>

          <p>Les présentes CGU sont soumises au droit français.</p>

          <p>
            En cas de différend, les parties chercheront d’abord une solution
            amiable. À défaut d’accord, le litige pourra être porté devant la
            juridiction compétente conformément aux règles légales applicables.
          </p>

          <p>
            Pour toute question concernant les présentes CGU, l’Utilisateur
            peut contacter l’éditeur à l’adresse{" "}
            <a href={`mailto:${EMAIL}`} className="text-info">
              {EMAIL}
            </a>
            .
          </p>
        </section>

        <footer className="mt-5 pt-4 border-top">
          <p className="mb-0 fst-italic text-light">
            Document à faire vérifier par un professionnel du droit avant sa
            publication définitive.
          </p>
        </footer>
      </article>
    </main>
  );
}