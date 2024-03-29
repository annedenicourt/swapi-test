import { Character } from "../utils/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
//import { setFavorites } from "../utils/reducers";
import { useEffect, useState } from "react";

interface FavoritesProps {
  character: Character | undefined;
  size: number;
}

const FavoriteStar: React.FC<FavoritesProps> = ({ character, size }) => {
  const storageString = localStorage.getItem("favorites");
  const storage = storageString ? JSON.parse(storageString) : [];

  const [favorites, setFavorites] = useState<Character[]>(storage);

  const handleFavorites = (character: Character) => {
    let newArray: Character[] = [];
    const isInFavorites = favorites?.find(
      (item) => item?.name === character?.name
    );
    console.log("isInFavorites", isInFavorites);
    if (isInFavorites === undefined) {
      newArray = [...favorites, character];
      setFavorites(newArray);
    } else {
      newArray = favorites.filter((item: any) => item.name !== character?.name);
      setFavorites(newArray);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //console.log("favorites", favorites);

  return (
    <button
      //onClick={() => dispatch(setFavorites(character?.name))}
      onClick={() => character && handleFavorites(character)}
      className=""
    >
      {character?.name &&
      favorites.find((item) => item?.name === character?.name) ? (
        <div title={"Retirer des favoris"}>
          <FaStar color={"orange"} size={size} />
        </div>
      ) : (
        <div title={"Ajouter aux favoris"}>
          <FaRegStar color={"orange"} size={size} />
        </div>
      )}
    </button>
  );
};

export default FavoriteStar;
