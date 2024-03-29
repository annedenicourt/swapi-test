import { useNavigate } from "react-router-dom";
import { Character } from "../utils/types";
import FavoriteStar from "./FavoriteStar";

interface CardCharacterProps {
  character: Character | undefined;
}

const CardCharacter: React.FC<CardCharacterProps> = ({ character }) => {
  const navigate = useNavigate();

  const getId = (url: string | undefined) => {
    if (url) {
      const splitedUrl = url.split("/");
      const characterId = splitedUrl[splitedUrl.length - 2];
      return characterId;
    }
  };

  const handleClick = () => {
    if (character && character.url) {
      if (characterId) {
        navigate(`/characters/${characterId}`);
      }
    }
  };

  const characterId = character?.url ? getId(character.url) : undefined;

  return (
    <div className="relative transform hover:scale-95 duration-75">
      <div
        className="pb-3 rounded-lg shadow-lg cursor-pointer"
        onClick={() => handleClick()}
      >
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
          alt={`${character?.name}`}
          className="rounded-t-lg"
        />
        <div className="mt-3 text-center font-bold">{character?.name}</div>
      </div>
      <div className="absolute top-1 right-1">
        <FavoriteStar character={character} size={20} />
      </div>
    </div>
  );
};

export default CardCharacter;
