/* Catalogue Ludogo — c'est ici qu'on ajoute ou corrige un jeu / une application.
   shots : captures dans /shots (la 1re est l'image principale). */
window.CATALOG = {
  games: [
    /* Mini Castle Invasion — masqué du site (vendu sur Google Play). Retirer ce commentaire pour le remettre.
    {
      id: 'mci', name: 'Mini Castle Invasion', version: 'v6.5', kind: 'Défense de château 3D',
      url: 'https://mini-castle-invasion.vercel.app',
      desc: "Défends ton château, vague après vague, à travers 12 époques, de la Préhistoire à 2050 : bâtis des tours, répare la muraille, fais évoluer ton château et lance tes troupes. Quatre modes en solo (Zombies, Affrontement contre l'IA, Combat aérien, Combat naval), du multijoueur en local et une progression d'époques à débloquer. Conçu pour le smartphone en portrait.",
      chips: ['Smartphone en portrait', 'Solo & multijoueur local', 'Installable'],
      shots: ['mci-1', 'mci-2', 'mci-3'],
    },
    */
    {
      id: 'moto', name: 'MotoXplosion', version: 'v2.58', kind: 'Motocross 2,5D',
      url: 'https://motoxplosion.vercel.app',
      desc: "Motocross vu de côté dans de grands paysages peints (scène 3D, rendu cartoon). Une balade infinie en mode Cruising, ou des circuits en Trial, Enduro, Course et Circuit, sur cinq régions (Alpes, Grande Forêt, Canyon, Désert, San Francisco). Une physique de moto exigeante, un garage de motos à gagner et un mode Multijoueur.",
      chips: ['Smartphone en paysage', 'Solo & multijoueur', 'Installable'],
      shots: ['moto-1', 'moto-2', 'moto-3'],
    },
    {
      id: 'mm', name: 'Mini Mission', version: 'v0.28', kind: 'Plateforme 2D pour enfants',
      url: 'https://minimission-rho.vercel.app',
      desc: "Des missions d'entraide à enchaîner dans dix villes du monde avec trois héros : Ziggy la Comète (course et turbo), Filou le Tisseur (toile et balancements) et Titan Puce (coups de poing contre les obstacles). Rien n'est jamais punitif : ni mort, ni dégâts. Des albums à remplir et un mode d'emploi intégré.",
      chips: ['Smartphone & tablette', 'Dès le plus jeune âge', 'Installable'],
      shots: ['mm-1', 'mm-2', 'mm-3'],
    },
    {
      id: 'ci', name: 'Castle Invasion', version: 'v11.4', kind: 'Stratégie en temps réel',
      url: 'https://castle-invasion.vercel.app',
      desc: "Une forteresse médiévale, une muraille de 200 m en cinq secteurs, des hordes de zombies. Fais vivre ton village (bois, pierre, fermes, moulins, forge, marchés), forme archers et soldats, donne tes ordres au doigt ou à la souris (sélection au rectangle, groupes, registre de l'armée), colmate les brèches et brûle l'ennemi avec des feux de bois. Un jeu riche et exigeant, plus long à prendre en main que Mini Castle Invasion.",
      chips: ['Smartphone, tablette & PC', 'Solo', 'Installable'],
      shots: ['ci-1', 'ci-2', 'ci-3'],
    },
    /* CitadelleX — en pause (masqué du site). Retirer ce commentaire pour le remettre.
    {
      id: 'cx', name: 'CitadelleX', version: 'v1.0', kind: 'Défense de citadelle 3D',
      url: 'https://citadellex.vercel.app',
      desc: "La grande sœur de Mini Castle Invasion, pensée pour la tablette et le PC : tiens la palissade et protège la tribu à travers 10 époques, de 10 000 av. J.-C. à 2050. Un monde plus large (muraille de 42 m, 7 emplacements de défense), une interface à panneaux latéraux, souris, clavier et zoom, un mode Deux joueurs, et des parties de 20 vagues d'environ 20 minutes.",
      chips: ['Tablette & PC', '1 à 2 joueurs', 'Installable'],
      shots: ['cx-1', 'cx-2', 'cx-3'],
    },
    */
    {
      id: 'sim', name: 'Simulacre', version: 'v3.9', kind: 'Intelligence autonome',
      url: 'https://simulacre-rho.vercel.app',
      desc: "Une expérience d'intelligence autonome : Néo naît sans rien savoir et apprend tout seul — son corps, les objets, les mots, les autres. Personne ne lui explique rien. Tu observes : ses parents veillent sur lui et élargissent peu à peu l'espace où il a le droit d'aller, son sommeil trie sa mémoire, et le quartier vit autour de lui.",
      chips: ['Observation', 'Navigateur', 'Installable'],
      shots: ['sim-1', 'sim-2', 'sim-3'],
    },
    {
      id: 'man', name: 'Manati', version: '', kind: 'Plateforme 2D',
      url: 'https://manati-mu.vercel.app',
      desc: "Les Zorks attaquent les grandes villes : une famille de héros part les repousser dans un jeu de plateforme à défilement horizontal. Une carte de missions racontée par actes, des tenues aux pouvoirs différents, des alliés à appeler en renfort et un boss à vaincre dans chaque ville. La difficulté s'adapte à l'âge du joueur.",
      chips: ['PC (clavier) & smartphone', 'Solo', 'Sauvegarde dans le navigateur'],
      shots: ['man-1', 'man-2', 'man-3'],
    },
  ],
  apps: [
    {
      id: 'nba', name: 'NBA Pulse', version: '', kind: 'NBA sans spoiler',
      url: 'https://nba-pulse-app.vercel.app',
      desc: "Ta soirée NBA, sans spoiler. Choisis jusqu'à cinq équipes favorites, retrouve les matchs de la veille, les box scores, les classements par conférence et les fiches joueurs. Des résumés tactiques générés par IA, six langues (dont l'arabe, interface de droite à gauche), pensée d'abord pour Android.",
      chips: ['Android d\'abord', '6 langues', 'Installable'],
      shots: ['nba-1'],
    },
    {
      id: 'cross', name: 'Cross Travel', version: '', kind: 'Itinéraires VTT, vélo & moto',
      url: 'https://cross-travel.vercel.app',
      desc: "Prépare tes itinéraires VTT, vélo familial et motocross sur OpenStreetMap : recherche de lieux, départ depuis le GPS, calcul adapté à chaque profil, guidage plein écran avec voix, recalcul après écart, favoris et export GPX. Fond de carte OpenStreetMap ou satellite.",
      chips: ['GPS', 'Export GPX', 'Installable'],
      shots: ['cross-1'],
    },
    {
      id: 'numa', name: 'NUMA', version: '', kind: 'Budget mensuel',
      url: 'https://numa-tawny.vercel.app',
      desc: "Ton budget mensuel en clair : revenus et dépenses récurrents, enveloppes, suivi du réel. Jamais connecté à une banque : tes données restent sur ton appareil, même hors ligne, avec sauvegarde JSON ou CSV et synchronisation cloud facultative avec un compte Google.",
      chips: ['Hors ligne', 'Données sur l\'appareil', 'Installable'],
      shots: ['numa-1'],
    },
    {
      id: 'tesla', name: 'Tesla GPS', version: '', kind: 'GPS pour Tesla',
      url: 'https://gpstesla.vercel.app',
      desc: "Un GPS minimaliste pour le navigateur de la Tesla Model 3 : carte satellite, vitesse GPS en km/h et silhouette de ta voiture vue du dessus. Les radars fixes de Belgique sont affichés, avec un bip unique à moins de 100 m si tu dépasses la limite connue.",
      chips: ['Écran de voiture', 'Belgique', 'Installable'],
      shots: ['tesla-1'],
    },
    {
      id: 'home', name: 'HomeManual', version: '', kind: 'Carnet de la maison',
      url: 'https://home-manual-pi.vercel.app',
      desc: "Le carnet de la maison : toutes les informations utiles de la maison, au même endroit.",
      chips: ['Smartphone', 'Installable'],
      shots: ['home-1'],
    },
  ],
};
