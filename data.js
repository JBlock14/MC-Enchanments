/* LANGUAGES */
const languages = {
  available: {
    en_us: { name: "English Estados Unidos" },
    es_es: { name: "Español España" },
  },
  default: "en_us",
};

/* ITEMS MAP */
const itemMap = {
  sword: { file: "sword.png", key: "item.sword" },
  axe: { file: "axe.png", key: "item.axe" },
  pickaxe: { file: "pickaxe.png", key: "item.pickaxe" },
  shovel: { file: "shovel.png", key: "item.shovel" },
  hoe: { file: "hoe.png", key: "item.hoe" },
  fishing_rod: { file: "fishing_rod.png", key: "item.fishing_rod" },
  mace: { file: "mace.png", key: "item.mace" },
  trident: { file: "trident.png", key: "item.trident" },
  spear: { file: "spear.png", key: "item.spear" },
  bow: { file: "bow.png", key: "item.bow" },
  crossbow: { file: "crossbow.png", key: "item.crossbow" },
  helmet: { file: "helmet.png", key: "item.helmet" },
  chestplate: { file: "chestplate.png", key: "item.chestplate" },
  leggings: { file: "leggings.png", key: "item.leggings" },
  boots: { file: "boots.png", key: "item.boots" },
};

/* FILTERING GROUPS */
const groups = {
  armor: {
    key: "group.armor",
    file: "chestplate.png",
    items: ["helmet", "chestplate", "leggings", "boots"],
  },
  weapons: {
    key: "group.weapons",
    file: "sword.png",
    items: ["sword", "axe", "mace", "trident", "spear", "bow", "crossbow"],
  },
  ranged: {
    key: "group.ranged",
    file: "bow.png",
    items: ["bow", "crossbow", "trident", "spear"],
  },
  tools: {
    key: "group.tools",
    file: "pickaxe.png",
    items: ["axe", "pickaxe", "shovel", "hoe", "fishing_rod"],
  },
};

/* SECTIONS */
const sectionData = [
  {
    "id": "aqua_affinity",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true
    }
  },
  {
    "id": "bane_of_arthropods",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "axe": true
    }
  },
  {
    "id": "blast_protection",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "channeling",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "trident": true
    }
  },
  {
    "id": "curse_of_binding",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "curse_of_vanishing",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "axe": true,
      "pickaxe": true,
      "shovel": true,
      "hoe": true,
      "fishing_rod": true,
      "trident": true,
      "mace": true,
      "spear": true,
      "bow": true,
      "crossbow": true,
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "density",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "mace": true
    }
  },
  {
    "id": "depth_strider",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "boots": true
    }
  },
  {
    "id": "efficiency",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "axe": true,
      "pickaxe": true,
      "shovel": true,
      "hoe": true
    }
  },
  {
    "id": "feather_falling",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "boots": true
    }
  },
  {
    "id": "fire_aspect",
    "level": 2,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "spear": true
    }
  },
  {
    "id": "fire_protection",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "flame",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "bow": true
    }
  },
  {
    "id": "fortune",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "axe": true,
      "pickaxe": true,
      "shovel": true,
      "hoe": true
    }
  },
  {
    "id": "fracture",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "mace": true
    }
  },
  {
    "id": "frost_walker",
    "level": 2,
    "logo": "assets/tab_icon.gif",
    "items": {
      "boots": true
    }
  },
  {
    "id": "impaling",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "trident": true
    }
  },
  {
    "id": "infinity",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "bow": true
    }
  },
  {
    "id": "knockback",
    "level": 2,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "spear": true
    }
  },
  {
    "id": "looting",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true
    }
  },
  {
    "id": "loyalty",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "trident": true
    }
  },
  {
    "id": "luck_of_the_sea",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "fishing_rod": true
    }
  },
  {
    "id": "lunge",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "spear": true
    }
  },
  {
    "id": "lure",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "fishing_rod": true
    }
  },
  {
    "id": "mending",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "axe": true,
      "pickaxe": true,
      "shovel": true,
      "hoe": true,
      "fishing_rod": true,
      "spear": true,
      "trident": true,
      "mace": true,
      "bow": true,
      "crossbow": true,
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "multishot",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "crossbow": true
    }
  },
  {
    "id": "piercing",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "crossbow": true
    }
  },
  {
    "id": "power",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "bow": true
    }
  },
  {
    "id": "projectile_protection",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "protection",
    "level": 4,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "punch",
    "level": 2,
    "logo": "assets/tab_icon.gif",
    "items": {
      "bow": true
    }
  },
  {
    "id": "quick_charge",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "crossbow": true
    }
  },
  {
    "id": "respiration",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true
    }
  },
  {
    "id": "riptide",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "trident": true
    }
  },
  {
    "id": "sharpness",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "axe": true
    }
  },
  {
    "id": "silk_touch",
    "level": 1,
    "logo": "assets/tab_icon.gif",
    "items": {
      "axe": true,
      "pickaxe": true,
      "shovel": true,
      "hoe": true
    }
  },
  {
    "id": "smite",
    "level": 5,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "axe": true
    }
  },
  {
    "id": "soul_speed",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "boots": true
    }
  },
  {
    "id": "sweeping_edge",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true
    }
  },
  {
    "id": "swift_sneak",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "leggings": true
    }
  },
  {
    "id": "thorns",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "unbreaking",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "sword": true,
      "axe": true,
      "pickaxe": true,
      "shovel": true,
      "hoe": true,
      "fishing_rod": true,
      "spear": true,
      "trident": true,
      "mace": true,
      "bow": true,
      "crossbow": true,
      "helmet": true,
      "chestplate": true,
      "leggings": true,
      "boots": true
    }
  },
  {
    "id": "wind_burst",
    "level": 3,
    "logo": "assets/tab_icon.gif",
    "items": {
      "mace": true
    }
  }
];