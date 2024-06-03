export interface Superhero {
  response?: string;
  id: string | undefined;
  name: string;
  powerstats?: Powerstats;
  image?: Image;
}

export interface Powerstats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}
export interface Image {
  url: string;
}
