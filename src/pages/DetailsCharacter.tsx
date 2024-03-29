import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Character } from "../utils/types";
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
  const [currentId, setCurrentId] = useState<string | undefined>(id);
  const [previousCharacter, setPreviousCharacter] = useState<
    Character | undefined
  >();
  const [nextCharacter, setNextCharacter] = useState<Character | undefined>();

  useEffect(() => {
    if (state?.length > 0 && currentId) {
      const findCurrent = state.find(
        (character: { url: string }) =>
          character.url === `https://swapi.py4e.com/api/people/${currentId}/`
      );
      if (findCurrent) {
        setCharacterDetails(findCurrent);
        const index = state.indexOf(findCurrent);
        if (index > 0) setPreviousCharacter(state[index - 1]);
        if (index < state.length - 1) setNextCharacter(state[index + 1]);
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
    if (type === "previous") {
      if (getId(state[0].url) === id) result = true;
    }
    if (type === "next") {
      if (getId(state[state?.length - 1].url) === id) result = true;
    }
    return result;
  };

  const handleNavigation = (id: string | undefined) => {
    if (id) {
      setCurrentId(id);
      navigate(`/characters/${id}`, { replace: true });
    }
  };

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
                    {characterDetails?.mass !== "unknown"
                      ? `${characterDetails?.mass} kg`
                      : "Non renseigné"}
                  </span>
                </div>
                <div className="mb-3">
                  Taille :{" "}
                  <span className="font-semibold text-lg">
                    {characterDetails?.height !== "unknown"
                      ? `${characterDetails?.height} cm`
                      : "Non renseigné"}
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
                onClick={() => handleNavigation(getId(previousCharacter?.url))}
              >
                <div
                  className={`flex items-center justify-start ${
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
                onClick={() => handleNavigation(getId(nextCharacter?.url))}
              >
                <div
                  className={`flex items-center justify-end ${
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
