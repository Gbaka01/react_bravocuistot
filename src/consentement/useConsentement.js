import { useEffect, useState } from "react";
 
/**
 * Renvoie le choix du visiteur ({ essentiels, audience, tiers }) ou null
 * s'il n'a pas encore choisi. Se met à jour dès qu'il modifie son choix.
 */
export function useConsentement() {
  const [choix, setChoix] = useState(() => window.BCConsentement?.choix() ?? null);
 
  useEffect(() => {
    const maj = (e) => setChoix(e.detail);
    document.addEventListener("bcc:choix", maj);
    // Au cas où le script aurait été prêt après le premier rendu
    if (window.BCConsentement) setChoix(window.BCConsentement.choix());
    return () => document.removeEventListener("bcc:choix", maj);
  }, []);
 
  return choix;
}
 
export function ouvrirPreferencesCookies() {
  window.BCConsentement?.ouvrir();
}
 
export function autoriserCategorie(categorie) {
  window.BCConsentement?.autoriser(categorie);
}
 import { useEffect, useState } from "react";
 
/**
 * Renvoie le choix du visiteur ({ essentiels, audience, tiers }) ou null
 * s'il n'a pas encore choisi. Se met à jour dès qu'il modifie son choix.
 */
export function useConsentement() {
  const [choix, setChoix] = useState(() => window.BCConsentement?.choix() ?? null);
 
  useEffect(() => {
    const maj = (e) => setChoix(e.detail);
    document.addEventListener("bcc:choix", maj);
    // Au cas où le script aurait été prêt après le premier rendu
    if (window.BCConsentement) setChoix(window.BCConsentement.choix());
    return () => document.removeEventListener("bcc:choix", maj);
  }, []);
 
  return choix;
}
 
export function ouvrirPreferencesCookies() {
  window.BCConsentement?.ouvrir();
}
 
export function autoriserCategorie(categorie) {
  window.BCConsentement?.autoriser(categorie);
}
 