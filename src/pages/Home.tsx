import { useEffect, useState } from "react";
import { Character, Film } from "../utils/types";
import { getCharacters, getFilm } from "../utils/api";
import Pagination from "../components/Pagination";
import CardCharacter from "../components/CardCharacter";
import Filters from "../components/Filters";
import { useDispatch } from "react-redux";
import { setFilteredResults } from "../utils/reducers/results";
import Header from "../components/Header";
import ListCharacter from "../components/ListCharacter";
import { IoGrid, IoList } from "react-icons/io5";

const Home = () => {
  const dispatch = useDispatch();
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [searchResult, setSearchResult] = useState<Character[]>([]);
  const [results, setResults] = useState<Character[]>([]);
  const [numberOfCharacters, setNumberOfCharacters] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const charactersPerPage = 10;
  const [indexStart, setIndexStart] = useState<number>(0);
  const [indexEnd, setIndexEnd] = useState<number>(charactersPerPage);
  const [view, setView] = useState<string>("card");

  useEffect(() => {
    const fetchData = async () => {
      const charactersData = await getCharacters();
      const charactersList: Character[] = [];
      for (const character of charactersData) {
        const filmsList: Film[] = [];
        for (const film of character.films || []) {
          const filmDetails = await getFilm(film);
          filmsList.push(filmDetails?.data);
        }
        charactersList.push({ ...character, films: filmsList });
      }
      setAllCharacters(charactersList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allCharacters.length > 0) {
      setResults(allCharacters);
      dispatch(setFilteredResults(allCharacters));
      setNumberOfCharacters(allCharacters?.length);
    }
  }, [allCharacters, dispatch]);

  useEffect(() => {
    if (searchResult.length > 0) {
      setResults(searchResult);
      setNumberOfCharacters(searchResult?.length);
      dispatch(setFilteredResults(searchResult));
    } else {
      setResults([]);
      setNumberOfCharacters(0);
    }
  }, [searchResult, dispatch]);

  const getOnePage = (index: number) => {
    if (index === 0) {
      setIndexStart(0);
      setIndexEnd(charactersPerPage);
    } else {
      setIndexStart(charactersPerPage * index);
      setIndexEnd(charactersPerPage * index + charactersPerPage);
    }
  };

  const displayByType = () => {
    if (view === "card") {
      return (
        <div className="flex flex-wrap">
          {results?.slice(indexStart, indexEnd).map((character, index) => {
            return (
              <div key={`character-${index}`} className="w-1/5 px-2 py-3">
                <CardCharacter character={character} />
              </div>
            );
          })}
        </div>
      );
    } else if (view === "list") {
      return (
        <div className="">
          <div className="pb-1 flex items-center text-center font-bold border-b">
            <div className="w-1/6"></div>
            <div className="w-1/6">Nom</div>
            <div className="w-1/6">Taille</div>
            <div className="w-1/6">Poids</div>
            <div className="w-1/6">Genre</div>
            <div className="w-1/6"></div>
          </div>
          {results?.slice(indexStart, indexEnd).map((character, index) => {
            return (
              <div key={`character-${index}`} className="">
                <ListCharacter character={character} />
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4 bg-white">
        <Filters
          numberOfCharacters={numberOfCharacters}
          setNumberOfCharacters={setNumberOfCharacters}
          setNumberOfPages={setNumberOfPages}
          allCharacters={allCharacters}
          setAllCharacters={setAllCharacters}
          setSearchResult={setSearchResult}
          setIndexStart={setIndexStart}
          setIndexEnd={setIndexEnd}
          charactersPerPage={charactersPerPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex items-center justify-end">
          <div className="text-xs">Affichage</div>
          <div
            onClick={() => setView("card")}
            className={`ml-2 pb-1 cursor-pointer ${
              view === "card" && "border-b-2 border-black"
            }`}
            title="Vignettes"
          >
            <IoGrid size={25} />
          </div>
          <div
            className={`mx-2 cursor-pointer ${
              view === "list" && "border-b-2 border-black"
            }`}
            onClick={() => setView("list")}
            title="Liste"
          >
            <IoList size={25} />
          </div>
        </div>
        {results?.length > 0 ? (
          displayByType()
        ) : (
          <div>
            <div className="text-center text-xl font-bold">
              Pas de résultats
            </div>
          </div>
        )}
        <div className="my-8">
          <Pagination
            numberOfCharacters={numberOfCharacters}
            numberOfPages={numberOfPages}
            setNumberOfPages={setNumberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            charactersPerPage={charactersPerPage}
            getOnePage={getOnePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
