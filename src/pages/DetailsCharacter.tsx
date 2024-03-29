import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Character, Film } from "../utils/types";
import { getDetails, getNext, getPrevious, getFilm } from "../utils/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import FavoriteStar from "../components/FavoriteStar";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { PiFilmSlateBold } from "react-icons/pi";

const DetailsCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state: any) => state.results);

  const [characterDetails, setCharacterDetails] = useState<Character>();
  const [currentId, setCurrentId] = useState(id);
  const [previousCharacter, setPreviousCharacter] = useState<Character>({
    name: "",
    url: "",
  });
  const [nextCharacter, setNextCharacter] = useState<Character>({
    name: "",
    url: "",
  });

  useEffect(() => {
    if (typeof id === "string") {
      /* if (parseInt(id) > 1) {
        getPrevious(id).then(async (response) => {
          const previous = await response?.data;
          setPreviousCharacter({
            name: previous?.name,
            url: previous?.url,
          });
        });
      }
      if (parseInt(id) < 88) {
        getNext(id).then(async (response) => {
          const next = await response?.data;
          setNextCharacter({
            name: next?.name,
            url: next?.url,
          });
        });
      } */
    }
  }, [id]);

  useEffect(() => {
    if (state?.length > 0) {
      const findCurrent = state.find(
        (character: { url: string }) =>
          character.url === `https://swapi.py4e.com/api/people/${currentId}/`
      );
      //console.log(findCurrent);
      setCharacterDetails(findCurrent);
      const index = findCurrent ? state.indexOf(findCurrent) : -1;
      //console.log(index);
      if (index > 0) {
        setPreviousCharacter({
          name: state[index - 1].name,
          url: state[index - 1].url,
        });
      }
      if (index <= state.length - 2) {
        setNextCharacter({
          name: state[index + 1].name,
          url: state[index + 1].url,
        });
      }
    }
  }, [state, currentId]);

  const getId = (url: string | undefined) => {
    if (url) {
      const splitedUrl = url.split("/");
      const characterId = splitedUrl[splitedUrl.length - 2];
      return characterId;
    }
  };

  const isLocked = (type: string) => {
    let result = false;
    if (type === "previous" && typeof id === "string") {
      if (getId(state[0].url) === id) result = true;
    }
    if (type === "next" && typeof id === "string") {
      if (getId(state[state?.length - 1].url) === id) result = true;
    }
    return result;
  };

  //console.log("state", state);
  return (
    <div>
      <Header />
      <div className="py-4 px-6 bg-white">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaChevronLeft />
          <div className="ml-2">Retour aux résultats</div>
        </div>
        <div className="my-6 flex">
          <div className="w-1/3 mr-6 border rounded-md">
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt={characterDetails?.name}
              className="rounded-md"
            />
          </div>
          <div className="w-2/3 flex flex-col justify-between">
            <div className="mb-8 flex items-center">
              <div className="mr-4 text-3xl uppercase">Fiche d'identité</div>
              <div className="">
                <FavoriteStar character={characterDetails} size={30} />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <div className="mb-3">
                  Nom :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.name}
                  </span>
                </div>
                <div className="mb-3">
                  Genre :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.gender}
                  </span>
                </div>
                <div className="mb-3">
                  Poids :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.mass}
                  </span>
                </div>
                <div className="mb-3">
                  Taille :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.height}
                  </span>
                </div>
                <div className="mb-3">
                  Cheveux :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.hair_color}
                  </span>
                </div>
                <div className="mb-3">
                  Yeux :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.eye_color}
                  </span>
                </div>
                <div className="mb-3">
                  Créé le :{" "}
                  <span className="font-semibold">
                    {moment(characterDetails?.created).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="mb-3">
                  Modifié le :{" "}
                  <span className="font-semibold">
                    {moment(characterDetails?.edited).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              <div className="w-1/2 p-4 flex flex-col justify-center text-center text-white bg-slate-900 rounded-lg shadow-lg">
                <div className="mb-6 flex justify-center items-end">
                  <PiFilmSlateBold size={40} />
                  <div className="ml-3 text-xl font-bold">Films</div>
                </div>
                {characterDetails?.films &&
                  characterDetails?.films?.length > 0 && (
                    <div>
                      {characterDetails?.films?.map((film) => {
                        return (
                          <div
                            key={film?.episode_id}
                            className="my-3 font-bold"
                          >
                            {film?.title}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div
                className={`text-center ${
                  isLocked("previous") ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (!isLocked("previous") && previousCharacter) {
                    setCurrentId(getId(previousCharacter.url));
                    navigate(`/characters/${getId(previousCharacter.url)}`, {
                      replace: true,
                    });
                  }
                }}
              >
                <div
                  className={`flex items-center justify-between ${
                    isLocked("previous") && "text-slate-400"
                  }`}
                >
                  <FaChevronLeft className="mr-1" />
                  Précédent
                </div>
                {!isLocked("previous") && <div>{previousCharacter?.name}</div>}
              </div>
              <div
                className={`text-center ${
                  isLocked("next") ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                  if (!isLocked("next") && nextCharacter) {
                    setCurrentId(getId(nextCharacter.url));
                    navigate(`/characters/${getId(nextCharacter.url)}`, {
                      replace: true,
                    });
                  }
                }}
              >
                <div
                  className={`flex items-center justify-between ${
                    isLocked("next") && "text-slate-400"
                  } text-end`}
                >
                  Suivant
                  <FaChevronRight className="ml-1" />
                </div>
                {!isLocked("next") && <div>{nextCharacter?.name}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCharacter;