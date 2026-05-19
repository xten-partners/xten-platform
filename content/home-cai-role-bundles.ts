export type CaiBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type CaiSection = {
  subtitle: string | null;
  blocks: CaiBlock[];
};

export type CaiBundle = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  leadBlocks: CaiBlock[];
  sections: CaiSection[];
};

const fr: CaiBundle = {
  eyebrow: "Le nouveau rôle de Chief AI Officer [CAIO, Directeur IA, CIO+, COO+]",
  headline: "Transformer l’organisation pour relever les défis de l’IA.",
  subheadline:
    "Le risque n’est pas d’avancer trop lentement. C’est d’avancer aveuglément.",
  leadBlocks: [
    {
      type: "p",
      text: "Pas simplement un expert. Pas un évangéliste. Pas un profil « innovation ».",
    },
    { type: "p", text: "Un leader capable :" },
    {
      type: "ul",
      items: [
        "d’arbitrer sous pression,",
        "de tenir un comex difficile quand les intérêts divergent,",
        "d’absorber la résistance interne,",
        "de maintenir de la clarté dans le bruit,",
        "et de transformer l’organisation pendant que ses repères changent.",
      ],
    },
    {
      type: "p",
      text: "Par expérience, les dirigeants qui ont déjà transformé sous contrainte et qui ont une vision IA sont les plus à même de réussir sans casser l’organisation. Parce qu’à ce niveau, le sujet n’est pas seulement l’outil. C’est le jugement.",
    },
  ],
  sections: [
    {
      subtitle: "Urgence et peur de passer à côté : FOMO (Fear Of Missing Out)",
      blocks: [
        { type: "p", text: "L’organisation voit :" },
        {
          type: "ul",
          items: [
            "les concurrents communiquer,",
            "les investisseurs pousser,",
            "les médias accélérer,",
            "les équipes expérimenter seules,",
            "le marché évoluer rapidement.",
          ],
        },
        {
          type: "p",
          text: "Alors une pression apparaît : « Nous devons faire quelque chose. Vite. »",
        },
        { type: "p", text: "Le problème est que cette pression produit souvent :" },
        {
          type: "ul",
          items: [
            "des initiatives dispersées,",
            "des décisions précipitées,",
            "des recrutements opportunistes,",
            "des projets sans gouvernance claire,",
            "une accumulation d’outils sans architecture réelle.",
          ],
        },
      ],
    },
    {
      subtitle: "Paralysie et prudence extrême",
      blocks: [
        { type: "p", text: "La peur de rater un virage. Ou celle de le prendre trop vite." },
        { type: "p", text: "Trop :" },
        {
          type: "ul",
          items: [
            "d’options,",
            "de scénarios,",
            "d’outils,",
            "d’avis contradictoires,",
            "de conséquences potentielles.",
          ],
        },
        { type: "p", text: "Chaque décision semble devenir stratégique." },
        { type: "p", text: "Alors les arbitrages sont repoussés." },
        { type: "p", text: "Les pilotes s’accumulent." },
        { type: "p", text: "Les discussions tournent en boucle." },
        {
          type: "p",
          text: "L’organisation entre dans une forme de paralysie sophistiquée.",
        },
      ],
    },
    {
      subtitle: "Surcharge cognitive",
      blocks: [
        { type: "p", text: "L’IA produit un flux permanent :" },
        {
          type: "ul",
          items: [
            "nouveaux outils,",
            "nouveaux usages,",
            "nouvelles promesses,",
            "nouvelles menaces,",
            "nouvelles injonctions.",
          ],
        },
        { type: "p", text: "Résultat :" },
        {
          type: "ul",
          items: [
            "réunions permanentes,",
            "surcharge mentale,",
            "fragmentation de l’attention,",
            "difficulté à prioriser,",
            "fatigue des équipes,",
            "perte de clarté.",
          ],
        },
        {
          type: "p",
          text: "Les dirigeants comme les équipes ont parfois le sentiment de devoir comprendre un sujet qui évolue plus vite que leur capacité à l’absorber.",
        },
      ],
    },
    {
      subtitle: "Représentations divergentes en silence",
      blocks: [
        {
          type: "p",
          text: "Entre excitation, anxiété et fatigue, le board, le comex, les managers et les équipes projettent souvent des choses très différentes sur l’IA.",
        },
        { type: "p", text: "Pour certains :" },
        {
          type: "ul",
          items: ["croissance,", "productivité,", "avantage compétitif."],
        },
        { type: "p", text: "Pour d’autres :" },
        {
          type: "ul",
          items: [
            "menace,",
            "pression supplémentaire,",
            "réduction de valeur,",
            "perte de contrôle.",
          ],
        },
        { type: "p", text: "C’est souvent la source :" },
        {
          type: "ul",
          items: [
            "de tensions internes,",
            "d’arbitrages incohérents,",
            "d’initiatives contradictoires,",
            "de résistance au changement,",
            "et de transformations qui s’essoufflent.",
          ],
        },
      ],
    },
    {
      subtitle: "Hyperactivité compulsive défensive",
      blocks: [
        { type: "p", text: "Certaines entreprises veulent montrer qu’elles avancent :" },
        {
          type: "ul",
          items: [
            "annonces,",
            "pilotes,",
            "labs,",
            "task forces,",
            "expérimentations multiples.",
          ],
        },
        {
          type: "p",
          text: "Les initiatives se multiplient mais pas toujours pour transformer réellement. Parfois simplement pour :",
        },
        {
          type: "ul",
          items: [
            "rassurer le board,",
            "rassurer les équipes,",
            "rassurer le marché,",
            "rassurer les investisseurs,",
            "ou se rassurer elles-mêmes.",
          ],
        },
      ],
    },
    {
      subtitle: "Solitude du dirigeant",
      blocks: [
        { type: "p", text: "À un certain niveau :" },
        {
          type: "ul",
          items: [
            "les enjeux deviennent politiques,",
            "les conséquences deviennent systémiques,",
            "les arbitrages deviennent sensibles,",
            "et les décisions ne peuvent plus être totalement déléguées.",
          ],
        },
        { type: "p", text: "Le dirigeant reçoit :" },
        {
          type: "ul",
          items: [
            "plus d’informations,",
            "plus d’opinions,",
            "plus de projections,",
            "mais rarement plus de clarté.",
          ],
        },
        {
          type: "p",
          text: "Cette solitude décisionnelle devient un sujet central.",
        },
      ],
    },
  ],
};

const en: CaiBundle = {
  eyebrow: "The new role of Chief AI Officer [CAIO, AI Director, CIO+, COO+]",
  headline: "Transforming the organization to meet the challenges of AI.",
  subheadline: "The risk is not moving too slowly. It is moving blindly.",
  leadBlocks: [
    {
      type: "p",
      text: "Not simply an expert. Not an evangelist. Not a generic “innovation” profile.",
    },
    { type: "p", text: "A leader able to:" },
    {
      type: "ul",
      items: [
        "arbitrate under pressure,",
        "hold a difficult executive committee when interests diverge,",
        "absorb internal resistance,",
        "maintain clarity in the noise,",
        "and transform the organization while its reference points shift.",
      ],
    },
    {
      type: "p",
      text: "In our experience, leaders who have already transformed under constraint—and who hold a clear view of AI—are best placed to succeed without breaking the organization. At this level, the issue is not only the tool. It is judgment.",
    },
  ],
  sections: [
    {
      subtitle: "Urgency and fear of missing out: FOMO",
      blocks: [
        { type: "p", text: "The organization sees:" },
        {
          type: "ul",
          items: [
            "competitors communicating,",
            "investors pushing,",
            "media accelerating,",
            "teams experimenting on their own,",
            "the market moving fast.",
          ],
        },
        {
          type: "p",
          text: "Then pressure appears: “We have to do something. Quickly.”",
        },
        { type: "p", text: "The problem is that this pressure often produces:" },
        {
          type: "ul",
          items: [
            "scattered initiatives,",
            "rushed decisions,",
            "opportunistic hiring,",
            "projects without clear governance,",
            "a pile-up of tools with no real architecture.",
          ],
        },
      ],
    },
    {
      subtitle: "Paralysis and extreme caution",
      blocks: [
        {
          type: "p",
          text: "Fear of missing the turn. Or of taking it too soon.",
        },
        { type: "p", text: "Too many:" },
        {
          type: "ul",
          items: [
            "options,",
            "scenarios,",
            "tools,",
            "contradictory opinions,",
            "potential consequences.",
          ],
        },
        { type: "p", text: "Every decision seems to become strategic." },
        { type: "p", text: "So trade-offs are postponed." },
        { type: "p", text: "Pilots accumulate." },
        { type: "p", text: "Discussions loop." },
        {
          type: "p",
          text: "The organization drifts into a form of sophisticated paralysis.",
        },
      ],
    },
    {
      subtitle: "Cognitive overload",
      blocks: [
        { type: "p", text: "AI produces a constant stream of:" },
        {
          type: "ul",
          items: [
            "new tools,",
            "new uses,",
            "new promises,",
            "new threats,",
            "new injunctions.",
          ],
        },
        { type: "p", text: "The result:" },
        {
          type: "ul",
          items: [
            "endless meetings,",
            "mental overload,",
            "fragmented attention,",
            "difficulty prioritizing,",
            "team fatigue,",
            "loss of clarity.",
          ],
        },
        {
          type: "p",
          text: "Leaders and teams sometimes feel they must absorb a topic that moves faster than they can process it.",
        },
      ],
    },
    {
      subtitle: "Divergent representations, in silence",
      blocks: [
        {
          type: "p",
          text: "Between excitement, anxiety, and fatigue, the board, the executive committee, managers, and teams often project very different things onto “AI.”",
        },
        { type: "p", text: "For some:" },
        {
          type: "ul",
          items: ["growth,", "productivity,", "competitive advantage."],
        },
        { type: "p", text: "For others:" },
        {
          type: "ul",
          items: [
            "threat,",
            "added pressure,",
            "eroding value,",
            "loss of control.",
          ],
        },
        { type: "p", text: "That mismatch is often the source of:" },
        {
          type: "ul",
          items: [
            "internal tension,",
            "incoherent trade-offs,",
            "contradictory initiatives,",
            "resistance to change,",
            "and transformations that run out of steam.",
          ],
        },
      ],
    },
    {
      subtitle: "Defensive compulsive hyperactivity",
      blocks: [
        {
          type: "p",
          text: "Some companies want to show they are moving:",
        },
        {
          type: "ul",
          items: [
            "announcements,",
            "pilots,",
            "labs,",
            "task forces,",
            "multiple experiments.",
          ],
        },
        {
          type: "p",
          text: "Initiatives multiply—but not always to truly transform. Sometimes simply to:",
        },
        {
          type: "ul",
          items: [
            "reassure the board,",
            "reassure teams,",
            "reassure the market,",
            "reassure investors,",
            "or reassure themselves.",
          ],
        },
      ],
    },
    {
      subtitle: "Executive solitude",
      blocks: [
        { type: "p", text: "At a certain level:" },
        {
          type: "ul",
          items: [
            "issues become political,",
            "consequences become systemic,",
            "trade-offs become sensitive,",
            "and decisions can no longer be fully delegated.",
          ],
        },
        { type: "p", text: "The leader receives:" },
        {
          type: "ul",
          items: [
            "more information,",
            "more opinions,",
            "more projections,",
            "but rarely more clarity.",
          ],
        },
        {
          type: "p",
          text: "That decision-making solitude becomes a central issue.",
        },
      ],
    },
  ],
};

export const homeCaiRoleBundles: Record<"fr" | "en", CaiBundle> = {
  fr,
  en,
};
