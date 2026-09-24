import { ouvrirPreferencesCookies } from "../useConsentement.js";
 
/**
 * À placer dans le pied de page :
 * <footer>Bravo Cuistot — © {new Date().getFullYear()} · <GererCookies /></footer>
 */
export default function GererCookies({ className }) {
  return (
    <button
      type="button"
      className={className}
      onClick={ouvrirPreferencesCookies}
      style={className ? undefined : {
        font: "inherit", color: "inherit", background: "none", border: 0,
        padding: 0, textDecoration: "underline", cursor: "pointer"
      }}
    >
      Gérer mes cookies
    </button>
  );
}