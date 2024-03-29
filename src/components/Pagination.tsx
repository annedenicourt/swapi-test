import { useEffect } from "react";

interface PaginationProps {
  numberOfPages: number;
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfCharacters: number;
  charactersPerPage: number;
  getOnePage: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  numberOfPages,
  setNumberOfPages,
  currentPage,
  setCurrentPage,
  numberOfCharacters,
  charactersPerPage,
  getOnePage,
}) => {
  useEffect(() => {
    if (numberOfCharacters > 0) {
      setNumberOfPages(Math.ceil(numberOfCharacters / charactersPerPage));
    }
  }, [numberOfCharacters]);

  return (
    <div>
      {numberOfPages > 0 && (
        <div className="flex justify-end">
          {Array.from({ length: numberOfPages }).map((item, index) => {
            return (
              <div
                key={`page-${index + 1}`}
                className={`h-8 w-8 flex items-center justify-center ${
                  index + 1 === currentPage && "text-white bg-orange-400"
                }  font-bold rounded-full cursor-pointer`}
                onClick={() => {
                  setCurrentPage(index + 1);
                  getOnePage(index);
                }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pagination;
