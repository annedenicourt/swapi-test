import { Character } from "../utils/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface FavoritesProps {
  character: Character | undefined;
  size: number;
}

const FavoriteStar: React.FC<FavoritesProps> = ({ character, size }) => {
  const storage = JSON.parse(localStorage.getItem("favorites") || "[]");
  const [favorites, setFavorites] = useState<Character[]>(storage);

  const handleFavorites = (character: Character) => {
    const isInFavorites = favorites.find(
      (item) => item?.name === character?.name
    );
    if (isInFavorites === undefined) {
      setFavorites([...favorites, character]);
    } else {
      setFavorites(favorites.filter((item) => item.name !== character?.name));
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <button onClick={() => character && handleFavorites(character)}>
      {character && favorites.find((item) => item?.name === character?.name) ? (
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
