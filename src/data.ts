export type Product = {
  name: string;
  category: "Pains" | "Viennoiseries" | "Pâtisseries" | "Salé";
  price: string;
  image: string;
  note: string;
};

export const products: Product[] = [
  {
    name: "Baguette de Tradition",
    category: "Pains",
    price: "1,40 €",
    image: "/media/baguette.jpg",
    note: "Levain naturel, 24 h de pousse lente, croûte caramélisée.",
  },
  {
    name: "Pain de Campagne",
    category: "Pains",
    price: "4,80 €",
    image: "/media/paindecampagne.jpg",
    note: "Farine de meule T80, mie alvéolée, cuit sur sole.",
  },
  {
    name: "Pain de Seigle",
    category: "Pains",
    price: "5,20 €",
    image: "/media/paindeseigle.jpg",
    note: "100 % seigle, longue conservation, idéal fruits de mer.",
  },
  {
    name: "Croissant pur beurre",
    category: "Viennoiseries",
    price: "1,30 €",
    image: "/media/croissant.jpg",
    note: "Beurre AOP Charentes-Poitou, feuilletage 27 couches.",
  },
  {
    name: "Pain au chocolat",
    category: "Viennoiseries",
    price: "1,50 €",
    image: "/media/painchocolat.jpg",
    note: "Deux barres de chocolat noir 64 %, feuilleté doré.",
  },
  {
    name: "Kouign-amann",
    category: "Viennoiseries",
    price: "3,60 €",
    image: "/media/kouign-amann.jpg",
    note: "La spécialité bretonne, beurre & sucre caramélisés.",
  },
  {
    name: "Éclair au café",
    category: "Pâtisseries",
    price: "4,20 €",
    image: "/media/eclair.jpg",
    note: "Pâte à choux, crème pâtissière au café d'Éthiopie.",
  },
  {
    name: "Fraisier",
    category: "Pâtisseries",
    price: "5,90 €",
    image: "/media/fraisier.jpg",
    note: "Fraises de saison, mousseline vanille de Madagascar.",
  },
  {
    name: "Tarte Tatin",
    category: "Pâtisseries",
    price: "5,40 €",
    image: "/media/tartetatin.jpg",
    note: "Pommes confites au beurre salé, pâte brisée maison.",
  },
  {
    name: "Quiche Lorraine",
    category: "Salé",
    price: "4,50 €",
    image: "/media/Quiche-lorraine.jpg",
    note: "Lardons fumés, appareil crème & œufs fermiers.",
  },
  {
    name: "Sandwich du jour",
    category: "Salé",
    price: "6,50 €",
    image: "/media/sandwich.jpg",
    note: "Sur baguette tradition, garni le matin même.",
  },
  {
    name: "Café gourmand",
    category: "Pâtisseries",
    price: "6,90 €",
    image: "/media/cafegourmand.jpg",
    note: "Expresso de spécialité & trio de mignardises.",
  },
];

export const categories = ["Tout", "Pains", "Viennoiseries", "Pâtisseries", "Salé"] as const;

export type Testimonial = {
  name: string;
  rating: number;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Camille Aubert",
    rating: 5,
    role: "Cliente depuis 2019",
    quote:
      "Je traverse le quartier chaque matin rien que pour cette baguette. La croûte chante encore quand on la pose sur la table — c'est devenu un rituel.",
  },
  {
    name: "Le Figaro Gourmand",
    rating: 5,
    role: "Guide des artisans",
    quote:
      "Un feuilletage d'orfèvre et un levain d'une régularité rare. Maison Flandrin fait partie des dix meilleures boulangeries de la région.",
  },
  {
    name: "Thomas & Léa",
    rating: 5,
    role: "Mariés en juin",
    quote:
      "Notre pièce montée a fait l'unanimité. Accueil chaleureux, conseils précieux, et un goût dont nos invités parlent encore.",
  },
  {
    name: "Restaurant L'Établi",
    rating: 5,
    role: "Partenaire pro",
    quote:
      "Nous servons leur pain de campagne tous les soirs. Une fiabilité irréprochable et une qualité qui élève toute notre carte.",
  },
];

export const specialties = [
  "Levain naturel",
  "Beurre AOP",
  "Farine de meule",
  "Cuisson sur sole",
  "Façonné main",
  "Fournée 5 h du matin",
  "Zéro additif",
  "Producteurs locaux",
];
