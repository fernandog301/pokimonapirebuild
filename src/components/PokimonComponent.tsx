import React, { useState, useEffect } from "react";
import {
  saveToLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
} from "./LocalStorageComponent";
import getPokemonApi from "../DataServices/DataService"

const PokimonComponent = () => {
  const [pokemon, setPokemon] = useState<any>("");
  const [defaultImg, setDefaultImg] = useState<string>("");
  const [cardShinnyImg, setCardShinnyImg] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [abilities, setAbilities] = useState<string>("");
  const [moves, setMoves] = useState<string>("");
  const [types, setTypes] = useState<string>("");
  const [evolutionResponse, setEvolutionResponse] = useState<string>("");


  useEffect(() => {
    const favoritesFromLocalStorage = getLocalStorage();
    setFavorites(favoritesFromLocalStorage);
  }, []);

  const toggleFavorite = () => {
    if (!favorites.includes(pokemon.name)) {
      saveToLocalStorage(pokemon.name);
      setFavorites([...favorites, pokemon.name]);
    } else {
      removeFromLocalStorage(pokemon.name);
      setFavorites(favorites.filter((fav) => fav !== pokemon.name));
    }
  };

//  let evolution = null;


  const handleRandomPokemon = async () => {
    const randomNum = Math.floor(Math.random() * 649);
    const randomPokemon = await getPokemonApi(randomNum);
    setPokemon(randomPokemon);

    // . for obj
    // [] for array

    console.log(randomPokemon.moves.map((move: any) => move.move.name))


    setDefaultImg(
      randomPokemon.sprites.other["official-artwork"].front_default
      
    );
    
    setCardShinnyImg(
      randomPokemon.sprites.other["official-artwork"].front_shiny
    );
    setLocation(
      randomPokemon.location_area_encounters
    );
    setAbilities(
      randomPokemon.abilities.map((ability: any) => ability.ability.name);
    );
    setMoves(
      randomPokemon.moves.map((move: any) => move.move.name)
    );
    setTypes(
      randomPokemon.types.map((type: string) => type.type.name)
    );
    setEvolutionResponse(
      randomPokemon.
    );

    // Fetching additional data like evolutionary paths, location, moves, etc.
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchedPokemon = await getPokemonApi(searchInput);
      if (searchedPokemon.id > 649) {
        alert("Please enter pokemon generations from 1-5 at this time.");
      } else {
        setPokemon(searchedPokemon);
        setDefaultImg(
          searchedPokemon.sprites.other["official-artwork"].front_default
        );
        setCardShinnyImg(
          searchedPokemon.sprites.other["official-artwork"].front_shiny
        );

        // Fetching additional data like evolutionary paths, location, moves, etc.

      }
    }
  };

  return (
    <div >
      <button id="favoritesBtn" onClick={toggleFavorite}>
        Toggle Favorite
      </button>
      <button id="randomPokemonBtn" onClick={handleRandomPokemon}>
        Random Pokemon
      </button>
       <input
        type="text"
        id="SearchInput"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleSearch}
      />
      <img
        id="pokemonImg"
        src={defaultImg}
        alt="Pokemon"
        onClick={() => {
          if (defaultImg) {
            setCardShinnyImg(cardShinnyImg ? cardShinnyImg : defaultImg);
          }
        }}
      />
       <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <img src={pokemon.shinyImage} alt={`Shiny ${pokemon.name}`} />
          <p>Location: {pokemon.location}</p>
          <p>Types: {pokemon.types}</p>
          <p>Abilities: {pokemon.abilities}</p>
          <p>Moves: {pokemon.moves}</p>
          <p>Evolution: {pokemon.evolution || 'N/A'}</p>
        </div> 
      <div id="getFavoritesDiv">
        {favorites.map((fav) => (
          <div key={fav}>
            <p className="text-3xl font-bold underline">{fav}</p>
              <button
                type="button"
                onClick={() => {
                  removeFromLocalStorage(fav);
                  setFavorites(favorites.filter((f) => f !== fav));
                }}>
                x
              </button>
          </div>
        ))}
      </div> 
    </div>
  )
};

export default PokimonComponent;
