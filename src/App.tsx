import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";
import Popup from "./components/Popup";
import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export type Pokemon = {
  name: string;
  imgUrl: string;
  height: number;
  baseExperience: number;
};

export const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePopup(idx: number) {
    setCurrentIndex(idx);
    setShowPopup((oldShowPopup) => !oldShowPopup);
  }

  function handleChangePage(func: (n: number) => number) {
    setPage((oldPage) => {
      var newPage = func(oldPage);
      if (newPage <= 0 || newPage > 66) {
        return oldPage;
      } else return newPage;
    });
  }

  const pokemonElements = pokemonList.map((pokemon: Pokemon, idx: number) => (
    <div key={idx} className="pokemon-element" onClick={() => handlePopup(idx)}>
      <Pokemon pokemon={pokemon} />
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL + `?offset=${(page - 1) * 20}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unbekannter Fehler aufgetreten");
        }

        const detailedPokemonList: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const detailRes = await fetch(BASE_URL + pokemon.name);
            const detailData = await detailRes.json();
            return {
              name: pokemon.name,
              imgUrl: detailData.sprites.front_default,
              height: detailData.height,
              baseExperience: detailData.base_experience,
            };
          })
        );
        setPokemonList(detailedPokemonList);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);
  return (
    <div className="flexbox">
      {pokemonElements}
      {showPopup && (
        <Popup
          showPopup={showPopup}
          pokemon={pokemonList[currentIndex]}
          handlePopup={handlePopup}
        />
      )}
      <Button
        variant="contained"
        onClick={() => handleChangePage((page) => page - 1)}
      >
        <NavigateBeforeIcon /> Zurück
      </Button>
      {page}
      <Button
        variant="contained"
        onClick={() => handleChangePage((page) => page + 1)}
      >
        Weiter <NavigateNextIcon />
      </Button>
    </div>
  );
}

export default App;
