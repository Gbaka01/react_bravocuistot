/*!
 * Bandeau de consentement aux cookies — bravocuistot-goli.fr (Bravo Cuistot)
 * Compatible avec un site généré en JavaScript : les vidéos et scripts ajoutés
 * après le chargement de la page sont aussi soumis au consentement.
 * Autonome : aucun fichier CSS ni bibliothèque à ajouter.
 *
 * Intégration :
 *   <script src="/consentement.js" defer></script>   (avant </body>, sur chaque page)
 *
 * Scripts soumis au consentement :
 *   <script type="text/plain" data-consent="audience" data-src="https://..."></script>
 *   <script type="text/plain" data-consent="audience"> ...code... </script>
 *
 * Contenus tiers (vidéos, cartes) :
 *   <iframe data-consent="tiers" data-src="https://..." title="..."></iframe>
 *
 * Dans React : window.BCConsentement.choix(), .ouvrir(), .autoriser("tiers")
 *   et l'événement document « bcc:choix ».
 *
 * Lien « Gérer mes cookies » (pied de page) :
 *   <a href="#" data-bcc-ouvrir>Gérer mes cookies</a>
 */
(function () {
  "use strict";
 
  /* ------------------------------------------------------------------ */
  /* Réglages                                                            */
  /* ------------------------------------------------------------------ */
  var CONFIG = {
    cle: "bc-consentement",
    version: 1,              // incrémenter pour redemander le consentement à tous
    dureeJours: 182,         // 6 mois, durée recommandée par la CNIL
    lienPolitique: "/mentions#cookies",
    categories: [
      {
        id: "essentiels",
        titre: "Essentiels",
        texte: "Nécessaires au fonctionnement du site, comme la mémorisation de vos choix. Toujours actifs.",
        obligatoire: true
      },
      {
        id: "audience",
        titre: "Mesure d’audience",
        texte: "Statistiques de fréquentation, pour savoir quelles recettes sont les plus consultées.",
        cookies: ["_ga", "_gid", "_pk_", "_hj"] // préfixes supprimés en cas de retrait
      },
      {
        id: "tiers",
        titre: "Contenus tiers",
        texte: "Vidéos de recettes et contenus intégrés depuis d’autres sites. Ces services peuvent déposer leurs propres cookies."
      }
    ]
  };
 
  /* ------------------------------------------------------------------ */
  /* Styles                                                              */
  /* ------------------------------------------------------------------ */
  var CSS = [
    ".bcc-bandeau,.bcc-voile,.bcc-substitut{--bcc-papier:#fff;--bcc-encre:#1e2220;--bcc-gris:#5a615d;--bcc-trait:#d9ddd8;",
    "--bcc-basilic:#2f6b4f;--bcc-basilic-fonce:#24543e;--bcc-estompe:#eef3ef;",
    "font-family:inherit;color:var(--bcc-encre);box-sizing:border-box}",
    ".bcc-bandeau *,.bcc-voile *{box-sizing:inherit}",
    ".bcc-bandeau[hidden],.bcc-voile[hidden]{display:none!important}",
 
    /* Bandeau façon ticket de cuisine : bord supérieur dentelé */
    ".bcc-bandeau{position:fixed;left:0;right:0;bottom:0;z-index:9998;background:var(--bcc-papier);",
    "padding:1.3rem 1.5rem calc(1.3rem + env(safe-area-inset-bottom,0px));",
    "filter:drop-shadow(0 -1px 0 var(--bcc-trait)) drop-shadow(0 -6px 14px rgba(30,34,32,.08));",
    "animation:bcc-sortie .45s cubic-bezier(.2,.8,.2,1)}",
    ".bcc-bandeau::before{content:'';position:absolute;left:0;right:0;top:-9px;height:10px;",
    "background:linear-gradient(-45deg,var(--bcc-papier) 7px,transparent 0) 0 100%/14px 14px repeat-x,",
    "linear-gradient(45deg,var(--bcc-papier) 7px,transparent 0) 0 100%/14px 14px repeat-x}",
    "@keyframes bcc-sortie{from{transform:translateY(100%)}to{transform:none}}",
    ".bcc-interieur{max-width:72rem;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1.1rem 2.5rem}",
    ".bcc-texte{flex:1 1 30rem;max-width:64ch;margin:0;font-size:.95rem;line-height:1.55}",
    ".bcc-texte strong{display:block;font-size:1.05rem;font-weight:700;margin-bottom:.2rem}",
    ".bcc-bandeau a,.bcc-voile a{color:var(--bcc-basilic);text-underline-offset:3px}",
    ".bcc-actions{display:flex;flex-wrap:wrap;gap:.5rem}",
 
    /* Boutons : « Tout refuser » et « Tout accepter » ont le même poids visuel */
    ".bcc-btn{font:inherit;font-size:.92rem;font-weight:600;line-height:1.2;min-height:44px;padding:.7rem 1.2rem;cursor:pointer;",
    "border:2px solid var(--bcc-basilic);border-radius:999px;background:var(--bcc-basilic);color:#fff}",
    ".bcc-btn:hover{background:var(--bcc-basilic-fonce);border-color:var(--bcc-basilic-fonce)}",
    ".bcc-btn--leger{background:transparent;color:var(--bcc-basilic)}",
    ".bcc-btn--leger:hover{background:var(--bcc-estompe);color:var(--bcc-basilic-fonce)}",
    ".bcc-btn:focus-visible,.bcc-bandeau a:focus-visible,.bcc-voile a:focus-visible,.bcc-fermer:focus-visible,",
    ".bcc-interrupteur input:focus-visible+.bcc-piste{outline:3px solid var(--bcc-encre);outline-offset:3px}",
 
    /* Panneau de préférences */
    ".bcc-voile{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;",
    "padding:1rem;background:rgba(30,34,32,.5)}",
    ".bcc-panneau{position:relative;width:100%;max-width:34rem;max-height:calc(100% - 2rem);overflow:auto;",
    "background:var(--bcc-papier);border-radius:10px;padding:2rem 2rem 1.6rem}",
    ".bcc-panneau h2{margin:0 2.5rem .6rem 0;font-size:1.4rem;font-weight:700;line-height:1.3}",
    ".bcc-panneau>p{margin:0 0 1.2rem;font-size:.95rem;line-height:1.6;color:var(--bcc-gris)}",
    ".bcc-fermer{position:absolute;top:1rem;right:1rem;width:44px;height:44px;border:0;background:none;",
    "font-size:1.6rem;line-height:1;color:var(--bcc-encre);cursor:pointer;border-radius:50%}",
    ".bcc-categorie{display:grid;grid-template-columns:1fr auto;gap:.25rem 1.5rem;align-items:center;",
    "padding:1rem 0;border-top:1px dashed var(--bcc-trait)}",
    ".bcc-categorie:last-of-type{border-bottom:1px dashed var(--bcc-trait)}",
    ".bcc-categorie h3{margin:0;font-size:1rem;font-weight:700}",
    ".bcc-categorie p{grid-column:1;margin:0;font-size:.88rem;line-height:1.55;color:var(--bcc-gris)}",
    ".bcc-categorie .bcc-interrupteur,.bcc-categorie .bcc-toujours{grid-column:2;grid-row:1/span 2}",
    ".bcc-toujours{font-size:.85rem;color:var(--bcc-gris)}",
 
    /* Interrupteur */
    ".bcc-interrupteur{position:relative;display:inline-block;cursor:pointer}",
    ".bcc-interrupteur input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}",
    ".bcc-piste{display:block;width:46px;height:26px;border:2px solid var(--bcc-gris);border-radius:13px;",
    "background:var(--bcc-papier);transition:background .2s,border-color .2s}",
    ".bcc-piste::after{content:'';position:absolute;top:5px;left:5px;width:16px;height:16px;border-radius:50%;",
    "background:var(--bcc-gris);transition:transform .2s,background .2s}",
    ".bcc-interrupteur input:checked+.bcc-piste{background:var(--bcc-basilic);border-color:var(--bcc-basilic)}",
    ".bcc-interrupteur input:checked+.bcc-piste::after{transform:translateX(20px);background:#fff}",
    ".bcc-panneau .bcc-actions{margin-top:1.4rem;justify-content:flex-end}",
 
    /* Remplaçant des vidéos bloquées */
    ".bcc-substitut{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:.8rem;",
    "padding:1.5rem;min-height:12rem;border:1px dashed #b9c2bc;border-radius:10px;background:#eef3ef;color:#1e2220;",
    "font-size:.92rem;line-height:1.55}",
    ".bcc-substitut p{margin:0;max-width:48ch}",
 
    "@media (max-width:640px){.bcc-actions{width:100%}.bcc-actions .bcc-btn{flex:1 1 auto}",
    ".bcc-panneau{padding:1.6rem 1.25rem 1.25rem}}",
    "@media (prefers-reduced-motion:reduce){.bcc-bandeau{animation:none}",
    ".bcc-piste,.bcc-piste::after{transition:none}}"
  ].join("");
 
  /* ------------------------------------------------------------------ */
  /* Stockage du choix                                                   */
  /* ------------------------------------------------------------------ */
  function lire() {
    try {
      var v = JSON.parse(localStorage.getItem(CONFIG.cle));
      if (!v || v.version !== CONFIG.version) return null;
      if (Date.now() - v.date > CONFIG.dureeJours * 864e5) return null;
      return v.choix;
    } catch (e) {
      return null;
    }
  }
 
  function ecrire(choix) {
    try {
      localStorage.setItem(CONFIG.cle, JSON.stringify({ version: CONFIG.version, date: Date.now(), choix: choix }));
    } catch (e) { /* stockage indisponible : le bandeau réapparaîtra */ }
  }
 
  function choixComplet(valeur) {
    var c = {};
    CONFIG.categories.forEach(function (cat) { c[cat.id] = cat.obligatoire ? true : valeur; });
    return c;
  }
 
  function supprimerCookies(prefixes) {
    var hotes = [location.hostname, "." + location.hostname.replace(/^www\./, "")];
    document.cookie.split(";").forEach(function (c) {
      var nom = c.split("=")[0].trim();
      if (!prefixes.some(function (p) { return nom.indexOf(p) === 0; })) return;
      var expire = nom + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = expire;
      hotes.forEach(function (h) { document.cookie = expire + "; domain=" + h; });
    });
  }
 
  /* ------------------------------------------------------------------ */
  /* Activation des scripts et contenus autorisés                        */
  /* ------------------------------------------------------------------ */
  function activer(choix) {
    var scripts = document.querySelectorAll('script[type="text/plain"][data-consent]');
    Array.prototype.forEach.call(scripts, function (ancien) {
      if (!choix[ancien.getAttribute("data-consent")] || ancien.hasAttribute("data-bcc-actif")) return;
      var s = document.createElement("script");
      Array.prototype.forEach.call(ancien.attributes, function (a) {
        if (["type", "data-consent", "data-src"].indexOf(a.name) === -1) s.setAttribute(a.name, a.value);
      });
      if (ancien.getAttribute("data-src")) s.src = ancien.getAttribute("data-src");
      else s.text = ancien.text;
      ancien.setAttribute("data-bcc-actif", "");
      ancien.parentNode.insertBefore(s, ancien.nextSibling);
    });
 
    var cadres = document.querySelectorAll("iframe[data-consent][data-src]");
    Array.prototype.forEach.call(cadres, function (cadre) {
      var autorise = !!choix[cadre.getAttribute("data-consent")];
      var substitut = cadre.previousElementSibling;
      var aSubstitut = substitut && substitut.classList.contains("bcc-substitut");
      if (autorise) {
        if (aSubstitut) substitut.remove();
        cadre.hidden = false;
        if (!cadre.src) cadre.src = cadre.getAttribute("data-src");
      } else if (!aSubstitut) {
        cadre.hidden = true;
        var bloc = document.createElement("div");
        bloc.className = "bcc-substitut";
        bloc.innerHTML =
          "<p>Cette vidéo est hébergée par un autre site, qui peut déposer des cookies. " +
          "Elle s’affichera si vous autorisez les contenus tiers.</p>" +
          '<button type="button" class="bcc-btn">Autoriser et afficher</button>';
        bloc.querySelector("button").addEventListener("click", function () {
          var c = lire() || choixComplet(false);
          c.tiers = true;
          enregistrer(c);
        });
        cadre.parentNode.insertBefore(bloc, cadre);
      }
    });
  }
 
  /* ------------------------------------------------------------------ */
  /* Interface                                                           */
  /* ------------------------------------------------------------------ */
  var bandeau, voile, derniereCible;
 
  function construire() {
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
 
    bandeau = document.createElement("div");
    bandeau.className = "bcc-bandeau";
    bandeau.setAttribute("role", "region");
    bandeau.setAttribute("aria-label", "Consentement aux cookies");
    bandeau.hidden = true;
    bandeau.innerHTML =
      '<div class="bcc-interieur">' +
      '<p class="bcc-texte"><strong>Avant de passer en cuisine</strong>Avec votre accord, Bravo Cuistot mesure sa fréquentation ' +
      "et affiche les vidéos de recettes hébergées sur d’autres sites. Si vous refusez, toutes les recettes restent accessibles. " +
      '<a href="' + CONFIG.lienPolitique + '">En savoir plus</a></p>' +
      '<div class="bcc-actions">' +
      '<button type="button" class="bcc-btn" data-bcc="refuser">Tout refuser</button>' +
      '<button type="button" class="bcc-btn bcc-btn--leger" data-bcc="personnaliser">Personnaliser</button>' +
      '<button type="button" class="bcc-btn" data-bcc="accepter">Tout accepter</button>' +
      "</div></div>";
 
    var lignes = CONFIG.categories.map(function (cat) {
      var commande = cat.obligatoire
        ? '<span class="bcc-toujours">Toujours actifs</span>'
        : '<label class="bcc-interrupteur"><input type="checkbox" role="switch" data-cat="' + cat.id +
          '" aria-labelledby="bcc-cat-' + cat.id + '" aria-describedby="bcc-desc-' + cat.id + '">' +
          '<span class="bcc-piste" aria-hidden="true"></span></label>';
      return '<div class="bcc-categorie"><h3 id="bcc-cat-' + cat.id + '">' + cat.titre + "</h3>" + commande +
        '<p id="bcc-desc-' + cat.id + '">' + cat.texte + "</p></div>";
    }).join("");
 
    voile = document.createElement("div");
    voile.className = "bcc-voile";
    voile.hidden = true;
    voile.innerHTML =
      '<div class="bcc-panneau" role="dialog" aria-modal="true" aria-labelledby="bcc-titre">' +
      '<button type="button" class="bcc-fermer" data-bcc="fermer" aria-label="Fermer">×</button>' +
      '<h2 id="bcc-titre">Préférences de cookies</h2>' +
      "<p>Choisissez les services que vous autorisez. Vous pourrez modifier ce choix à tout moment " +
      "depuis le lien « Gérer mes cookies » en bas de page.</p>" +
      lignes +
      '<div class="bcc-actions">' +
      '<button type="button" class="bcc-btn bcc-btn--leger" data-bcc="refuser">Tout refuser</button>' +
      '<button type="button" class="bcc-btn bcc-btn--leger" data-bcc="accepter">Tout accepter</button>' +
      '<button type="button" class="bcc-btn" data-bcc="enregistrer">Enregistrer mes choix</button>' +
      "</div></div>";
 
    document.body.appendChild(bandeau);
    document.body.appendChild(voile);
 
    [bandeau, voile].forEach(function (el) {
      el.addEventListener("click", function (e) {
        var b = e.target.closest("[data-bcc]");
        if (!b) {
          if (e.target === voile) fermerPanneau();
          return;
        }
        var action = b.getAttribute("data-bcc");
        if (action === "accepter") enregistrer(choixComplet(true));
        else if (action === "refuser") enregistrer(choixComplet(false));
        else if (action === "personnaliser") ouvrirPanneau();
        else if (action === "fermer") fermerPanneau();
        else if (action === "enregistrer") {
          var c = choixComplet(false);
          voile.querySelectorAll("input[data-cat]").forEach(function (i) { c[i.getAttribute("data-cat")] = i.checked; });
          enregistrer(c);
        }
      });
    });
 
    voile.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { fermerPanneau(); return; }
      if (e.key !== "Tab") return;
      var f = voile.querySelectorAll("button, a[href], input");
      var premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    });
 
    document.addEventListener("click", function (e) {
      var lien = e.target.closest("[data-bcc-ouvrir]");
      if (lien) { e.preventDefault(); ouvrirPanneau(); }
    });
  }
 
  function ouvrirPanneau() {
    derniereCible = document.activeElement;
    var c = lire() || choixComplet(false);
    voile.querySelectorAll("input[data-cat]").forEach(function (i) { i.checked = !!c[i.getAttribute("data-cat")]; });
    voile.hidden = false;
    voile.querySelector("h2").setAttribute("tabindex", "-1");
    voile.querySelector("h2").focus();
  }
 
  function fermerPanneau() {
    voile.hidden = true;
    if (!lire()) { bandeau.hidden = false; bandeau.querySelector("[data-bcc='personnaliser']").focus(); }
    else if (derniereCible && derniereCible.focus) derniereCible.focus();
  }
 
  function enregistrer(nouveau) {
    var ancien = lire();
    ecrire(nouveau);
    voile.hidden = true;
    bandeau.hidden = true;
    document.dispatchEvent(new CustomEvent("bcc:choix", { detail: nouveau }));
 
    // Retrait d'un consentement : on efface les cookies concernés et on recharge
    // pour arrêter les scripts déjà lancés.
    var retrait = false;
    if (ancien) {
      CONFIG.categories.forEach(function (cat) {
        if (ancien[cat.id] && !nouveau[cat.id]) {
          retrait = true;
          if (cat.cookies) supprimerCookies(cat.cookies);
        }
      });
    }
    if (retrait) { location.reload(); return; }
    activer(nouveau);
    if (derniereCible && derniereCible.focus && document.contains(derniereCible)) derniereCible.focus();
  }
 
  /* ------------------------------------------------------------------ */
  /* Démarrage                                                           */
  /* ------------------------------------------------------------------ */
  function demarrer() {
    construire();
    var choix = lire();
    if (choix) activer(choix);
    else { activer(choixComplet(false)); bandeau.hidden = false; }
 
    // Le site affiche ses pages en JavaScript : on surveille les vidéos et
    // scripts ajoutés plus tard pour leur appliquer le choix du visiteur.
    if ("MutationObserver" in window) {
      var attente = null;
      new MutationObserver(function (mutations) {
        var pertinent = mutations.some(function (m) {
          return Array.prototype.some.call(m.addedNodes, function (n) {
            return n.nodeType === 1 && !n.closest(".bcc-bandeau,.bcc-voile,.bcc-substitut") &&
              (n.matches("[data-consent]") || n.querySelector("[data-consent]"));
          });
        });
        if (!pertinent || attente) return;
        attente = setTimeout(function () { attente = null; activer(lire() || choixComplet(false)); }, 50);
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
 
  window.BCConsentement = {
    ouvrir: function () { ouvrirPanneau(); },
    choix: function () { return lire(); },
    // Autorise une catégorie (ex. "tiers") depuis l'application React
    autoriser: function (categorie) {
      var c = lire() || choixComplet(false);
      c[categorie] = true;
      enregistrer(c);
    }
  };
 
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
 