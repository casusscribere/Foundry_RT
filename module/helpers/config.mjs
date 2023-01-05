export const ROGUETRADER = {};

ROGUETRADER.Attributes = {
  "weaponskill"   : {name: "Weapon Skill",    abbrev: "WS"},
  "ballisticskill": {name: "Ballistic Skill", abbrev: "BS"},
  "strength"      : {name: "Strength",        abbrev: "S"},
  "toughness"     : {name: "Toughness",       abbrev: "T"},
  "agility"       : {name: "Agility",         abbrev: "Agi"},
  "intelligence"  : {name: "Intelligence",    abbrev: "Int"},
  "perception"    : {name: "Perception",      abbrev: "Per"},
  "willpower"     : {name: "Willpower",       abbrev: "WP"},
  "fellowship"    : {name: "Fellowship",      abbrev: "Fel"},
  "influence"     : {name: "Influence",       abbrev: "Inf"},
}

ROGUETRADER.Skills = {
  "acrobatics"          :  {name: "Acrobatics",         attribute: "agility"},
  "athletics"           :  {name: "Athletics",          attribute: "strength"},
  "awareness"           :  {name: "Awareness",          attribute: "perception"},
  "charm"               :  {name: "Charm",              attribute: "fellowship"},
  "command"             :  {name: "Command",            attribute: "fellowship"},
  "commerce"            :  {name: "Commerce",           attribute: "fellowship"},
  "deceive"             :  {name: "Deceive",            attribute: "fellowship"},
  "dodge"               :  {name: "Dodge",              attribute: "agility"},
  "inquiry"             :  {name: "Inquiry",            attribute: "fellowship"},
  "interrogation"       :  {name: "Interrogation",      attribute: "willpower"},
  "intimidate"          :  {name: "Intimidate",         attribute: "strength"},
  "logic"               :  {name: "Logic",              attribute: "intelligence"},
  "medicae"             :  {name: "Medicae",            attribute: "intelligence"},
  "navigatesurface"     :  {name: "Navigate(surface)",  attribute: "intelligence"},
  "navigatestellar"     :  {name: "Navigate(stellar)",  attribute: "intelligence"},
  "navigatewarp"        :  {name: "Navigate(warp)",     attribute: "intelligence"},
  "operateaeronautica"  :  {name: "Operate(aero)",      attribute: "agility"},
  "operatesurface"      :  {name: "Operate(surface)",   attribute: "agility"},
  "operatevoidship"     :  {name: "Operate(voidship)",  attribute: "agility"},
  "parry"               :  {name: "Parry",              attribute: "weaponskill"},
  "psyniscience"        :  {name: "Psyniscience",       attribute: "willpower"},
  "scrutiny"            :  {name: "Scrutiny",           attribute: "perception"},
  "security"            :  {name: "Security",           attribute: "intelligence"},
  "sleightofhand"       :  {name: "Sleight of hand",    attribute: "agility"},
  "stealth"             :  {name: "Stealth",            attribute: "agility"},
  "survival"            :  {name: "Survival",           attribute: "perception"},
  "techuse"             :  {name: "Tech-use",           attribute: "intelligence"},
  "trade"               :  {name: "Trade",              attribute: "intelligence"},
};

ROGUETRADER.rankVal = {
  0: -20,
  1: 10,
  2: 20,
  3: 30,
  4: 40
}

ROGUETRADER.testDiff = {
  "Trivial (+60)"     : 60,
  "Elementary (+50)"  : 50,
  "Simple (+40)"      : 40,
  "Easy (+30)"        : 30,
  "Routine (+20)"     : 20,
  "Ordinary (+10)"    : 10,
  "Challenging (+0)"  : 0,
  "Difficult (-10)"   : -10,
  "Hard (-20)"        : -20,
  "Very Hard (-30)"   : -30,
  "Arduous (-40)"     : -40,
  "Punishing (-50)"   : -50,
  "Hellish (-60)"     : -60,
};

//TODO: remove this (used once in item-sheet.mjs)
ROGUETRADER.specialistNameCat = {
  "common"      : "commonLoreOptions",
  "scholastic"  : "ScholasticLoreOptions",
  "forbidden"   : "ForbiddenLoreOptions",
  "linguistics" : "LinguisticsOptions"
}

//TODO: hook up to this instead
ROGUETRADER.specialistSkillOptions = {
  "common"      : {name: "Common Lore",     abbrev: "CL",   attribute: "intelligence", options: "commonLoreOptions"},
  "scholastic"  : {name: "Scholastic Lore", abbrev: "SL",   attribute: "intelligence", options: "ScholasticLoreOptions"},
  "forbidden"   : {name: "Forbidden Lore",  abbrev: "FL",   attribute: "intelligence", options: "ForbiddenLoreOptions"},
  "linguistics" : {name: "Linguistics",     abbrev: "Lng",  attribute: "intelligence", options: "LinguisticsOptions"},
}

//add abbrevs for these
ROGUETRADER.commonLoreOptions = {
  "custom"            : {name: "CUSTOM",                    desc:"CUSTOM"},
  "adeptasororitas"   : {name: "Adepta Sororitas",          desc:"Knowledge of the women of the Adepta Sororitas and their spiritual culture, as well as their highly specialised equipment"},
  "adeptusarbites"    : {name: "Adeptus Arbites",           desc:"Knowledge of its various arms and sub-sects, including details of rank structure, common procedures, and the basic tenets of Imperial Justice"},
  "adeptusastartes"   : {name: "Adeptus Astartes",          desc:"Information concerning the physiologically and psychologically modified Space Marines, the Imperium’s most potent defenders. Few outside their ranks gain such knowledge, which can include the culture of a Chapter and its history, wargear, unusual physiology, and battle cants."},
  "adeptusmechanicus" : {name: "Adeptus Mechanicus",        desc:"A general understanding of the symbols and practices that the Cult of the Machine God commonly uses."},
  "adeptusadmin"      : {name: "Adeptus Administratum",     desc:"Broad knowledge of the labyrinthine workings, rules, traditions, and dictates of the Adeptus Administratum."},
  "calixissector"     : {name: "Calixis Sector",            desc:"Information concerning the basic layout and history of the sector."},
  "chartistcaptains"  : {name: "Chartist Captains",         desc:"Knowledge of the merchant vessels across the Calixis & Koronus sectors, which complete centuries-long circuits through series of neighbouring worlds as the primary means of Imperial commerce."},
  "collegiatitanicus" : {name: "Collegia Titanicus",        desc:"Familiarity with those who control the Battle Titans of the Adeptus Mechanicus, some of the most potent planet-bound weapons known to the Imperium."},
  "ecclesiarchy"      : {name: "Ecclesiarchy",              desc:"Understanding of the structure of the Adeptus Ministorum and its role in the worship of the Emperor."},
  "imperialcreed"     : {name: "Imperial Creed",            desc:"Knowledge of the rites, practices, and personages of the Imperial Cult, the most common observances and festivals in honour of the Emperor."},
  "astramilitarum"    : {name: "Astra Militarum",           desc:"Basic information about the ranking system, logistics, structure, and basic tactical and strategic practices of the Imperial Guard, as well as particularly famed regiments."},
  "imperialnavy"      : {name: "Imperial Navy",             desc:"Basic information about the ranks, customs, uniforms, and particular traditions of the Imperial Navy, as well as famous admirals and ships."},
  "imperium"          : {name: "Imperium",                  desc:"Knowledge of the segmenta, sectors, and best-known worlds of the Imperium."},
  "collegiatitanicus" : {name: "Collegia Titanicus",        desc:"Familiarity with those who control the Battle Titans of the Adeptus Mechanicus, some of the most potent planet-bound weapons known to the Imperium."},
  "kaitaran"          : {name: "Kai'ta'ran Sept",           desc:"Knowledge of the Sept’s society, organizations, general history, and important figures. "},
  "koronussector"     : {name: "Koronus Sector",            desc:"Information concerning the basic layout and history of the sector."},
  "marianrepublic"    : {name: "Marian Colonial Republic",  desc:"Knowledge of MCR society, organizations, general history, and important figures. "},
  "navigators"        : {name: "Navigators",                desc:"Information regarding these valued mutants who are essential for Warp travel and the Imperium’s survival, including the various Navis Nobilite Houses operating within the Calixis and Koronus sectors, their lineages, and methodologies."},
  "ostrakis"          : {name: "Ostrakis Polity",           desc:"Knowledge of Enclaver society, organizations, general history, and important figures."},
  "patavianreach"     : {name: "Patavian Reach",            desc:"Information concerning the basic layout and history of the region."},
  "planetarydef"      : {name: "Planetary Defence Forces",  desc:"Information concerning a planet’s standing force dedicated to defending itself as well as assisting any nearby Imperial systems. This includes composition, tactics, and equipment, which might vary substantially based on the culture and technological make-up of the world."},
  "roguetraders"      : {name: "Rogue Traders",             desc:"Information concerning the many Rogue Trader dynasties operating within the sector and beyond in search of profit and power."},
  "scholaprogenium"   : {name: "Schola Progenium",          desc:"A strong familiarity with the Schola Progenium, which trains and indoctrinates the many Imperial orphans and prepares them for lives of faithful service as elite troopers in the Militarum Tempestus, Commissars in the Officio Prefectus, or adepts in one of the Imperium’s many other divisions."},
  "skaaldir"          : {name: "Skaaldir Clans",            desc:"Knowledge of the different clans of the Skaald; their worlds, fleets, traditions, etc."},
  "demiurg"           : {name: "Srry'tok Collective",       desc:"Knowledge of Srry’tok society, organizations, general history, and important figures."},
  "tauempire"         : {name: "Tau Empire",                desc:"Knowledge of life in the Tau Empire, as relates to both the Tau species and the numerous other races that exist as vassals, allies, and auxiliaries within their domain."},
  "ostrakis"          : {name: "Ostrakis Polity",           desc:"Knowledge of Enclaver society, organizations, general history, and important figures."},
  "tech"              : {name: "Tech",                      desc:"An understanding of simple litanies and rituals to soothe and appease machine spirits."},
  "underworld"        : {name: "Underworld",                desc:"The Acolyte is familiar with basic criminal elements and groups, such as pickpockets, debt-carnivores, and the like."},
  "war"               : {name: "War",                       desc:"Knowledge of great battles, notable commanders, heroes, and famous stratagems employed by those who fight in the endless battles for and against the Imperium."},
};

//add abbrevs for these
ROGUETRADER.ForbiddenLoreOptions = {
  "custom"            : {name: "CUSTOM",                  desc:"CUSTOM"},
  "archaeotech"       : {name: "Archaeotech",             desc:"Knowledge of the great, lost tech devices of times past, and clues to their mysterious functions and purposes."},
  "chaosspacemarines" : {name: "Chaos Space Marines",     desc:"Information concerning those Adeptus Astartes who turned traitor, as well as the paths they embrace and the equipment they use."},
  "criminalcartels"   : {name: "Criminal Cartels",        desc:"Information regarding organised groups that flout the Emperor’s Law, such as those engaging in the Faceless Trade of proscribed artefacts."},
  "daemonology"       : {name: "Daemonology",             desc:"Terrible knowledge about some of the most infamous Warp entities and their twisted physical manifestations."},
  "enclaves"          : {name: "The Enclaves",            desc:"Knowledge of the terrible and hidden secrets of the Ostrakis enclaves."},
  "heresy"            : {name: "Heresy",                  desc:"Wisdom concerning acts and practices deemed anathema by the Imperium, plus the most contemptible heretics of history and their infamous and deplorable acts."},
  "horusheresy"       : {name: "Horus Heresy",            desc:"The origins and history of the 10,000 year long struggle between the forces of the Ruinous Powers and the Imperium of Man."},
  "iga"               : {name: "The Iga",                 desc:"Knowledge of the Reach’s reclusive assassins."},
  "inquisition"       : {name: "Inquisition",             desc:"Understanding the secretive organisation of the Imperium, its common tenets and famous Inquisitors."},
  "machinecult"       : {name: "Machine Cult",            desc:"Knowledge of the secret rites and knowledge long guarded by the Adeptus Mechanicus."},
  "mutants"           : {name: "Mutants",                 desc:"The study of stable and unstable mutations within humanity, their cancerous influence and mutagenic development over time, and some of the studies and tomes on the topic."},
  "officioassassin"   : {name: "Officio Assassinorum",    desc:"This highly secretive agency exists to eliminate powerful, often singular threats to the Imperium, such as renegade planetary governors or apostate preachers. Those who dare study the organisation may become familiar with their techniques and wargear."},
  "pirates"           : {name: "Pirates",                 desc:"Knowledge of the scourges of the Warp lanes throughout the Expanse and the Reach, their tactics, infamous vessels, and notorious captains."},
  "psykers"           : {name: "Psykers",                 desc:"Skill in identifying psykers, the effects of their unnatural powers, their dangers, and the general extent of their capabilities."},
  "rvarrnaschema"     : {name: "R'varrna Schema",         desc:"The proscribed secrets behind Tau technology, from personal equipment to battlesuits and voidships."},
  "skaaldirrites"     : {name: "Skaaldir Bloodrites",     desc:"The secret lores of the Skaaldir tribes, including their customs, origins, and settlement locations."},
  "warp"              : {name: "The Warp",                desc:"An understanding of the energy of the Immaterium, its interaction and interrelation with realspace, and how its tides and eddies affect travel between the stars."},
  "vail"              : {name: "Knights of Vail",         desc:"Knowledge of the interdicted world of Vail, along with the secrets of the knights of Vail."},
  "xenos"             : {name: "Xenos:General",           desc:"Rudimentary knowledge of the minor and major alien species known to the Imperium, the threat they pose to Mankind, and their general appearance."},
  "xenoseldari"       : {name: "Xenos:Aeldari",           desc:"Knowledge of the enigmatic Aeldari."},
  "xenosdrukhari"     : {name: "Xenos:Drukhari",          desc:"Knowledge of the brutal Drukhari."},
  "xenosdemiurg"      : {name: "Xenos:Demiurg",           desc:"Knowledge of the squat Demiurg."},
  "xenosegarian"      : {name: "Xenos:Egarian",           desc:"Knowledge of the long-dead Egarians."},
  "xenosgscult"       : {name: "Xenos:GSC",               desc:"Knowledge of the mysterious Genestealer Cults."},
  "xenosgkroot"       : {name: "Xenos:Kroot",             desc:"Knowledge of the secretive Kroot Kindreds"},
  "xenosnecrons"      : {name: "Xenos:Necrons",           desc:"Knowledge of the cryptic Necrons."},
  "xenosorks"         : {name: "Xenos:Orks",              desc:"Knowledge of the infamous Orks."},
  "xenostau"          : {name: "Xenos:Tau",               desc:"Knowledge of the stoic Tau."},
  "xenostyranid"      : {name: "Xenos:Tyranids",          desc:"Knowledge of the savage Tyranid."},
  "xenosvotann"       : {name: "Xenos:Votann",            desc:"Knowledge of the nascent Leagues of Votann"},
  "xenosyuvath"       : {name: "Xenos:Yu'Vath",           desc:"Knowledge of the blighted Yu'Vath."},
};

//add abbrevs for these
ROGUETRADER.ScholasticLoreOptions = {
  "custom"            : {name: "CUSTOM",                  desc:"CUSTOM"},
  "anatomy"           : {name: "Anatomy",                 desc:"An academic understanding of human biology and physiology."},
  "archaic"           : {name: "Archaic",                 desc:"An understanding of the Imperium’s dark past, its proscribed eras and how the long millennia have changed the face of mankind."},
  "astromancy"        : {name: "Astromancy",              desc:"A knowledge of stars, singularities, and the worlds around them, as well as theoretical understanding of how to use magnascopes, astrolithic charts, and the like."},
  "beasts"            : {name: "Beasts",                  desc:"An understanding of the genus and families of animals and familiarity with the characteristics and appearances of the many semi-sentient creatures to be found across the sector."},
  "bureaucracy"       : {name: "Bureaucracy",             desc:"A familiarity with the rules and regulations involved with Askellian governments, particularly the Adeptus Administratum, and their many and varied departments, bureaus, and polices."},
  "chymistry"         : {name: "Chymistry",               desc:"A knowledge of chemicals, their alchemical applications in a number of uses, and their prevalence or scarcity throughout the Imperium."},
  "cryptology"        : {name: "Cryptology",              desc:"An understanding of codes, ciphers, cryptographs, secret languages, and numerical keys. This may be used to either create or decipher encryptions."},
  "heraldry"          : {name: "Heraldry",                desc:"A grasp of the principles and devices of heraldry, as well as a knowledge of the most common seals and heraldic devices used by the Askellon’s noble houses and families."},
  "impcreed"          : {name: "Imperial Creed",          desc:"An understanding of the specific rituals and practices of the Ecclesiarchy, from the traditional construction of their temples to specific points from its texts. This information may be used to conduct the rituals for others."},
  "impwarrants"       : {name: "Imperial Warrants",       desc:"Information concerning the establishment, legal scope, and use of the warrants granted to Rogue Traders, as well as the best-known and dynastic warrants of the Imperium."},
  "judgment"          : {name: "Judgment",                desc:"Knowledge of the proper sentences for the multitude of crimes and heresies punishable by Imperial law."},
  "legend"            : {name: "Legend",                  desc:"Going beyond archaic knowledge, this encompasses momentous portions of mythic history, such as the Dark Age of Technology, the Age of Strife, the Great Crusade, and the Horus Heresy, retold in the form of epic, apocryphal fables."},
  "mythsreach"        : {name: "Myths of the Reach",      desc:"Lore concerning the legends and old stories told across the Reach."},
  "navisnobilite"     : {name: "Navis Nobilite",          desc:"Lore concerning the family trees, contracts, and histories of the great houses of the Navigators. "},
  "numerology"        : {name: "Numerology",              desc:"An understanding of the mysterious link between numbers and the physical universe, from low kharmic theory to the infamous Kappellax Correlation."},
  "occult"            : {name: "Occult",                  desc:"An understanding of obscure and hermetic (though not clearly heretical) rituals, theories, and superstitions, as well as the better-known mystical uses of occult items."},
  "philosophy"        : {name: "Philosophy",              desc:"Knowledge concerning the theories of thought, belief, existence, and other intangibles. As it also includes logic and debate, it may be used for crafting arguments or creating philosophical tracts."},
  "tacticaimp"        : {name: "Tactica Imperialis",      desc:"The codified military doctrines of the Imperial Guard and Imperial Navy, as well as other systems of troop deployment and battle techniques used by the Imperium. This knowledge may be used to devise a battle plan or deduce the likely flow of war fought by Imperial forces."},
  "tauemp"            : {name: "Tau Empire",              desc:"Beyond the basic facts and cultural cues of the Tau Empire, the complexities of Tau society often bafﬂe even the most skilled xenographers. This Skill represents a knowledge of the structures, regulations, and hierarchies of Tau society on an academic level."},
};

//add abbrevs for these
ROGUETRADER.LinguisticsOptions = {
  "custom"            : {name: "CUSTOM",                  desc:"CUSTOM"},
  "lowgothic"         : {name: "Low Gothic",              desc:"The common tongue of the Imperium."},
  "highgothic"        : {name: "High Gothic",             desc:"The archaic older language of the Imperium. Typically limited to contemporary nobility and ancient documents."},
};

//add abbrevs for these
ROGUETRADER.TradeOptions = {
  "custom"            : {name: "CUSTOM",            desc:"CUSTOM"},
  "agri"              : {name: "Agri",              desc:"Used to grow, care for, and harvest crops and animals."},
  "archaeologist"     : {name: "Archaeologist",     desc:"Used to locate, examine, and analyse ancient ruins and artefacts."},
  "armorer"           : {name: "Armorer",           desc:"Used to design, upgrade, and forge personal weaponry and armor."},
  "astrographer"      : {name: "Astrographer",      desc:"Used to create two- and three-dimensional representations of stellar locations and Warp routes."},
  "chymist"           : {name: "Chymist",           desc:"Used to create poisons, drugs, and a wide variety of other compounds."},
  "cryptographer"     : {name: "Cryptographer",     desc:"Used to create or decode complicated ciphers, codes, and other puzzles."},
  "cook"              : {name: "Cook",              desc:"Used to cook meals and determine if scavenged food is edible."},
  "explorator"        : {name: "Explorator",        desc:"Used in the exploration of unknown stellar regions."},
  "linguist"          : {name: "Linguist",          desc:"Used to learn or decipher new languages, both spoken and written, and even create new ones in some cases."},
  "loremancer"        : {name: "Loremancer",        desc:"Used to recount events in a variety of ways, from dry recitations or texts to epic operas or statuary."},
  "mechwright"        : {name: "Mechwright",        desc:"Used to design, upgrade, and manufacture Tau mechs (and retrofit mech equipment)."},
  "morticator"        : {name: "Morticator",        desc:"Used to prepare, preserve, and often render down corpse remains into ingredients for a variety of preparations."},
  "performancer"      : {name: "Performancer",      desc:"Used to perform for audiences in a variety of entertaining art forms, often using dance, song, and poetry."},
  "prospector"        : {name: "Prospector",        desc:"Used to find and identify valuable minerals."},
  "scrimshawer"       : {name: "Scrimshawer",       desc:"Used to inscribe patterns, text, and art onto a variety of materials."},
  "sculptor"          : {name: "Sculptor",          desc:"Used to create inspiring works of art in stone, metal, and other materials, often as part of Imperial edifices."},
  "soothsayer"        : {name: "Soothsayer",        desc:"Used to “foretell” the future by a number of interpretative arts, though its effectiveness is suspect."},
  "technomat"         : {name: "Technomat",         desc:"Used to maintain and repair technological devices, but through rote memorization rather than true understanding or comprehension."},
  "voidfarer"         : {name: "Voidfarer",         desc:"Used in the day-to-day operation, logistics, and defence of starships."},
  "voidwright"        : {name: "Voidwright",        desc:"Used to design, upgrade, and manufacture void-capable vessels."},
};

ROGUETRADER.aptitudes = {
  "custom"          : "CUSTOM",
  "willpower"       : "Willpower",
  "defense"         : "Defense",
  "weaponskill"     : "Weapon Skill",
  "ballisticskill"  : "Ballistic Skill",
  "intelligence"    : "Intelligence",
  "tech"            : "Tech",
  "fieldcraft"      : "Fieldcraft",
  "psyker"          : "Psyker",
  "strength"        : "Strength",
  "finesse"         : "Finesse",
  "offense"         : "Offense",
}

ROGUETRADER.CoreTalents = {
  "customt1"                  : {name: "CUSTOM TIER 1",             tier: 1, aptitudes:["custom","custom"],               prereqs: "CUSTOM",                                    shortdesc:"CUSTOM",                               desc: "CUSTOM"},
  "customt2"                  : {name: "CUSTOM TIER 2",             tier: 2, aptitudes:["custom","custom"],               prereqs: "CUSTOM",                                    shortdesc:"CUSTOM",                               desc: "CUSTOM"},
  "customt3"                  : {name: "CUSTOM TIER 3",             tier: 3, aptitudes:["custom","custom"],               prereqs: "CUSTOM",                                    shortdesc:"CUSTOM",                               desc: "CUSTOM"},
  "adamantiumfaith"           : {name: "Adamantium Faith",          tier: 3, aptitudes:["willpower", "defense"],          prereqs: "Jaded, Resistance(Fear), WP 45+",           shortdesc:"WP from DoF Fear/Pin",                 desc: "The Acolyte has become inured to horrors that would cripple lesser men. This might come from years of facing incoming fire, staring down the terrors of the Warp, or simply his absolute faith in the Emperor. He can subtract his Willpower bonus from his degrees of failure on a failed Fear or Pinning test. If this reduces the result to zero or less, he counts as having passed the Fear test with 1 degree of success."},
  "ambidextrous"              : {name: "Ambidextrous",              tier: 1, aptitudes:["weaponskill", "ballisticskill"], prereqs: "Agi 30+",                                   shortdesc:"2x Wp Atk penalty -10",                desc: "This talent does not represent true ambidexterity so much as sufficient training with both hands to make the distinction moot. When combined with Two-Weapon Wielder talent, the penalty for making attacks with both weapons in the same turn drops to –10."},
  "armourmonger"              : {name: "Armour-Monger",             tier: 2, aptitudes:["intelligence", "tech"],          prereqs: "Int 35+, Tech-Use, Trade(Armourer)",        shortdesc:"+IB to Armor",                         desc: "The Acolyte is a skilled armourer, and constantly tinkers and improves his armour, or keeps it in pristine shape by repairing the slightest damage it sustains. With years of training, he has even learned to enhance the protection afforded by his armour and how to use it to its optimum. The character gains an extra amount of Armour points equal to his Intelligence bonus, which he can distribute to any locations that his armour would normally cover, as long as he has at least an hour each day to clean and repair it or make minor modifications. This bonus applies only to armour when the Acolyte is wearing it, as it combines his training with his skill at armoury."},
  "assassinstrike"            : {name: "Assassin Strike",           tier: 3, aptitudes:["weaponskill", "fieldcraft"],     prereqs: "Acrobatics, Agi 40+",                       shortdesc:"Acro+0 to half mv after atk",          desc: "The character’s natural agility and graceful martial form turn him into a dervish of death in combat. After making a melee attack, a successful Challenging (+0) Acrobatics skill test allows the Acolyte to move at half rate as a Free Action. He may only make this move once per round, and the character’s opponent does not receive a free attack resulting from this move."},
  "bastionironwill"           : {name: "Bastion of Iron Will",      tier: 3, aptitudes:["willpower", "psyker"],           prereqs: "Psy rating, Strong Minded, WP 40+",         shortdesc:"5xPR to OppWP v Psy",                  desc: "The Acolyte’s sheer willpower and psychic focus have become one and the same, over years of practice and training, such that their combined use is second nature. He adds 5 x his psy rating to any Opposed test he makes when defending against psychic powers."},
  "battlerage"                : {name: "Battle Rage",               tier: 2, aptitudes:["strength", "defense"],           prereqs: "Frenzy",                                    shortdesc:"Parry/reroll snap/resist Frenzy",      desc: "Long experience and indomitable will have allowed the character to master the beast within, directing its rage while keeping his head, despite the howling bloodlust in his mind. The Acolyte can Parry while Frenzied, and can re-roll a failed test to snap out of Frenzy or resist entering Frenzy if he so chooses."},
  "blademaster"               : {name: "Blademaster",               tier: 3, aptitudes:["weaponskill", "finesse"],        prereqs: "WS 30+ Weapon Training(any melee)",         shortdesc:"reroll 1 missed atk/rnd w/ blade",     desc: "The Acolyte’s mastery of bladed weapons and their martial disciplines has no peer. When attacking with any bladed weapon, including chainswords, axes, and power swords, he can re-roll one missed attack per round"},
  "blindfighting"             : {name: "Blind Fighting",            tier: 1, aptitudes:["perception", "fieldcraft"],      prereqs: "Per 30+",                                   shortdesc:"ignore melee pen when vis obscured",   desc: "Years of practice and development of his other senses allows the Acolyte to fight in close combat without the benefit of sight. He ignores all penalties for fighting with a melee weapon while suffering from obscured vision, permitting him to fight in fog, smoke, or darkness more effectively. See page 229 for a full list of normal penalties based on lighting and vision. Note this talent only improves his chances to hit with melee weapons, and has no effect on ranged weapon attacks."},
  "bulgingbiceps"             : {name: "Bulging Biceps",            tier: 2, aptitudes:["strength", "offence"],           prereqs: "Str 45+",                                   shortdesc:"fire hvy w/o brace & Heft+20",         desc: "Whereas a weaker man might be sent flying by the recoil of a heavy weapon, this Acolyte’s strong physique allows him to remain standing. He can fire a heavy weapon using Semi- Auto Burst or Full Auto Burst without bracing the weapon, and does not suffer the –30 penalty for failing to brace it. In addition, whenever he uses the Heft special use of the Athletics skill (see page 98) he can add +20 to his Athletics skill test to reflect his powerful musculature."},
  "catfall"                   : {name: "Catfall",                   tier: 1, aptitudes:["agility", "fieldcraft"],         prereqs: "Agi 30+",                                   shortdesc:"fall dist -ABm & +20 Jump",            desc: "Gymnastic ability and natural balance enables the Acolyte to fall great distances without harm. He automatically reduces the effective distance of all falls by a number of metres equal to his Agility bonus, ignoring this distance as if it did not exist. He also adds +20 to his Acrobatics skill tests when using the Jump special skill use, as it pertains to reducing damage from falling."},
  "cluescrowds"               : {name: "Clues from the Crowds",     tier: 1, aptitudes:["wgeneral", "social"],            prereqs: "Fel 30+",                                   shortdesc:"1/day reroll info gather",             desc: "It is often difficult to extract information from groups such as hive gangs or Administratum scribes, as often numbers can bolster recalcitrance to questioning. A veteran Acolyte knows that such groups can hold critical information to complete an investigation, and can throw more effective nets when interrogating groups and reveal valued clues. Once per day, he can re-roll a test made to gather information from a group of people."},
  "combatmaster"              : {name: "Combat Master",             tier: 2, aptitudes:["weaponskill", "defense"],        prereqs: "WS 30+",                                    shortdesc:"Opponents cant Gang Up",               desc: "The Acolyte’s weapon seems to be everywhere at once, keeping many more opponents at bay in close combat than would seem possible. Opponents fighting him in hand-to-hand combat gain no bonuses for Ganging Up (see page 229)."},
  "constantvigilance-int"     : {name: "Constant Vigilance(Int)",   tier: 2, aptitudes:["perception", "defense"],         prereqs: "Aware R2,Int 35+",                          shortdesc:"use IB for Init",                      desc: "From years of surviving ambushes and surprise attacks, the Acolyte is always ready for battle. His subconscious is alert to the slightest footstep or activation of a lasgun pack, and he acts often before he is fully aware of the threat. When this talent is taken, the character selects the Specialisation that matches the prerequisite (Perception or Intelligence) used in purchase. He can use the characteristic that matches that Specialisation when rolling for Initiative instead of his Agility value, and rolls two dice for the roll (picking the highest of the two for his score)."},
  "constantvigilance-per"     : {name: "Constant Vigilance(Per)",   tier: 2, aptitudes:["perception", "defense"],         prereqs: "Aware R2,Per 35+",                          shortdesc:"use PB for Init",                      desc: "From years of surviving ambushes and surprise attacks, the Acolyte is always ready for battle. His subconscious is alert to the slightest footstep or activation of a lasgun pack, and he acts often before he is fully aware of the threat. When this talent is taken, the character selects the Specialisation that matches the prerequisite (Perception or Intelligence) used in purchase. He can use the characteristic that matches that Specialisation when rolling for Initiative instead of his Agility value, and rolls two dice for the roll (picking the highest of the two for his score)."},
  "contactnetwork"            : {name: "Contact Network",           tier: 2, aptitudes:["fellowship", "leadership"],      prereqs: "Cover-Up, Int 35+",                         shortdesc:"use Fel for Req",                      desc: "Acolytes rely on a web of relationships, favours, debts, and obligations that can range from within a hab-block to spanning an entire system. Developing and exploiting this network properly allows them to gain access to weapons, travel berths, personnel, and other resources when needed; those who maximise their connections can ensure they are well-armed and well-prepared as they face a new heresy. An Acolyte with this talent can use his Fellowship characteristic in place of his Influence when making Requisition tests (see page 142)."},
  "coordinatedinterrogation"  : {name: "Coordinated Interrigation", tier: 2, aptitudes:["intelligence", "social"],        prereqs: "Clues from the Crowds, Str 30+ OR WP 40+",  shortdesc:"+10 Inter & +5 Inter/other char",      desc: "A trained Acolyte, especially when working in conjunction with fellow veteran Acolytes, can induce cooperation from even the most hardened of suspects and captured heretics. He gains a +10 bonus to all Interrogation tests, and gains an additional +5 for each other character participating in the interrogation who also has Coordinated Interrogation. This counts as test assistance, and thus also gains the standard assistance bonuses as per page 25."},
  "counterattack"             : {name: "Counter Attack",            tier: 2, aptitudes:["weaponskill", "defense"],        prereqs: "WS 40+",                                    shortdesc:"1/turn after suc Parry can StdAtk-20", desc: "The Acolyte’s lightning ripostes are things of deadly beauty; swift and invisible as the wind. Once per turn, after successfully Parrying an opponent’s attack, this character may immediately make a Standard Attack action as a Free Action against that opponent using the weapon with which he Parried. The character suffers a –20 penalty on the Weapon Skill test for this attack"},
  "coverup"                   : {name: "Cover-Up",                  tier: 2, aptitudes:["intelligence", "knowledge"],     prereqs: "Int 35+",                                   shortdesc:"can -Inf/+Sub",                        desc: "Even the slightest whisper of the Inquisition’s presence can be enough to scatter suspected heretics and drive cults into hiding. To prevent the growth and spread of rumours, Acolytes use combinations of well-placed bribes, dire threats, and other means to keep their activities as secretive as possible. At the GM’s discretion, the character can reduce his Influence to increase his group’s Subtlety. For every point of Influence lost in this way, the Acolyte increases his warband’s Subtlety by 1d5."},
  "crushingblow"              : {name: "Crushing Blow",             tier: 3, aptitudes:["weaponskill", "offense"],        prereqs: "WS 40+",                                    shortdesc:"+WSB/2 to melee dmg",                  desc: "The Acolyte has the ability to focus his entire body into close combat attacks. He adds half his Weapon Skill bonus (rounding up) to damage he inflicts with melee attacks."},
  "deathdealer-ranged"        : {name: "Deathdealer(Ranged)",       tier: 3, aptitudes:["perception", "finesse"],         prereqs: "BS 45+",                                    shortdesc:"+Per to ranged Crit Dmg",              desc: "This talent does not represent true ambidexterity so much as sufficient training with both hands to make the distinction moot. When combined with Two-Weapon Wielder talent, the penalty for making attacks with both weapons in the same turn drops to –10."},
  "deathdealer-melee"         : {name: "Deathdealer(Melee)",        tier: 3, aptitudes:["perception", "finesse"],         prereqs: "WS 45+",                                    shortdesc:"+Per to melee Crit Dmg",               desc: "The Acolyte can place his hits where they inflict maximum harm, such as gaps or joints in armour. When this talent is taken, the character selects the Specialisation that matches the prerequisite used in purchase (Melee with Weapon Skill, Ranged with Ballistic Skill). When the character’s attack in that combat type inflicts Critical damage, he adds his Perception bonus to the damage result."},
  "delicateinterrogation"     : {name: "Delicate Interrogation",    tier: 3, aptitudes:["intelligence", "finesse"],       prereqs: "Coordinated Interrogation, Fel 50+",        shortdesc:"1Sub loss to interrogation -1d5",      desc: "Questioning suspects and witnesses is always a necessary part of any investigation. Such sessions must remain secretive or obscured, however, lest others learn of the Inquisition’s interest, and a variety of subterfuges, deceptions, and outright threats come into play to aid this effort. Whenever the Acolyte would decrease his warband’s Subtlety due to an interrogation, the amount of Subtlety lost is reduced by 1d5. If this results in a negative number, the Acolyte’s skilled efforts increase the warband’s Subtlety by 1."},
  "denywitch"                 : {name: "Deny the Witch",            tier: 2, aptitudes:["willpower", "defense"],          prereqs: "WP 35+",                                    shortdesc:"WP w/ Evasion vs Psy",                 desc: "The Acolyte draws on his faith and mental fortitude to act as his shield against those tainted by the Warp. The character may use his Willpower characteristic when making an Evasion Reaction against ranged or melee attacks against him made with psychic powers. When successfully evading an attack with an area of effect, the character does not move but instead is simply unaffected by the psychic power."},
  "devastatingassault"        : {name: "Devastating Assault",       tier: 2, aptitudes:["weaponskill", "offense"],        prereqs: "WS 35+",                                    shortdesc:"1/turn after suc AoA can AoA as FrA",  desc: "The Acolyte launches a furious attack on his foe, the rage of the Emperor powering his assault. Once per turn, after resolving an All Out Attack action that successfully hits, the character may make a second All Out Attack action against the same target as a Free Action, with the same bonuses and penalties as the first."},
  "diehard"                   : {name: "Die Hard",                  tier: 1, aptitudes:["willpower", "defense"],          prereqs: "WP 40+",                                    shortdesc:"T+0 ignore Fatigue frm Blood Loss",    desc: "Through either mental resolve or sheer stubbornness, the Acolyte refuses to fall. When this character would suffer a level of Fatigue due to the Blood Loss condition, he makes a Challenging (+0) Willpower test; if he succeeds, he does not suffer a level of Fatigue."},
  "disarm"                    : {name: "Disarm",                    tier: 1, aptitudes:["weaponskill", "defense"],        prereqs: "Agi 30+",                                   shortdesc:"FuA to Disarm foe in melee",           desc: "The Acolyte can wrest weapons from his opponents’ hands through practised technique or brute force. As a Full Action, the character may make an Opposed Weapon Skill test against one target with whom he is engaged. If the Acolyte wins the test, the enemy drops his weapon to the ground. Should the Acolyte score three or more degrees of success, he can take the enemy’s weapon from him."},
  "doubletap"                 : {name: "Double Tap",                tier: 2, aptitudes:["finesse", "offense"],            prereqs: "Two-Weapon Wielder",                        shortdesc:"+20 w/ 2nd ranged atk same target",    desc: "The Acolyte is practiced in making dual attacks, and can almost subconsciously tell when his hits strike to best effect. When making a second ranged attack action in the same turn against the same target, he gains a +20 bonus to the attack test if his first attack scored one or more successful hits."},

}

//TODO: alter to {name: } format instead
ROGUETRADER.WeaponClasses = {
  'melee'   : 'Melee',
  'thrown'  : 'Thrown',
  'pistol'  : 'Pistol',
  'basic'   : 'Basic',
  'heavy'   : 'Heavy',
  'vehicle' : 'Vehicle',
  'sniper'  : 'Sniper',
}

ROGUETRADER.WeaponClassesNew = {
  'melee'   : {name:'Melee',    icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
  'thrown'  : {name:'Thrown',   icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
  'pistol'  : {name:'Pistol',   icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
  'basic'   : {name:'Basic',    icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
  'heavy'   : {name:'Heavy',    icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
  'vehicle' : {name:'Vehicle',  icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
  'sniper'  : {name:'Sniper',   icon:'<a class="" title="Weapon Type"><i class="fa-sharp fa-solid fa-crosshairs-simple"></i></a>'},
}

//TODO: alter to {name: } format instead
ROGUETRADER.WeaponSpecs = {
  'bolt'            :'Bolt',
  'chain'           :'Chain',
  'flame'           :'Flame',
  'las'             :'Las',
  'launcher'        :'Launcher',
  'melta'           :'Melta',
  'plasma'          :'Plasma',
  'power'           :'Power',
  'lowtech'         :'Low-Tech',
  'shock'           :'Shock',
  'solidprojectile' :'Solid Projectile'
}

ROGUETRADER.WeaponReloads = {
  'na'      :'N/A',
  'free'    :'Free',
  'reaction':'Reaction',
  'half'    :'Half',
  'full'    :'Full',
  '2full'   :'2 Full',
  '3full'   :'3 Full',
}

ROGUETRADER.WeaponSpecialQualities = {
  'na'              : {name:'N/A',            hasval:false},
  'accurate'        : {name:'Accurate',       hasval:false},
  'balanced'        : {name:'Balanced',       hasval:false},
  'blast'           : {name:'Blast',          hasval:true},
  'concussive'      : {name:'Concussive',     hasval:true},
  'corrosive'       : {name:'Corrosive',      hasval:false},
  'crippling'       : {name:'Crippling',      hasval:true},
  'defensive'       : {name:'Defensive',      hasval:false},
  'felling'         : {name:'Felling',        hasval:true},
  'flame'           : {name:'Flame',          hasval:false},
  'flexible'        : {name:'Flexible',       hasval:false},
  'force'           : {name:'Force',          hasval:false},
  'graviton'        : {name:'Graviton',       hasval:false},
  'hallucinogenic'  : {name:'Hallucinogenic', hasval:true},
  'haywire'         : {name:'Haywire',        hasval:true},
  'inaccurate'      : {name:'Inaccurate',     hasval:false},
  'indirect'        : {name:'Indirect',       hasval:true},
  'lance'           : {name:'Lance',          hasval:false},
  'maximal'         : {name:'Maximal',        hasval:false},
  'melta'           : {name:'Melta',          hasval:false},
  'overheats'       : {name:'Overheats',      hasval:false},
  'powerfield'      : {name:'Power Field',    hasval:false},
  'primitive'       : {name:'Primitive',      hasval:true},
  'proven'          : {name:'Proven',         hasval:true},
  'razorsharp'      : {name:'Razor Sharp',    hasval:false},
  'recharge'        : {name:'Recharge',       hasval:false},
  'reliable'        : {name:'Reliable',       hasval:false},
  'sanctified'      : {name:'Sanctified',     hasval:false},
  'scatter'         : {name:'Scatter',        hasval:false},
  'shocking'        : {name:'Shocking',       hasval:false},
  'smoke'           : {name:'Smoke',          hasval:true},
  'snare'           : {name:'Snare',          hasval:true},
  'spray'           : {name:'Spray',          hasval:false},
  'storm'           : {name:'Storm',          hasval:false},
  'tearing'         : {name:'Tearing',        hasval:false},
  'toxic'           : {name:'Toxic',          hasval:true},
  'twinlinked'      : {name:'Twin-Linked',    hasval:false},
  'unbalanced'      : {name:'Unbalanced',     hasval:false},
  'unreliable'      : {name:'Unreliable',     hasval:false},
  'unwieldy'        : {name:'Vengeful',       hasval:true},
}

ROGUETRADER.ItemOrigins = {
  'custom'  :'CUSTOM',
  'human'   :'Human(*)',
  'imperial':'Human(Imperial)',
  'xenos'   :'Xenos(?)'
}

ROGUETRADER.ItemCraftsmanship = {
  'poor'  : 'Poor',
  'normal': 'Normal',
  'good'  : 'Good',
  'best'  : 'Best'
}