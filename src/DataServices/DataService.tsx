import { StringLiteral } from "typescript";

const getPokemonApi = async (pokemon: string | number) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data:Pokemon = await response.json();
    console.log(data);
    return data;
    
  };
  interface Pokemon {
    // abilities: [
    //     {
    //         ability: {
    //           [name: string]: string[];
    //         },
    //       },
    // ],
    // id: number,
    location_area_encounters: string,
    // moves: {
    //         move: {
    //             name: string,
    //         },
            
    //     }[],

    // name: string;
    
    species: {
        name: string;
    },
    sprites: {
        front_default: string;
        front_shiny:string;
    },
    id: number;
    name: string;
  image: string;
  shinyImage: string;
  location: string;
  types: string[];
  abilities: string[];
  moves: string[];
  evolution: string | null;
}
  
export default getPokemonApi;