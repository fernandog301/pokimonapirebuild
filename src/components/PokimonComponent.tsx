import React, { useState, useEffect } from "react";
import {
  saveToLocalStorage,
  getLocalStorage,
  removeFromLocalStorage,
} from "./LocalStorageComponent";

import getPokemonApi from "../DataServices/DataService"

const PokimonComponent = () => {

  let defaultImg;
  let shinyImg;
  // let name;

  const [cardShinnyImg, setCardShinnyImg] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string | number>("");
  const [evolutionResponse, setEvolutionResponse] = useState<string>("");
  const [pokemon, setPokemon] = useState<string | number>('');
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonID, setPokemonID] = useState<number>(1);
  const [pokemonImage, setPokemonImage] = useState<string>('');
  const [pokemonMoves, setPokemonMoves] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [pokemonAbilities, setPokemonAbilities] = useState<string>('');
  const [pokemonLocation, setPokemonLocation] = useState<string>('');
  const [pokemonDescription, setPokemonDescription] = useState<string>('');




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
    useEffect(() => {
      const dataPokimon = async () => {

        const pokemon = await getPokemonApi(searchPokemon){

          let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
        setPokemonName(name.split('-').join(' '));
        setPokemonID(pokemon.id);
        defaultImg = pokemon.sprites.other["official-artwork"].front_default;
        shinyImg = pokemon.sprites.other["official-artwork"].front_shiny;
        setPokemonImage(defaultImg);
        setPokemonMoves(pokemon.moves.map((move: Move) => move.move.name).join(", "));
        setType(pokemon.types.map((element: Type) => element.type.name).join(", "));
        setPokemonAbilities(pokemon.abilities.map((ability: Ability) => ability.ability.name).join(", "));

        const loc = await fetch(pokemon.location_area_encounters);
        const location = await loc.json();
        if (location.length === 0) {
          setPokemonLocation("N/A");
        } else {
          setPokemonLocation(location[0].location_area.name.split("-").join(" "));
        }

        const desc = await fetch(pokemon.species.url);
        const description = await desc.json();
        const english = description.flavor_text_entries.findIndex((name: FlavorTextEntry) => name.language.name === "en");
        setPokemonDescription(description.flavor_text_entries[english].flavor_text);

        const evol = description.evolution_chain.url;
        const evolve = await fetch(evol);
        const evolution = await evolve.json();

      }
    })
  }
  // . for obj
  // [] for array

  console.log(randomPokemon.moves.map((move: any) => move.move.name))


  // setDefaultImg(
  //   randomPokemon.sprites.other["official-artwork"].front_default

  // );

  // setCardShinnyImg(
  //   randomPokemon.sprites.other["official-artwork"].front_shiny
  // );
  setLocation(
    randomPokemon.location_area_encounters
  );
  let name = pokemon.name[0].toUpperCase() + pokemon.name


  // Fetching additional data like evolutionary paths, location, moves, etc.
};
useEffect(() => {
  const favoritesFromLocalStorage = getLocalStorage();
  setFavorites(favoritesFromLocalStorage);
  const pokemon = await getPokemonApi(searchPokemon);
  let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
  setPokemonName(name.split('-').join(' '));
  setPokemonID(pokemon.id);
  defaultImg = pokemon.sprites.other["official-artwork"].front_default;
  shinyImg = pokemon.sprites.other["official-artwork"].front_shiny;
  setPokemonImage(defaultImg);
  setPokemonMoves(pokemon.moves.map((move: Move) => move.move.name).join(", "));
  setType(pokemon.types.map((element: Type) => element.type.name).join(", "));

}, []);


const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    const searchedPokemon = await getPokemonApi(searchInput);
    if (searchedPokemon.id > 649) {
      alert("Please enter pokemon generations from 1-5 at this time.");
    } else {
      setPokemon(searchedPokemon);
      useEffect(() => {
        const getData = async () => {
          const pokemon = await getPokemonApi(searchPokemon);
          let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
          setPokemonName(name.split('-').join(' '));
          setPokemonID(pokemon.id);
          defaultImg = pokemon.sprites.other["official-artwork"].front_default;
          shinyImg = pokemon.sprites.other["official-artwork"].front_shiny;
          setPokemonImage(defaultImg);
          setPokemonMoves(pokemon.moves.map((move: Move) => move.move.name).join(", "));
          setType(pokemon.types.map((element: Type) => element.type.name).join(", "));
          setPokemonAbilities(pokemon.abilities.map((ability: Ability) => ability.ability.name).join(", "));

          const loc = await fetch(pokemon.location_area_encounters);
          const location = await loc.json();
          if (location.length === 0) {
            setPokemonLocation("N/A");
          } else {
            setPokemonLocation(location[0].location_area.name.split("-").join(" "));
          }

          const desc = await fetch(pokemon.species.url);
          const description = await desc.json();
          const english = description.flavor_text_entries.findIndex((name: FlavorTextEntry) => name.language.name === "en");
          setPokemonDescription(description.flavor_text_entries[english].flavor_text);

          const evol = description.evolution_chain.url;
          const evolve = await fetch(evol);
          const evolution = await evolve.json();

        }
        getData();
      }, [searchPokemon])
      // setDefaultImg(
      //   searchedPokemon.sprites.other["official-artwork"].front_default
      // );
      // setCardShinnyImg(
      //   searchedPokemon.sprites.other["official-artwork"].front_shiny
      // );

      // Fetching additional data like evolutionary paths, location, moves, etc.

    }
  }
};

return (
  <div className="justify-center">

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
