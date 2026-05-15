/**
 * Xten Partners — images éditoriales propriétaires
 * Découpées depuis le collage direction artistique (boardroom, gouvernance, mandat).
 * Fichiers : public/images/editorial/
 */

export type EditorialImageRole =
  | "hero"
  | "strategicReflection"
  | "boardGovernance"
  | "confidentialMandate"
  | "executivePresence";

export type EditorialImageAsset = {
  src: string;
  objectPosition: string;
  /** Texte alternatif — images décoratives/atmosphériques */
  alt: string;
  role: EditorialImageRole;
};

function localAsset(
  path: string,
  objectPosition: string,
  alt: string,
  role: EditorialImageRole,
): EditorialImageAsset {
  return { src: path, objectPosition, alt, role };
}

const editorialBase = "/images/editorial";

/** Slots utilisés sur le site */
export const editorialImages = {
  /** Salle de conseil — autorité calme, perspective stratégique */
  hero: localAsset(
    `${editorialBase}/hero-boardroom.jpg`,
    "50% 42%",
    "Salle de conseil feutrée, lumière naturelle et skyline en arrière-plan",
    "hero",
  ),
  /** Écriture stratégique — intention, clarté */
  services: localAsset(
    `${editorialBase}/detail-writing.jpg`,
    "52% 48%",
    "Main rédigeant dans un carnet en cuir, geste de décision",
    "strategicReflection",
  ),
  /** Fenêtre sur la ville — dialogue confidentiel au sommet */
  mandate: localAsset(
    `${editorialBase}/mandate-window.jpg`,
    "50% 38%",
    "Silhouettes exécutives face à la ville, moment de réflexion collective",
    "boardGovernance",
  ),
  /** Papeterie exécutive — discrétion, engagement */
  atmosphere: localAsset(
    `${editorialBase}/detail-stationery.jpg`,
    "50% 52%",
    "Carnets et stylo sur bureau, atmosphère de mandat confidentiel",
    "confidentialMandate",
  ),
} as const satisfies Record<string, EditorialImageAsset>;

/** Réserve — détails d’ambiance pour futures sections */
export const editorialImageReserve = {
  lamp: localAsset(
    `${editorialBase}/detail-lamp.jpg`,
    "50% 45%",
    "Lampe de bureau et lumière de fin de journée",
    "executivePresence",
  ),
  texture: localAsset(
    `${editorialBase}/detail-texture.jpg`,
    "50% 50%",
    "Textures pierre et bois, architecture intérieure feutrée",
    "executivePresence",
  ),
  corridor: localAsset(
    `${editorialBase}/detail-corridor.jpg`,
    "55% 50%",
    "Couloir de cabinet, transparence et discrétion",
    "executivePresence",
  ),
} as const;
