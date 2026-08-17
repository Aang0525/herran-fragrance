// Catálogo inicial de Herran Fragrance. Se usa tanto por db.js (auto-siembra
// en cada arranque si la tabla está vacía, necesario porque el disco de
// Render free tier es efímero) como por seed.js (siembra manual local).
export const products = [
  // Paco Rabanne
  { name: "One Million", brand: "Paco Rabanne", description: "El icónico frasco dorado. Notas de canela, cuero y miel con un toque especiado inconfundible.", price: 4800, compare_at_price: 5400, category: "Especiado", gender: "hombre", stock: 14, image_url: "/products/rabanne-one-million.png", featured: 1, is_new: 0 },
  { name: "Invictus", brand: "Paco Rabanne", description: "Fragancia acuática y amaderada con notas marinas, pomelo y una base de ámbar y musgo.", price: 4600, category: "Acuático", gender: "hombre", stock: 11, image_url: "/products/rabanne-invictus.png", featured: 1, is_new: 0 },
  { name: "Fame", brand: "Paco Rabanne", description: "Floral frutal audaz con notas de arroz salvaje, vainilla de Madagascar y patchouli.", price: 5100, category: "Floral", gender: "mujer", stock: 9, image_url: "/products/rabanne-fame.png", featured: 1, is_new: 1 },

  // Jo Milano
  { name: "Game of Spades Opal", brand: "Jo Milano", description: "Composición amaderada con notas cítricas de apertura y fondo de almizcle blanco.", price: 2600, category: "Amaderado", gender: "unisex", stock: 16, image_url: "/products/game-of-spades-opal.png", featured: 0, is_new: 0 },
  { name: "Zodiac", brand: "Jo Milano", description: "Oriental especiado con azafrán, rosa y maderas cálidas. Elegancia nocturna.", price: 2400, category: "Oriental", gender: "unisex", stock: 10, image_url: "/products/jomilano-zodiac.png", featured: 0, is_new: 0 },
  { name: "Levante Platinum", brand: "Jo Milano", description: "Fresco y aromático, con notas de lavanda, bergamota y un fondo limpio de almizcle.", price: 2200, category: "Aromático", gender: "unisex", stock: 18, image_url: "/products/jomilano-levante-platinum.png", featured: 0, is_new: 0 },

  // Burberry
  { name: "Her", brand: "Burberry", description: "Floral frutal londinense con moras, violeta y una base cálida de vainilla.", price: 4200, category: "Floral", gender: "mujer", stock: 12, image_url: "/products/burberry-her.png", featured: 1, is_new: 0 },
  { name: "Hero", brand: "Burberry", description: "Amaderado aromático con cedro, pimienta negra y bergamota. Carácter moderno.", price: 4300, category: "Amaderado", gender: "hombre", stock: 13, image_url: "/products/burberry-hero.png", featured: 0, is_new: 0 },
  { name: "Weekend for Women", brand: "Burberry", description: "Cítrico floral fresco con mandarina, melocotón y flor de loto.", price: 3800, category: "Cítrico", gender: "mujer", stock: 7, image_url: "/products/burberry-weekend.png", featured: 0, is_new: 0 },

  // Carolina Herrera
  { name: "Good Girl", brand: "Carolina Herrera", description: "Oriental floral en el icónico frasco de tacón. Almendra, cacao, jazmín y tuberosa.", price: 5400, category: "Oriental", gender: "mujer", stock: 6, image_url: "/products/carolina-herrera-good-girl.png", featured: 1, is_new: 0 },

  // Armaf
  { name: "Club de Nuit Intense", brand: "Armaf", description: "Aromático especiado con piña, canela y una base ahumada de vainilla y almizcle.", price: 2900, compare_at_price: 3400, category: "Especiado", gender: "hombre", stock: 20, image_url: "/products/armaf-club-de-nuit.png", featured: 1, is_new: 0 },
  { name: "Odyssey Aoud", brand: "Armaf", description: "Oriental amaderado intenso: oud, azafrán y maderas preciosas en un frasco dorado.", price: 3100, category: "Oriental", gender: "hombre", stock: 9, image_url: "/products/armaf-odyssey-aoud.png", featured: 0, is_new: 1 },

  // Afnan
  { name: "Supremacy", brand: "Afnan", description: "Amaderado especiado con manzana, canela y una potente base de sándalo y almizcle.", price: 2700, category: "Especiado", gender: "hombre", stock: 15, image_url: "/products/afnan-supremacy.png", featured: 0, is_new: 0 },

  // Al Haramain
  { name: "Amber Oud", brand: "Al Haramain", description: "Oud árabe tradicional con ámbar dorado, azafrán y una estela cálida y envolvente.", price: 2500, category: "Oriental", gender: "unisex", stock: 11, image_url: "/products/al-haramain-amber-oud.png", featured: 0, is_new: 1 },

  // Hawas
  { name: "Hawas", brand: "Rasasi", description: "Aromático fresco con bergamota, salvia y una base amaderada suave. Uso diario.", price: 2000, category: "Aromático", gender: "hombre", stock: 17, image_url: "/products/hawas-nafees.png", featured: 0, is_new: 0 },

  // Versace
  { name: "Eros", brand: "Versace", description: "Aromático amaderado con menta, manzana verde y una base de vainilla y haba tonka.", price: 4700, category: "Amaderado", gender: "hombre", stock: 10, image_url: "/products/versace-eros.png", featured: 1, is_new: 0 },

  // Prada
  { name: "Luna Rossa", brand: "Prada", description: "Aromático cítrico con lavanda espigada, cítricos y ambroxan. Deportivo y elegante.", price: 4900, category: "Cítrico", gender: "hombre", stock: 8, image_url: "/products/prada-luna-rossa.png", featured: 0, is_new: 0 },

  // Yves Saint Laurent
  { name: "Y Eau de Parfum", brand: "Yves Saint Laurent", description: "Aromático amaderado con salvia, ámbar gris y una firma inconfundible de carácter.", price: 5300, category: "Amaderado", gender: "hombre", stock: 7, image_url: "/products/ysl-y.png", featured: 0, is_new: 1 },
];
