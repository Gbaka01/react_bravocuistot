import { useConsentement, autoriserCategorie } from "../useConsentement.js";
 
/**
 * Vidéo YouTube (ou autre) affichée seulement si le visiteur accepte
 * les « Contenus tiers ». Sinon, un encadré propose de l'autoriser.
 *
 * <VideoRecette src="https://www.youtube-nocookie.com/embed/ID" titre="Poulet yassa en vidéo" />
 */
export default function VideoRecette({ src, titre }) {
  const choix = useConsentement();
 
  if (!choix?.tiers) {
    return (
      <div className="bcc-substitut">
        <p>
          Cette vidéo est hébergée par un autre site, qui peut déposer des cookies.
          Elle s’affichera si vous autorisez les contenus tiers.
        </p>
        <button type="button" className="bcc-btn" onClick={() => autoriserCategorie("tiers")}>
          Autoriser et afficher
        </button>
      </div>
    );
  }
 
  return (
    <iframe
      src={src}
      title={titre}
      style={{ width: "100%", aspectRatio: "16 / 9", border: 0, borderRadius: 10 }}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
 