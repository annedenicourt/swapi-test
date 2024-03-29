import { useNavigate } from "react-router-dom";
import { Character } from "../utils/types";
import FavoriteStar from "./FavoriteStar";
import { FaEye } from "react-icons/fa";

interface ListCharacterProps {
  character: Character | undefined;
}

const ListCharacter: React.FC<ListCharacterProps> = ({ character }) => {
  const navigate = useNavigate();

  const getId = (url: string | undefined) => {
    if (url) {
      const splitedUrl = url.split("/");
      const characterId = splitedUrl[splitedUrl.length - 2];
      return characterId;
    }
    return undefined;
  };
  const characterId = character?.url ? getId(character.url) : undefined;

  return (
    <div className="">
      <div className="py-1 flex items-center text-center border-b border-dashed cursor-pointer">
        <div className="w-1/6 flex justify-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
            alt={character?.name || ""}
            className="w-16 h-16 mr-3 rounded-lg object-cover"
          />
        </div>
        <div className="w-1/6 text-center font-bold">{character?.name}</div>
        <div className="w-1/6 text-center font-bold">
          {character?.height !== "unknown"
            ? `${character?.height} cm`
            : "Non renseigné"}
        </div>
        <div className="w-1/6 text-center font-bold">
          {character?.mass !== "unknown"
            ? `${character?.mass} kg`
            : "Non renseigné"}
        </div>
        <div className="w-1/6 text-center font-bold">{character?.gender}</div>
        <div className="w-1/6 flex flex-row items-center">
          <FaEye
            size={20}
            title="Voir les détails"
            onClick={() =>
              characterId && navigate(`/characters/${characterId}`)
            }
            className="mr-2"
          />
          <FavoriteStar character={character} size={20} />
        </div>
      </div>
    </div>
  );
};

export default ListCharacter;
