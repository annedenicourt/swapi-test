import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Character, Film } from "../utils/types";
import { getAllFilms, getCharacters, getResultByQuery } from "../utils/api";
import Pagination from "../components/Pagination";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CustomDiv = styled.div`
  margin: 30px 20px;
  select {
    border: 1px solid grey;
    border-radius: 3px;
    width: 160px;
    font-size: 0.9rem;
  }
`;

interface FiltersProps {
  numberOfCharacters: number;
  setNumberOfCharacters: (option: number) => void;
  setNumberOfPages: (option: number) => void;
  setAllCharacters: (option: Character[] | undefined) => void;
  allCharacters: Character[] | undefined;
  setSearchResult: (option: Character[] | undefined) => void;
  setIndexStart: React.Dispatch<React.SetStateAction<number>>;
  setIndexEnd: React.Dispatch<React.SetStateAction<number>>;
  charactersPerPage: number;
}

const Filters: React.FC<FiltersProps> = ({
  numberOfCharacters,
  setNumberOfCharacters,
  setNumberOfPages,
  setIndexStart,
  setIndexEnd,
  allCharacters,
  setSearchResult,
  charactersPerPage,
}) => {
  const dispatch = useDispatch();
  const { register, reset } = useForm();

  const [allFilms, setAllFilms] = useState<Film[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterByFilm, setFilterByFilm] = useState<string>("");
  const [filterByHeight, setFilterByHeight] = useState<string>("");
  const [filterByWeight, setFilterByWeight] = useState<string>("");

  useEffect(() => {
    getAllFilms().then(async (response) => {
      const results = await response?.data?.results;
      setAllFilms(results);
    });
  }, []);

  useEffect(() => {
    let filteredArray = allCharacters;
    if (filteredArray) {
      if (searchQuery !== "") {
        filteredArray = filterByName(filteredArray);
      }
      if (filterByHeight !== "") {
        filteredArray = filterSelectedHeight(filteredArray);
      }
      if (filterByWeight !== "") {
        filteredArray = filterSelectedWeight(filteredArray);
      }
      if (filterByFilm !== "") {
        filteredArray = filterSelectedFilm(filteredArray);
      }
      setSearchResult(filteredArray);
      setNumberOfCharacters(filteredArray?.length);
    }
  }, [searchQuery, filterByFilm, filterByHeight, filterByWeight]);

  const filterByName = (array: any[]) => {
    const search = array?.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return search?.length > 0 ? search : array;
  };

  const filterSelectedHeight = (array: any[]) => {
    if (filterByHeight === "small") {
      return array?.filter(
        (character) => character.height && parseInt(character.height) < 150
      );
    } else if (filterByHeight === "big") {
      return array?.filter(
        (character) => character.height && parseInt(character.height) > 150
      );
    } else {
      return array;
    }
  };
  const filterSelectedWeight = (array: any[]) => {
    if (filterByWeight === "thin") {
      return array?.filter(
        (character) => character.mass && parseInt(character.mass) < 100
      );
    } else if (filterByWeight === "fat") {
      return array?.filter(
        (character) => character.mass && parseInt(character.mass) > 100
      );
    } else {
      return array;
    }
  };
  const filterSelectedFilm = (array: any[]) => {
    if (filterByFilm !== "") {
      return array?.filter(
        (character) =>
          character.films && // Checking if 'films' property exists for the character
          character.films.some((film: { url: string }) => {
            return film?.url === filterByFilm; // Checking if any film's URL matches 'filterByFilm'
          })
      );
    } else {
      return array;
    }
  };

  useEffect(() => {
    if (numberOfCharacters > 0) {
      setNumberOfPages(Math.ceil(numberOfCharacters / 10));
    }
  }, [numberOfCharacters]);

  //console.log("filteredCharacters", filteredCharacters);
  return (
    <CustomDiv>
      <form className="flex items-center justify-between">
        <div className="flex items-end">
          <div className="mr-4">Filtrer</div>
          {allFilms?.length > 0 && (
            <select
              {...register("filterByFilm")}
              onChange={(e) => {
                setFilterByFilm(e.target.value);
              }}
            >
              <option value="">par film</option>
              {allFilms?.map((film) => {
                return (
                  <option key={film?.episode_id} value={film.url}>
                    {film?.title}
                  </option>
                );
              })}
            </select>
          )}
          <select
            {...register("filterByHeight")}
            onChange={(e) => {
              setFilterByHeight(e.target.value);
            }}
            className="mx-4"
          >
            <option value="">par taille</option>
            <option value="small">Moins de 1,50m</option>
            <option value="big">Plus de 1,50m</option>
          </select>
          <select
            {...register("filterByWeight")}
            onChange={(e) => {
              setFilterByWeight(e.target.value);
            }}
          >
            <option value="">par poids</option>
            <option value="thin">Moins de 100kg</option>
            <option value="fat">Plus de 100kg</option>
          </select>
          <div
            onClick={() => {
              reset();
              setIndexStart(0);
              setIndexEnd(charactersPerPage);
              setSearchResult(allCharacters);
            }}
            className="ml-2 text-sm hover:underline cursor-pointer"
          >
            Réinitialiser
          </div>
        </div>
        <div>
          <input
            type="text"
            {...register("queryByName")}
            placeholder="Recherche par nom"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 text-center border rounded-md"
          />
        </div>
      </form>
    </CustomDiv>
  );
};

export default Filters;
